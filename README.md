# Animal Feedback — Frontend (Local-first)

This repository contains a frontend-first Next.js + TypeScript scaffold for the Animal Feedback webapp. It uses Tailwind for styling and a simple localStorage-backed adapter so you can submit feedback with attached animal images (stored as data URLs) without a backend.

Quick start

1. Install dependencies:

```bash
npm install
```

2. Run dev server:

```bash
npm run dev
```

Notes
- By default the app will attempt to use a MongoDB instance. Set `MONGODB_URI` in your environment to enable persistence.
- Image attachments are accepted as data URLs and will be uploaded server-side. If you set `CLOUDINARY_URL` the server will upload images to Cloudinary; otherwise images are saved to `public/uploads`.

Environment variables
- `MONGODB_URI` — MongoDB connection string (optional for demo; without it the app will still run but DB operations will be skipped).
- `CLOUDINARY_URL` — (optional) Cloudinary connection string for hosted image storage.

Local dev tips
- After installing, run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` and submit feedback. Uploaded images will be stored under `public/uploads` unless Cloudinary is configured.
