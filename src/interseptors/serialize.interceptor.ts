import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): {};
}

export function serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data: any) => {
        // Check if data exists and has the expected structure
        if (!data) return data;

        // Case 1: If data has success and data properties (your current structure)
        if (data.success && data.data) {
          if (data.data.user) {
            data.data.user = plainToInstance(this.dto, data.data.user, {
              excludeExtraneousValues: true,
            });
          }
          return data;
        }

        // Case 2: If data is the direct object
        if (data.user) {
          data.user = plainToInstance(this.dto, data.user, {
            excludeExtraneousValues: true,
          });
          return data;
        }

        // Case 3: Return data as is if no user found
        return data;
      }),
    );
  }
}