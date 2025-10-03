import { Inject, Injectable } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class RedisService {
	constructor(@Inject('REDIS_CLIENT') private readonly client: Redis) {}
  async setRefreshToken(userId: number, refreshToken: string) {
    // token valid for 7 days
    await this.client.set(`refresh:${userId}`, refreshToken, 'EX' ,7 * 24 * 60 * 60);
  }

  async getRefreshToken(userId: number) {
    return await this.client.get(`refresh:${userId}`);
  }

  async deleteRefreshToken(userId: number) {
    await this.client.del(`refresh:${userId}`);
  }


   async setUserPlaylist(userId: number, playlist: any) {
    await this.client.hset(`user:${userId}:playlist`, playlist);
  }

  async getUserPlaylist(userId: number) {
    const playlist = await this.client.hgetall(`user:${userId}:playlist`);
    return Object.keys(playlist).length ? playlist : null;
  }

  async incrementSongPlayCount(songId: number) {
    await this.client.zincrby('songs:popularity', 1, `song:${songId}`);
  }


  async getTopSongs(limit: number) {
    const topSongs = await this.client.zrevrange('songs:popularity', 0, limit - 1, 'WITHSCORES');
    return topSongs.map((item, index) => ({
      songId: item[0].replace('song:', ''),
      playCount: Number(item[1]),
      rank: index + 1,
    }));
  }

  
  async getSongRank(songId: number) {
    const rank = await this.client.zrevrank('songs:popularity', `song:${songId}`);
    return rank !== null ? rank + 1 : null;
  }
  
}