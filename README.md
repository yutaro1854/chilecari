# Chilecari

## Development

```bash
npm i
npm run dev
```

## Supabase setup

### 1. SQL migration

- Supabase Dashboard → SQL Editor に `supabase/migrations/0001_init.sql` を貼り付けて実行してください。

### 2. Auth (Google)

- Supabase Dashboard → Authentication → Providers → Google を有効化します。
- Google Cloud 側で OAuth クライアントを作成し、Client ID / Secret を設定してください。

### 3. Environment variables

- `.env.example` または `app/.env.example` をコピーして `.env.local` を作成し、以下を設定します。

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Storage bucket

- Supabase Dashboard → Storage で `listing-images` バケットを作成します。
- Public read を有効にし、アップロードは「listing owner フォルダのみ許可」する RLS を前提に設定してください。
