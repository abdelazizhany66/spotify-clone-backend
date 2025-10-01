import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as dotenv from 'dotenv';
import { dot } from "node:test/reporters";

dotenv.config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration:false,
      secretOrKey:process.env.SECRET!
    })
  }

  async validate(payload:any) {
    return { userId:payload.userId, email:payload.email, artistId:payload.artistId}
  }
}