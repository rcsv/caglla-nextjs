#!/bin/bash

find prisma/migrations -type f -name 'migration.sql' | while read file; do
  cp "$file" "$file.bak"

  # 「id」行に DEFAULT がついていないものだけ置換
  sed -i '/"id" TEXT NOT NULL\(,\)/ {
    /DEFAULT/! s/"id" TEXT NOT NULL,/"id" TEXT NOT NULL DEFAULT uuid_generate_v4(),/
  }' "$file"
  echo "Patched $file"
done
