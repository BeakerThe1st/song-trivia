import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Game } from "./game.entity";
import { Repository } from "typeorm";
@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private gamesRepository: Repository<Game>
  ) {}
  findAll(): Promise<Game[]> {
    return this.gamesRepository.find();
  }

  create(): Game {
    return this.gamesRepository.create();
  }
}
