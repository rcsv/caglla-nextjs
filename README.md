# Caglla (Tabi4.me Ver2) 

Tabi no SHIORI（旅のしおり） ✈️📒
旅のすべてを、計画から思い出まで。 A trip planner that helps you organize, document, and share your journeys.

## ✨ 特徴（Features）

- 🗓️ 旅行計画（旅程・宿泊・交通・チェックリスト）
- 👨‍👩‍👧‍👦 同行者との共有
- 📝 旅のしおり PDF 出力（表紙、目次、緊急連絡先付き）
- 📆 Google カレンダー連携
- 🔒 Supabase Auth による Google ログイン
- 📦 Prisma + Supabase によるデータ管理

## 🏗️ 技術スタック（Tech Stack）

- **Next.js (App Router, TypeScript)**
- **Supabase**（Auth / Realtime / PostgreSQL）
- **Prisma ORM**
- **Tailwind CSS**
- **Vercel**（予定）

## 🚀 セットアップ手順（Getting Started）

### 1. リポジトリをクローン

```bash
git clone https://github.com/rcsv/caglla-nextjs.git
cd caglla-nextjs
```

### 2. 必要パッケージのインストール

```bash
pnpm install
```

### 3. 環境変数の設定

`.env.local` に以下を記述：

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
DATABASE_URL=postgresql://your-db-url
DIRECT_URL=postgresql://your-direct-db-url
```

※ Supabase の Project URL / API Key / DB接続URL を設定してください。

### 4. DB マイグレーション（Prisma）

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. 開発サーバー起動

```bash
pnpm dev
```

アクセス： [http://localhost:3000](http://localhost:3000)

## 🗂️ ディレクトリ構成（概要）

```
src/
├── app/              # Next.js App Router
├── components/       # 再利用 UI
├── lib/              # supabaseClient など共通ロジック
├── styles/           # Tailwind ベースのスタイル
└── types/            # 型定義
```

## 📄 今後のロードマップ（Roadmap）

-

## 🧑‍💻 開発者（Author）

- **rcsv**（[@rcsvpg](mailto\:rcsvpg@gmail.com)）

## 📄 ライセンス（License）

MIT License

