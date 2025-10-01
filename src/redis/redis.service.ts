import { Inject, Injectable } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private readonly RedisClient:Redis){}
  async saveRefreshToken(userId: string, refreshToken: string) {
    // token valid for 7 days
    await this.RedisClient.set(`refresh:${userId}`, refreshToken, 'EX' ,7 * 24 * 60 * 60);
  }

  async getRefreshToken(userId: string) {
    return await this.RedisClient.get(`refresh:${userId}`);
  }

  async removeRefreshToken(userId: string) {
    await this.RedisClient.del(`refresh:${userId}`);
  }

}