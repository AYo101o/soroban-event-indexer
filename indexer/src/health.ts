import { createServer } from "node:http";
import { log } from "./logger";

export function startHealthServer() {
  const port = Number(process.env.PORT) || 3000;

  const server = createServer((_req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("ok");
  });

  server.listen(port, () => {
    log(`Health check server listening on port ${port}`);
  });

  return server;
}
