import pgPromise from "pg-promise";
import { DBConfig } from "../utils/dbConfig";

export class PlayerService {
  constructor() {}

  getPlayers = async () : Promise<any> => {
    const pgp = pgPromise();
    const db = pgp(DBConfig.dbConfig);

    const teamQuery = `SELECT team_id FROM Player ORDER BY RANDOM() LIMIT 1;`;
    const teamResponse = await db.query(teamQuery);
    const teamId = await teamResponse[0].team_id;
    const playerQuery = `SELECT p.player_id, t.team_name, p.player_name, pp.playerPosition_code
    FROM Player p
    JOIN Team t
	    ON p.team_id = t.team_id
      AND t.team_id = ${teamId}
    JOIN PlayerPosition pp
	    ON p.playerPosition_id = pp.playerPosition_id`;

    const retVal = await db.query(playerQuery) as Promise<any>;
    return retVal;
  };
}
