import util from 'util';

let patched = false;

export async function register() {
  if (patched) return;
  patched = true;

  // Give stack traces as much context as possible.
  Error.stackTraceLimit = 100;

  const logUnhandled = (type: 'unhandledRejection' | 'uncaughtException', err: unknown) => {
    const error = err instanceof Error ? err : new Error(util.format(err));
    // Rely on NODE_OPTIONS=--enable-source-maps for TS/JS mapping.
    console.error(`[${type}]`, error.stack ?? error);
  };

  process.on('unhandledRejection', (reason) => logUnhandled('unhandledRejection', reason));
  process.on('uncaughtException', (err) => logUnhandled('uncaughtException', err));
}
