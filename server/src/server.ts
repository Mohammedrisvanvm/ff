import cors from "cors";
import express, { Express, Request, Response } from "express";
import http from "http";
import { DBconnect } from "./config/mongoDB";
import { socketConnect } from "./helper/socket.helper";
import credentials, { allowedOrigins } from "./middleware/credientials";
import coinRoute from "./route/coin.route";
import cronrun from "./helper/cron.helper";


const app: Express = express();
const port = process.env.PORT || 4444;

DBconnect();
cronrun();
const server = http.createServer(app);

socketConnect(server);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

app.use(credentials);
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use("/api/v1", coinRoute);
app.get("/", (req: Request, res: Response) => {
  res.send(`Express + TypeScript Server`);
});

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
