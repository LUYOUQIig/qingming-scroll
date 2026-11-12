/**
 * 本地预览服务器（零依赖）
 * 用法： node server.mjs [端口]
 * 默认绑定 0.0.0.0 —— 同一 Wi-Fi 下的手机也能通过局域网 IP 打开。
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { networkInterfaces } from 'node:os';

const root = normalize(fileURLToPath(new URL('.', import.meta.url)));
const port = Number(process.argv[2] || 8123);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml'
};

createServer(async (req, res) => {
  try {
    const url = decodeURIComponent((req.url || '/').split('?')[0]);
    let p = normalize(join(root, url === '/' ? 'index.html' : url));
    if (!p.startsWith(root)) { res.writeHead(403).end('forbidden'); return; }
    const s = await stat(p).catch(() => null);
    if (s && s.isDirectory()) p = join(p, 'index.html');
    const buf = await readFile(p);
    res.writeHead(200, {
      'content-type': types[extname(p).toLowerCase()] || 'application/octet-stream',
      'cache-control': 'no-cache'
    }).end(buf);
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('not found');
  }
}).listen(port, '0.0.0.0', () => {
  console.log(`  this PC : http://127.0.0.1:${port}/`);
  for (const list of Object.values(networkInterfaces())) {
    for (const n of list || []) {
      if (n.family === 'IPv4' && !n.internal) console.log(`  phone   : http://${n.address}:${port}/`);
    }
  }
});
