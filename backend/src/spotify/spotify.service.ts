import { Injectable } from "@nestjs/common";
import SpotifyWebApi from "spotify-web-api-node";
import { randomBytes } from "crypto";
import { SpotifyAuth } from "./interfaces/spotifyauth.interface";

@Injectable()
export class SpotifyService {
  private readonly spotifyCredentials = {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: "http://localhost:3000/host",
  };

  getAuthorisationURL(): string {
    const spotifyApi = new SpotifyWebApi(this.spotifyCredentials);
    const state = randomBytes(64).toString("hex");
    return spotifyApi.createAuthorizeURL(
      [
        "user-modify-playback-state",
        "user-read-playback-state",
        "playlist-read-collaborative",
        "streaming",
        "user-read-private",
      ],
      state
    );
  }

  async createAuthorisation(code: string): Promise<SpotifyAuth> {
    const api = new SpotifyWebApi(this.spotifyCredentials);
    const data = await api.authorizationCodeGrant(code);
    return {
      expires_in: data.body["expires_in"],
      access_token: data.body["access_token"],
      refresh_token: data.body["refresh_token"],
    };
  }
}
