import { cron, everyMinute, parse, serve } from "./deps.ts";
import puppeteer from "https://deno.land/x/puppeteer@5.5.1/mod.ts";

async function initBot() {
  // everyMinute(() => {
  //   console.log(`Test log ${new Date().toISOString()}`)
  // });
  console.log("Init");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://example.com");
  await page.screenshot({ path: "example.png" });

  await browser.close();
}

const { args } = Deno;
const DEFAULT_PORT = 8000;
const argPort: string = parse(args).port;
const serverPort = Number(argPort) || DEFAULT_PORT;

const s = serve({ port: serverPort });

initBot();

console.log(`🦕 Deno server running at ${serverPort} 🦕`);

for await (const req of s) {
  req.respond({ body: `Hello World\n ${new Date().toISOString()}` });
}
