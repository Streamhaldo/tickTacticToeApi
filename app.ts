import express, { Express, Request, Response } from "express";
import pgPromise from "pg-promise";
import { PlayerRoute } from "./routes/playerRoute";

const app: Express = express();
const port = 3000;

app.use(express.json()); // Enable JSON body parsing

app.get("/api/about", (req: Request, res: Response) => {
  res.send("some info about the app");
});

const playerRoute = new PlayerRoute();
app.use("/api/players", playerRoute.router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const createPlayer = (
  playerId: number,
  name: string,
  correctPosition: string,
) => {
  return {
    id: playerId,
    name: name,
    correctPosition: correctPosition,
    positionGuessedId: undefined,
    poistionGuessed: undefined,
  };
};
