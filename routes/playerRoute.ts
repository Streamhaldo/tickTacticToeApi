import { BaseRoute } from "./baseRoute";
import { Request, Response } from "express";
import { PlayerService } from "../services/playerService";

export class PlayerRoute extends BaseRoute {
  constructor() {
    super();
  }

  routes(): void {
    this.router.get("/", this.getPlayers);
  }

  async getPlayers(req: Request, res: Response) {
    console.log("Get all players");
    // Logic to retrieve all users
    var playersService = new PlayerService();
    const players = await playersService.getPlayers();
    res.json(players);
  }
}
