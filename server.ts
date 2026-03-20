import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Proxy Supabase requests to bypass client-side network blocks
  app.use('/supabase', createProxyMiddleware({
    target: process.env.VITE_SUPABASE_URL,
    changeOrigin: true,
    pathRewrite: {
      '^/supabase': '',
    },
  }));

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('build'));
    app.get('*', (req, res) => {
      res.sendFile('index.html', { root: 'build' });
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
