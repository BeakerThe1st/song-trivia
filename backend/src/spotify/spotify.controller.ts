import { Controller, Get, Post, Body, Res, Req } from "@nestjs/common";
import { Request, Response } from "express";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { SpotifyAuth } from "./interfaces/spotifyauth.interface";
import { SpotifyService } from "./spotify.service";

@Controller("spotify")
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}
  @Get("auth-url")
  getAuthorisationUrl(): string {
    return this.spotifyService.getAuthorisationURL();
  }
  @Get("auth")
  getAuth(@Req() request: Request): SpotifyAuth {
    return {
      expires_in: request.cookies["expires_in"] ?? null,
      access_token: request.cookies["access_token"] ?? null,
      refresh_token: request.cookies["refresh_token"] ?? null,
    };
  }
  @Post("auth")
  async createAuth(
    @Res({ passthrough: true }) response: Response,
    @Body() createAuthDto: CreateAuthDto
  ) {
    const auth = await this.spotifyService.createAuthorisation(
      createAuthDto.code
    );
    for (const [key, value] of Object.entries(auth)) {
      console.log(`${key}: ${value}`);
      response.cookie(key, value);
    }
    return auth;
  }
}
