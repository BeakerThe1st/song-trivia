import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { GamesController } from "./games.controller";
import { GamesService } from "./games.service";
import { Game } from "./game.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Game])],
  providers: [GamesService],
  controllers: [GamesController],
})
export class GamesModule {}
