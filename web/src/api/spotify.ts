import axios from "axios";

const spotify = axios.create({
  baseURL: "http://localhost:3001/spotify",
});

export async function getSpotifyAuthUrl() {
  const { data } = await spotify.get("/auth-url");
  return data;
}
