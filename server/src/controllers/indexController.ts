import { Request, Response } from "express";

class IndexController {
  public index(req: Request, res: Response) {
    res.send('End point de home')
  }
}

export const indexController = new IndexController()
