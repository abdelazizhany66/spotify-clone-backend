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

////////////////////////////////////////////////////////
 async setUserPlaylist(userId: number, playlist: any) {
  const key = `user:${userId}:playlist`;
  
  await this.client.hset(key, {
    'id': playlist.id.toString(),
    'name': playlist.name,
    'createdAt': playlist.createdAt || new Date().toISOString(),
    'updatedAt': new Date().toISOString()
  });

  if (playlist.songs && playlist.songs.length > 0) {
    await this.client.hset(key, 'songs', JSON.stringify(playlist.songs));
  } else {
    await this.client.hset(key, 'songs', '[]');
  }
}

async getUserPlaylist(userId: number): Promise<any> {
  const key = `user:${userId}:playlist`;
  
  const playlistData = await this.client.hgetall(key);
  if (!playlistData || Object.keys(playlistData).length === 0) {
    return null;
  }

  const songs = playlistData.songs ? JSON.parse(playlistData.songs) : [];

  return {
    id: parseInt(playlistData.id),
    name: playlistData.name,
    createdAt: playlistData.createdAt,
    updatedAt: playlistData.updatedAt,
    songs: songs 
  };
}

  async addSongToPlaylist(userId: number, songId: number) {
    await this.client.sadd(`user:${userId}:playlist:songs`, songId.toString());
    await this.client.hset(`user:${userId}:playlist`, 'updatedAt', new Date().toISOString());
  }

  async removeSongFromPlaylist(userId: number, songId: number) {
    await this.client.srem(`user:${userId}:playlist:songs`, songId.toString());
    await this.client.hset(`user:${userId}:playlist`, 'updatedAt', new Date().toISOString());
  }

  async deleteUserPlaylist(userId: number) {
    await this.client.del(`user:${userId}:playlist`);
    await this.client.del(`user:${userId}:playlist:songs`);
  }

///////////////////////////////////////////////////////

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
  
async clearUserPlaylist(userId: number) {
  const key = `user:${userId}:playlist`;
  await this.client.del(key);
  console.log('🗑️ Cleared Redis cache for user:', userId);
}

}