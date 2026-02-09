# Copyscape Proxy for ContentCheck

Simple API proxy to enable Copyscape integration in ContentCheck.

## Deploy to Vercel

1. Push this folder to a GitHub repository
2. Go to vercel.com → "Add New Project"
3. Import your GitHub repo
4. Click "Deploy"
5. Copy your deployment URL (e.g., `https://copyscape-proxy-xxx.vercel.app`)

## Usage

- **Check balance:** `GET https://your-url.vercel.app/api/copyscape?action=balance`
- **Search text:** `POST https://your-url.vercel.app/api/copyscape?action=search` with `{ "text": "content to check" }`
