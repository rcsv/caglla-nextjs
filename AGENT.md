# AGENT.md — Implement /dashboard → /trip/[id] Navigation & Trip Detail Page

> Repo: rcsv/caglla-nextjsStack: Next.js 15 (App Router), React 19, TypeScript, Supabase (@supabase/supabase-js + SSR helpers), Vercel deploy targetContext: Bubble.io 版 tabi4.me を Next.js に移植中。DB は Supabase。RLS 有効。

## 🎯 Goal

- /dashboard に表示される旅行一覧の「旅行名」をクリックすると /trip/[id] に遷移し、
- 遷移先ページは /docs/2pains/ 配下の HTML/CSS をベースにレンダリングする。

## ✅ Definition of Done

1. /dashboard の旅行名リンクをクリックすると /trip/[id] に遷移する。
2. /trip/[id] が ログイン済みユーザーのみ閲覧可能（未ログイン時は /login へリダイレクト）。
3. Supabase から id で Trip を1件取得し、404/権限エラー時はわかりやすい UI を表示。
4. ページのレイアウト/スタイルは /docs/2pains/*.html と *.css をベースに反映（クラス名やレイアウトが概ね一致）。
5. ESLint/TypeCheck/Build が通る。コミットと PR に変更理由・動作確認手順を明記。

## 📁 Files to Add / Modify
- src/app/dashboard/page.tsx（リンク化のみ）
- src/app/trip/[id]/page.tsx（新規）
- src/app/trip/[id]/loading.tsx（任意：ローディング UI）
- src/app/trip/[id]/not-found.tsx（任意：404 UI）
- src/app/trip/[id]/trip.css（新規：/docs/2pains/*.css を移植）
- （必要なら）public/trip-assets/*（/docs/2pains の画像/フォントを配置）

> 参考：Next.js App Router は ルートセグメント単位で CSS をインポート可能。page.tsx で import './trip.css' して OK。

## 🔐 Auth & RLS Policy Notes
- クライアント側の Supabase で auth.getSession() を呼び、未ログインは /login に遷移。
- trips テーブルは RLS 有効想定。select ポリシーで user_id = auth.uid() を許可しておく（既に設定済みであること）。
- 取得クエリは eq('id', params.id) のみで OK（RLS により他人のデータは不可視）。

## 🛠️ Step-by-Step Tasks

### 1) Dashboard の旅行名をリンク化

- src/app/dashboard/page.tsx で旅行名の表示を <Link href={\/trip/${t.id}`}>{t.title}` に変更。
- import Link from 'next/link' を追加。


### 2) Trip 詳細ページを作成

- src/app/trip/[id]/page.tsx（Client Component）
- useParams() で id を取得。
- Supabase クライアント（@/utils/supabase/client）で auth.getSession() を実行。
-- セッションがなければ /login へ router.push('/login')。
- trips から id で single() 取得。error?.code === 'PGRST116' などは 404 相当として扱う。
- import './trip.css' して /docs/2pains のスタイルを適用。
- /docs/2pains/*.html を JSX 化（class → className、for → htmlFor 等）。必要に応じて一部をコンポーネント化。

> サンプル実装ポイント（概略）
> - const { id } = useParams<{ id: string }>();
> - const { data: { session } } = await supabase.auth.getSession();
> - const { data: trip } = await supabase.from('trips').select('*').eq('id', id).single();
> - JSX レンダリングで trip.title, trip.start_date などを埋め込む。

### 3) 2pains HTML/CSS の取り込み

- /docs/2pains/ 配下の 元 HTML と CSS を確認。
- **CSS**：trip.css にコピペ。パス解決が必要なアセット（画像/フォント）は public/trip-assets/ 等へ移し、CSS 内の URL を書き換え。
- **HTML**：必要部分を JSX として page.tsx に移植。フォームやリンク等の動作は Next.js/React 仕様に修正。

### 4) ローディング/エラー/空データ UI

- loading.tsx：スピナー or スケルトン。
- not-found.tsx：Trip が見つからない場合の文言。
- page.tsx 内でエラー表示（例：権限不足・ネットワークエラー）。

### 5) 型定義

- 既存の @/types/trip があれば流用。なければ最低限：

```typescript
export type Trip = {
  id: string;
  title: string;
  start_date: string | null;
  end_date: string | null;
  // owner/user_id などがあれば追記
};
```

## 🧪 QA Checklist



## 🧰 Local Commands

```bash
pnpm dev         # 開発起動（Turbopack 有効ならログ確認）
pnpm lint        # ESLint
pnpm build       # 本番ビルド
pnpm start       # 本番起動
```

> .env.local に NEXT_PUBLIC_SUPABASE_URL と NEXT_PUBLIC_SUPABASE_ANON_KEY が設定済みであること。

## 🔎 Error Tips

- permission denied for schema public が出る：RLS/Policy が未設定か、クエリがサーバー経由ではなく未認証状態で飛んでいる可能性。auth.getSession() の戻りや、プロバイダログイン後のセッションを確認。
- null value in column "updatedAt" 等：DB の DEFAULT now() 未設定。Prisma に合わせて DDL を統一、または Supabase 側で DEFAULT timezone('utc', now()) を設定。
- UUID vs TEXT：id の型を DB と型定義/Prisma で一致させる。uuid 推奨。

## 📦 Deliverables

- 変更済み/追加ファイル（上記の通り）
- 動作スクリーンショット（/dashboard と /trip/[id]）
- PR 説明（下記テンプレ使用）


## 📝 Commit Message Template

```markdown
feat(trip): link dashboard titles to /trip/[id] and add trip detail page

- add Link to titles on /dashboard
- create /trip/[id] route with Supabase fetch and auth guard
- import 2pains CSS as trip.css and port HTML to JSX
- add loading/not-found UIs
```


## 🔀 PR Description Template

#### Summary

- Implement navigation from dashboard to /trip/[id]
- Build trip detail page using /docs/2pains HTML/CSS

#### How to Test

- Login → open /dashboard
- Click a trip title → confirm transition to /trip/<uuid>
- See trip data and styles applied

#### Notes

- RLS policy required: trips.user_id = auth.uid() for SELECT
- Assets from /docs/2pains moved to public/trip-assets/*

## 🧭 Follow-ups (Optional)

- Server Component 化（SSR）＋ @supabase/ssr の createServerClient を使う
- 旅行に紐づくアクティビティ一覧やメンバー表示を追加
- Vitest/Playwright による E2E テスト
- 2pains テンプレのコンポーネント化（Header/Footer を共通化）