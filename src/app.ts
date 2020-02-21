import * as express from "express";
import { Request, Response } from "express";
import * as bodyParser from "body-parser";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { UsersListAction } from "./controllers/UserControllers";

// create typeorm connection
createConnection().then(connection => {
  connection.synchronize();
  const userRepository = connection.getRepository(User);

  // create and setup express app
  const app = express();
  app.use(bodyParser.json());

  // register routes

  app.get("/users", async function (req: Request, res: Response) {
    const users = await UsersListAction();
    res.json(users);
  });

  app.get("/users/:id", async function (req: Request, res: Response) {
    // const userRepository = connection.getRepository(User);
    const user = await userRepository.find({ where: { id: req.params.id }, relations: ["events"] });
    // const user = await userRepository.findOne(req.params.id);
    return res.send(user);
  });


  app.post("/users", async function (req: Request, res: Response) {
    if (Object.entries(req.body).length === 0 && req.body.constructor === Object) {
      // ! Handle ERROR!
      return res.status(501).send({ message: 'no body' })
    }
    try {
      const user = await userRepository.create(req.body);
      const results = await userRepository.save(user);
      return res.send(results);
    } catch (e) {
      console.log('errr', e)
      return res.status(500).send(e)
    }
  });

  app.put("/users/:id", async function (req: Request, res: Response) {
    const user = await userRepository.findOne(req.params.id);
    userRepository.merge(user, req.body);
    const results = await userRepository.save(user);
    return res.send(results);
  });

  app.delete("/users/:id", async function (req: Request, res: Response) {
    const results = await userRepository.delete(req.params.id);
    return res.send(results);
  });

  // start express server
  app.listen(5000);
  console.log('running on 5000')
});