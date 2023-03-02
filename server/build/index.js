"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // para manejo de rutas
const morgan_1 = __importDefault(require("morgan")); // *npm i @types/morgan | Permite ver en consola las peticiones http
const cors_1 = __importDefault(require("cors")); // npm i @types/cors |
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const gamesRoutes_1 = __importDefault(require("./routes/gamesRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        //Establecer el puerto, si te dan uno usar ese, configurarlo en variable de entorno
        this.app.set("port", process.env.port || 3000);
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use((0, cors_1.default)()); // para poder pedirle los datos desde angular
        this.app.use(express_1.default.json()); // para poder aceptar formatos JSON desde el cliente
        this.app.use(express_1.default.urlencoded({ extended: false })); // En caso de querer enviar desde una form html
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use("/api/games", gamesRoutes_1.default); //Agregar el prefijo para anidar ruta
    }
    start() {
        // Darle a escuchar al server la variable
        this.app.listen(this.app.get("port"), () => {
            console.log(`Servidor inicializado en puerto ${this.app.get("port")}`);
        });
    }
}
const server = new Server();
server.start();
