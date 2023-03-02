import { Request, Response } from "express";

import pool from "../database";

class GamesController {
  public async list(req: Request, res: Response) {
    const games = await pool.query("SELECT * FROM games");
    res.send( games );
  }
  public async getOne(req: Request, res: Response): Promise<any> {
    const game = await pool.query(
      `SELECT * FROM games WHERE id = ${req.params.id}`
    );
    game.length > 0
      ? res.json(game[0])
      : res.status(404).json({ text: "el juego no existe" });
  }

  public async create(req: Request, res: Response): Promise<void> {
    // se le puede especificar que la función es un promesa pero no devuelve nada
    // recibe por medio del req el req.body, y por medio del pool(conexion) se realiza la sentencia sql
    // las sentencias sql deben ser procesos asincronos porque toman tiempo, por lo que se debe usar async & await
    await pool.query("INSERT INTO games set ?", [req.body]);
    console.log(req.body);

    res.json({ message: "Created" });
  }

  public async delete(req: Request, res: Response) {
    await pool.query(`DELETE FROM games WHERE id = ${req.params.id}`);
    res.json({ text: "Se ha eliminado el juego" });
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query("UPDATE games set ? WHERE id = ?", [req.body, id]);
    res.json({ message: "the game was update" });
  }
}

const gamesController = new GamesController();
export default gamesController;
