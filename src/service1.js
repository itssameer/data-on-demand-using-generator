// curl "localhost:3000/products?name=laptop"

import { createServer } from "node:http";
import { parse } from "node:url";
import { randomUUID } from "node:crypto";
const PORT = 3000;

async function handler(req, res) {
  if (req.method === "GET" && req.url.includes("products")) {
    const {
      query: { name },
    } = parse(req.url, true);

    const item = {
      product: name,
      id: randomUUID(),
    };

    return res.end(JSON.stringify(item));
  }
  return res.end(`hey!!`);
}

createServer(handler)
  .listen(PORT)
  .on("listening", () => {
    console.log(`products API is running at ${PORT}`);
  });
