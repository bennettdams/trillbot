import { serve } from 'https://deno.land/std/http/server.ts'
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
const serverPort = argPort || DEFAULT_PORT

const s = serve({ port: serverPort });

initBot()

console.log(`🦕 Deno server running at ${argPort} 🦕`)

for await (const req of s) {
    req.respond({ body: `Hello World\n ${new Date().toISOString()}` });
}
