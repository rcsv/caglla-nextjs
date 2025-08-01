# AGENT.md

## 1. エージェントの目的
- データベーススキーマの整合性チェック  
- Prismaモデル／SQL のリファクタリング支援  
- マイグレーションファイル生成のサポート  

## 2. プロジェクト概要
- **サービス名**：Tabi no SHIORI（tabi4.me）  
- **技術スタック**：Next.js, Supabase (PostgreSQL), Prisma ORM  
- **リポジトリ**：https://github.com/rcsv/caglla-nextjs  

## 3. ファイル構成
| 種別                     | パス                                |
|------------------------|-----------------------------------|
| Prisma schema          | `prisma/schema.prisma`            |
| マイグレーション履歴        | `prisma/migrations/**`             |
| 環境変数                 | `.env.local` (`DATABASE_URL` 設定済) |
| Supabase クライアント設定  | `src/lib/supabaseClient.ts`        |

## 4. 命名規約
- **テーブル**：snake_case（例：`trips`、`emergency_contacts`）  
- **カラム**：snake_case（例：`trip_id`、`start_date`）  
- **Prisma モデル**：PascalCase（例：`Trip`、`EmergencyContact`）  
- **モデル内フィールド**：camelCase（例：`startDate`、`endDate`）  
- **マスターテーブル**：`Mst_` プレフィックス（例：`Mst_Airport`）

## 5. チェックポイント
1. 外部キー制約（`@relation`）が正しく設定されているか  
2. null許容／既定値の妥当性  
3. 一意制約・インデックスの過不足  
4. Prisma schema と実際の DB のズレ  
5. 冗長・重複カラムの有無  

## 6. リファクタリングガイドライン
- **冗長なカラム統合** or **不要カラム削除**  
- 共通定義は **Enum** や **マスターテーブル** に切り出す  
- JSON／配列型フィールドの適切活用検討  
- マイグレーション手順は `diff` 形式 or SQL 例で提示  
- コミットメッセージは【Conventional Commits】準拠  

## 7. 出力フォーマット
- 差分は ```diff``` ブロックで示す  
- 問題箇所やテーブル一覧は Markdown テーブルで明示  
- 提案ごとに「目的」「変更内容」「期待効果」を簡潔に  

## 8. 実行コマンド例
```bash
# スキーマを最新化
npx prisma db pull
# マイグレーション状態確認
npx prisma migrate status
# Prisma クライアント生成
npx prisma generate
```
