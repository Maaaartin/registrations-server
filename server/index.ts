// server/index.ts
import express, { Request, Response } from 'express';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const server = express();

  // Define an example REST API route
  server.get('/api/hello', (req: Request, res: Response) => {
    res.json({ message: 'Hello from the custom Express API!' });
  });

  // Handle all other requests with Next.js
  server.all('*', (req: Request, res: Response) => {
    return handle(req, res);
  });

  server.listen(3000, (err?: any) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
