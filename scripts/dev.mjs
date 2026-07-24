import { createServer } from "node:http";
import { connect } from "node:net";
import { Readable } from "node:stream";
import { spawn } from "node:child_process";
import next from "next";

const hostname = "localhost";
const port = 3000;
const workerHostname = "127.0.0.1";
const workerPort = 8787;
const workerOrigin = `http://${workerHostname}:${workerPort}`;

const worker = spawn(
  "pnpm",
  [
    "exec",
    "wrangler",
    "dev",
    "--ip",
    workerHostname,
    "--port",
    String(workerPort),
    "--var",
    "LOCAL_DEV:true",
    "--var",
    "PUBLIC_SITE_ORIGIN:https://wsl.sagar-7e7.workers.dev",
  ],
  { stdio: "inherit" },
);

function waitForWorker(timeoutMs = 30_000) {
  const startedAt = Date.now();

  return new Promise((resolve, reject) => {
    const attempt = () => {
      const socket = connect(workerPort, workerHostname);
      socket.once("connect", () => {
        socket.end();
        resolve();
      });
      socket.once("error", () => {
        socket.destroy();
        if (Date.now() - startedAt >= timeoutMs) {
          reject(new Error("Local contact Worker did not start within 30 seconds."));
          return;
        }
        setTimeout(attempt, 150);
      });
    };

    attempt();
  });
}

async function proxyContactRequest(request, response) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(request.headers)) {
    if (value !== undefined && name !== "host" && name !== "connection") {
      headers.set(name, Array.isArray(value) ? value.join(", ") : value);
    }
  }

  const requestInit = {
    method: request.method,
    headers,
    redirect: "manual",
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    requestInit.body = request;
    requestInit.duplex = "half";
  }

  try {
    const upstream = await fetch(`${workerOrigin}${request.url}`, requestInit);
    const responseHeaders = Object.fromEntries(upstream.headers);
    delete responseHeaders["content-encoding"];
    delete responseHeaders["content-length"];
    response.writeHead(upstream.status, responseHeaders);

    if (upstream.body) {
      Readable.fromWeb(upstream.body).pipe(response);
    } else {
      response.end();
    }
  } catch (error) {
    console.error("Contact Worker proxy failed:", error);
    response.writeHead(503, {
      "Content-Type": "application/json; charset=UTF-8",
      "Cache-Control": "no-store",
    });
    response.end(JSON.stringify({ error: "The local contact service is unavailable." }));
  }
}

const app = next({ dev: true, hostname, port });

let shuttingDown = false;
async function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(`\n${signal}: stopping local development services…`);
  worker.kill("SIGTERM");
  await app.close();
  process.exit(0);
}

worker.once("exit", (code, signal) => {
  if (!shuttingDown) {
    console.error(`Local contact Worker exited (${signal ?? `code ${code}`}).`);
    process.exit(code ?? 1);
  }
});

process.once("SIGINT", () => void shutdown("SIGINT"));
process.once("SIGTERM", () => void shutdown("SIGTERM"));

try {
  await Promise.all([app.prepare(), waitForWorker()]);
  const handleNextRequest = app.getRequestHandler();
  const handleNextUpgrade = app.getUpgradeHandler();

  const server = createServer((request, response) => {
    const pathname = new URL(request.url ?? "/", `http://${request.headers.host}`).pathname;
    if (pathname === "/api/contact") {
      void proxyContactRequest(request, response);
      return;
    }
    void handleNextRequest(request, response);
  });

  server.on("upgrade", handleNextUpgrade);
  server.listen(port, hostname, () => {
    console.log(`✓ Next.js + contact Worker ready at http://${hostname}:${port}`);
  });
} catch (error) {
  worker.kill("SIGTERM");
  console.error(error);
  process.exit(1);
}
