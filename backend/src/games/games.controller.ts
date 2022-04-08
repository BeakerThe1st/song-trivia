import { Controller, Get, Post, Body } from "@nestjs/common";
import { CreateGameDto } from "./dto/create-game.dto";

@Controller("games")
export class GamesController {
  @Get()
  findAll(): string {
    return "Return all games";
  }
  @Post()
  async create(@Body() createGameDto: CreateGameDto) {}
}
