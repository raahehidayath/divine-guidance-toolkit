# Deploying Raah e Hidayath to Hostinger

This app is a TanStack Start (React 19 + Vite) app with a tiny Node server.
It runs on a **Hostinger VPS** (or Hostinger Cloud). Plain shared hosting will
**not** work, because the app needs a Node.js runtime for the AI route.

---

## 1. Push the code to GitHub

In the Lovable editor: **+ menu → GitHub → Connect project**. This creates the
repo and keeps it in two-way sync. Or push manually:

```bash
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

---

## 2. Prepare the VPS (one time)

SSH into your Hostinger VPS (Ubuntu 22.04 or newer recommended):

```bash
ssh root@YOUR_SERVER_IP

# Node 22 LTS
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt-get install -y nodejs git nginx
npm i -g pm2
```

---

## 3. Clone and build

```bash
cd /var/www
git clone https://github.com/<you>/<repo>.git raah
cd raah
npm install

# Build for a plain Node server instead of the default edge target
NITRO_PRESET=node-server npm run build
```

The output lands in `.output/`. The server entry is `.output/server/index.mjs`.

---

## 4. Environment variables

Create `/var/www/raah/.env`:

```bash
GEMINI_API_KEY=your_google_ai_studio_key
GEMINI_MODEL=gemini-2.5-flash   # optional
PORT=3000
```

Get a free key at <https://aistudio.google.com/apikey>.
Without a key the app still works fully — only the **Noor AI assistant** page
is disabled. Everything else (Quran, Hadith, Naats/Nasheeds, Prophets,
Halal/Haram, Barcode scanner, Prayer times, Admin) is client-side and needs
no keys.

---

## 5. Run it with PM2

```bash
cd /var/www/raah
pm2 start .output/server/index.mjs --name raah --update-env
pm2 save
pm2 startup      # run the command it prints, so it survives reboots
```

Check it: `curl http://localhost:3000` should return HTML.

---

## 6. Point your domain at it (Nginx)

`/etc/nginx/sites-available/raah`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_buffering    off;   # important: keeps AI streaming smooth
    }
}
```

Enable and reload:

```bash
ln -s /etc/nginx/sites-available/raah /etc/nginx/sites-enabled/raah
nginx -t && systemctl reload nginx
```

In the Hostinger DNS panel, add:

| Type | Name | Value           |
|------|------|-----------------|
| A    | @    | YOUR_SERVER_IP  |
| A    | www  | YOUR_SERVER_IP  |

---

## 7. Free HTTPS

```bash
apt-get install -y certbot python3-certbot-nginx
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Certbot renews automatically.

---

## 8. Updating the site later

```bash
cd /var/www/raah
git pull
npm install
NITRO_PRESET=node-server npm run build
pm2 restart raah
```

---

## Notes

- **Camera / barcode scanner** only works over HTTPS — finish step 7.
- **Voice & text-to-speech** use the browser's built-in engine, no server cost.
- After changing your domain, update `public/sitemap.xml` and the canonical
  URLs so Google indexes the right host.
- Keep `.env` out of git (it already is, via `.gitignore`).
