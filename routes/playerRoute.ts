import { BaseRoute } from "./baseRoute";
import { Request, Response } from "express";
import { PlayerService } from "../services/playerService";

export class PlayerRoute extends BaseRoute {
  constructor() {
    super();
  }

  routes(): void {
    //commented out for now
    this.router.get("/", this.getPlayers);
  }

  async getPlayers(req: Request, res: Response) {
    console.log("Get all players");
    // Logic to retrieve all users
    var playersService = new PlayerService();
    const players = await playersService.getPlayers().then((players) => {
      return players.map((player : any) => {
        return {
          id: player.player_id,
          name: player.player_name,
          correctPosition: player.playerposition_code,
          positionGuessedId: undefined,
          poistionGuessed: undefined,
        };
      });
    });

    res.json(players);
  }
}
