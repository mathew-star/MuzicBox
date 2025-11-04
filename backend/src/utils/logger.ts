import pino from 'pino';
import pinoPretty from 'pino-pretty';
import env from "../config/env.js"

const transport = pino.transport({
  targets: [
    {
      target: "pino-pretty", // module name, not a path
      options: { colorize: true },
      level: "info", // optionally specify level per target
    },
  ],
});

 
export const logger = pino(
  {
    level: env.NODE_ENV === "production" ? "warn" : "trace",
  },
  transport
);

