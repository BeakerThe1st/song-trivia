import { SpotifyController } from "./spotify.controller";
import { Module } from "@nestjs/common";
import { SpotifyService } from "./spotify.service";

@Module({
  providers: [SpotifyService],
  controllers: [SpotifyController],
})
export class SpotifyModule {}
