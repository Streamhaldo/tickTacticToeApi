import pgPromise from "pg-promise";
import { DBConfig } from "../utils/dbConfig";

export class PlayerService {
  constructor() {}

  getPlayers = (): Promise<any> => {
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
}
