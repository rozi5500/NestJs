import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../config/constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const publicKey = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());

    if (publicKey) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.header('Authorization');

    return apiKey === this.configService.get('API_KEY');
  }
}
