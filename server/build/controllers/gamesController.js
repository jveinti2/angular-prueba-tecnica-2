"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class GamesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield database_1.default.query("SELECT * FROM games");
            res.send(games);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const game = yield database_1.default.query(`SELECT * FROM games WHERE id = ${req.params.id}`);
            game.length > 0
                ? res.json(game[0])
                : res.status(404).json({ text: "el juego no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // se le puede especificar que la función es un promesa pero no devuelve nada
            // recibe por medio del req el req.body, y por medio del pool(conexion) se realiza la sentencia sql
            // las sentencias sql deben ser procesos asincronos porque toman tiempo, por lo que se debe usar async & await
            yield database_1.default.query("INSERT INTO games set ?", [req.body]);
            console.log(req.body);
            res.json({ message: "Created" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`DELETE FROM games WHERE id = ${req.params.id}`);
            res.json({ text: "Se ha eliminado el juego" });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("UPDATE games set ? WHERE id = ?", [req.body, id]);
            res.json({ message: "the game was update" });
        });
    }
}
const gamesController = new GamesController();
exports.default = gamesController;
