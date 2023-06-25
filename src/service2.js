// curl -X POST "localhost:3001/cart" --data '{"id": "123"}'

import { createServer } from "node:http";
import { once } from "node:events";

const PORT = 3001;

async function handler(req, res) {
  if (req.method === "POST" && req.url.includes("cart")) {
    const data = await once(req, "data");
    const item = JSON.parse(data);
    console.log("received", item);

    return res.end(`process succeeded for ${item.id}`);
  }

  return res.end(`hey hey!!`);
}

createServer(handler)
  .listen(PORT)
  .on("listening", () => {
    console.log(`cart API is running at ${PORT}`);
  });
