# Database Naming Conventions

This project standardizes database naming to follow common practices in the Next.js community.

## Tables
- **Format:** `snake_case` plural (e.g., `trips`, `checklist_items`)
- **Master tables:** prefix with `mst_` (e.g., `mst_currencies`)

## Prisma Models
- **Format:** `PascalCase` (e.g., `Trip`, `ChecklistItem`)
- **Master models:** prefix with `Mst` (e.g., `MstCurrency`)

## Columns
- **Format:** `snake_case` (e.g., `user_id`, `start_date`)
- Prisma fields use `camelCase` with `@map` to match column names (e.g., `userId @map("user_id")`).

## Common Fields
Every table includes:
- `id` – `String @id @default(uuid())`
- `created_at` – tracked via Prisma field `createdAt @default(now())`
- `updated_at` – tracked via Prisma field `updatedAt @updatedAt`

These conventions ensure consistent naming across the schema and codebase.
