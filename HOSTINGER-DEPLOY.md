# Putting Raah e Hidayath on your Hostinger domain

## Important: if the domain uses GitHub Pages

This repository now includes `.github/workflows/deploy-pages.yml`. It builds
and publishes the actual application automatically whenever `main` is updated,
instead of letting GitHub Pages render `README.md`.

In GitHub open **Settings → Pages** and set **Source** to **GitHub Actions**.
Then open the **Actions** tab and wait for **Build and deploy Raah e Hidayath**
to finish. Set the custom domain to `raahehidayath.online` and enable HTTPS.
Do not select **Deploy from a branch**; that mode is what displays repository
files instead of the built application.

For DNS managed by Hostinger, use GitHub Pages' four apex records:

| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | `<your-github-username>.github.io` |

Remove any other `A`, `AAAA`, or forwarding record for `@` or `www` that
conflicts with these records. DNS changes can take time to propagate.

---

Your domain currently shows the README ("Code Edit Helper"). That happens when
the **repository files** are uploaded instead of the **built site**. Hostinger
serves whatever is in `public_html/`, and with no `index.html` there it falls
back to rendering `README.md`.

Below are the two ways to fix it. **Option A works on any Hostinger plan,
including plain shared hosting** — that is the 100% path.

---

## Option A — Static build on shared hosting (recommended, works 100%)

Everything in this app except the Noor AI page is client-side (Quran, Hadith,
Nasheeds, Prophets, Halal/Haram, Scanner, Prayer times, Admin), so it can be
served as plain files.

### 1. Build on your computer

```bash
git clone https://github.com/<you>/<repo>.git
cd <repo>
npm install

# macOS / Linux
NITRO_PRESET=static npm run build

# Windows PowerShell
$env:NITRO_PRESET="static"; npm run build
```

The finished site is in **`.output/public/`** when built outside Lovable.

### 2. Upload

1. Hostinger hPanel → **Files → File Manager** → open `public_html`.
2. **Delete everything already in there** (this is what is showing the README).
3. Upload **the contents of `.output/public/`** — not the folder itself, its
   contents — so `public_html/index.html` exists.
4. Make sure the hidden **`.htaccess`** file came along (File Manager →
   Settings → *Show hidden files*). It is included in the build and handles
   page refreshes on routes like `/quran/36`, plus HTTPS redirect.

### 3. Turn on SSL

hPanel → **Security → SSL** → install the free certificate for your domain.
HTTPS is required for the barcode scanner camera and the voice features.

Visit `https://raahehidayath.online` — the app loads.

**Only limitation:** the Noor AI chat page needs a server, so on shared hosting
it stays disabled. Everything else is fully working. If you want AI too, use
Option B.

---

## Option B — VPS with Node (adds the AI assistant)

Requires a Hostinger **VPS / Cloud** plan.

```bash
ssh root@YOUR_SERVER_IP

curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt-get install -y nodejs git nginx
npm i -g pm2

cd /var/www
git clone https://github.com/<you>/<repo>.git raah
cd raah
npm install
NITRO_PRESET=node-server npm run build
```

Create `/var/www/raah/.env`:

```bash
GEMINI_API_KEY=your_google_ai_studio_key   # free at https://aistudio.google.com/apikey
GEMINI_MODEL=gemini-2.5-flash
PORT=3000
```

Run it:

```bash
pm2 start dist/server/index.mjs --name raah --update-env
pm2 save
pm2 startup      # run the command it prints
curl http://localhost:3000   # should return HTML
```

Nginx — `/etc/nginx/sites-available/raah`:

```nginx
server {
    listen 80;
    server_name raahehidayath.online www.raahehidayath.online;

    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_buffering    off;   # keeps AI streaming smooth
    }
}
```

```bash
ln -s /etc/nginx/sites-available/raah /etc/nginx/sites-enabled/raah
nginx -t && systemctl reload nginx
apt-get install -y certbot python3-certbot-nginx
certbot --nginx -d raahehidayath.online -d www.raahehidayath.online
```

Update later:

```bash
cd /var/www/raah && git pull && npm install \
  && NITRO_PRESET=node-server npm run build && pm2 restart raah
```

---

## DNS (both options)

Hostinger → **Domains → DNS Zone**:

| Type | Name | Value |
|------|------|-------|
| A | @ | your Hostinger server IP |
| A | www | your Hostinger server IP |

(For shared hosting the A records are already correct if the domain is on the
same account — you only need to fix `public_html`.)

---

## Quick checklist if it still shows the README

- [ ] `public_html/index.html` exists (not `README.md`)
- [ ] You uploaded the **contents** of `.output/public/`, not the folder
- [ ] Hidden `.htaccess` is present in `public_html`
- [ ] Browser cache cleared / opened in a private window
- [ ] SSL installed and the site opens on `https://`
