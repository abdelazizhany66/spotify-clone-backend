import { Global, Module } from "@nestjs/common";
import Redis from 'ioredis';
import { RedisService } from "./redis.service";


@Global()
@Module({
  providers:[
    {
      provide:'REDIS_CLIENT',
      useFactory: () => {
        const client =  new Redis({
          password:process.env.REDIS_PASSWORD,
          host:process.env.REDIS_HOST,
          port:Number(process.env.PORT),
          tls: { rejectUnauthorized: false}
        })
          client.on('connect', () => console.log('✅ Connected!'));
        client.on('error', (err) => console.error('❌ Error:', err.message));

        return client;
      }
    },
    RedisService
  ],
  exports:[RedisService]
})

export class RedisModule{}