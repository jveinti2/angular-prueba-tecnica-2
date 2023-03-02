import express, { Application, urlencoded } from "express"; // para manejo de rutas
import morgan from "morgan"; // *npm i @types/morgan | Permite ver en consola las peticiones http
import cors from "cors"; // npm i @types/cors |

import indexRoutes from "./routes/indexRoutes";
import gamesRoutes from "./routes/gamesRoutes";

class Server {
  public app: Application;
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }
  config(): void {
    //Establecer el puerto, si te dan uno usar ese, configurarlo en variable de entorno
    this.app.set("port", process.env.port || 3000);
    this.app.use(morgan("dev"));
    this.app.use(cors()); // para poder pedirle los datos desde angular
    this.app.use(express.json()); // para poder aceptar formatos JSON desde el cliente
    this.app.use(express.urlencoded({ extended: false })); // En caso de querer enviar desde una form html

  }
  routes(): void {
    this.app.use(indexRoutes);
    this.app.use("/api/games", gamesRoutes); //Agregar el prefijo para anidar ruta
  }
  start(): void {
    // Darle a escuchar al server la variable
    this.app.listen(this.app.get("port"), () => {
      console.log(`Servidor inicializado en puerto ${this.app.get("port")}`);
    });
  }
}

const server = new Server();
server.start();
