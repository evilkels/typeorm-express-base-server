import { getConnection } from "typeorm";
import { User } from "../entity/User";

export function UsersListAction(req?: Request, res?: Response) {
  return getConnection().getRepository(User).find();
}

//  ? OR 
// import {getRepository} from "typeorm";
// import {User} from "../entity/User";

// export function UsersListAction(req: Request, res: Response) {
//     return getRepository(User).find();
// }