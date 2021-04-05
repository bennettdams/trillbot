import { serve } from "https://deno.land/std@0.57.0/http/server.ts";
import { parse } from 'https://deno.land/std/flags/mod.ts';
import { everyMinute } from 'https://deno.land/x/deno_cron/cron.ts';

function initBot() {
  everyMinute(() => {
    console.log(`Test log ${new Date().toISOString()}`)
  });
}

const { args } = Deno;
const DEFAULT_PORT = 8000;
const argPort = parse(args).port;

const s = serve({ port: argPort ? Number(argPort) : DEFAULT_PORT });

initBot()

for await (const req of s) {
  req.respond({ body: `Hello World\n ${new Date().toISOString()}` });
}
