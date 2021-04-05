import { everyMinute } from 'https://deno.land/x/deno_cron/cron.ts';

everyMinute(() => {
  console.log("Test log")
});
