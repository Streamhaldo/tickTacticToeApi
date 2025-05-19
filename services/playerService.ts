import pgPromise from "pg-promise";
import { DBConfig } from "../utils/dbConfig";

export class PlayerService {
  constructor() {}

  getPlayers_old = (): Promise<any> => {
    const pgp = pgPromise();
    const db = pgp(DBConfig.dbConfig);

    const query = `SELECT p.player_id, t.team_name, p.player_name, pp.playerPosition_code
    FROM Player p
    JOIN Team t
	    ON p.team_id = t.team_id
    JOIN PlayerPosition pp
	    ON p.playerPosition_id = pp.playerPosition_id`;

    return db.query(query);
  };

  getPlayers = async () => {
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

    const playerResponse = await db.query(playerQuery);
    const retVal = await playerResponse;
    return retVal;
  };
}
