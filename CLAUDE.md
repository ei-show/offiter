# CLAUDE.md

ここでは`https://offiter.net`を管理しています。

## プロジェクト概要

Offiter は Git サブモジュール（`managed-life`）内のマークダウンファイルをコンテンツソースとして利用する Next.js（Pages Router）製ブログです。
コンテンツはビルド時に静的生成されます。
サイトは日本語で、IT/クラウドエンジニアリングを対象としています。

## アーキテクチャ

### 主要コンポーネント

| コンポーネント | サービス |
| ホスティング | Vecel |
| コンテンツ | Git サブモジュール（`content/managed-life/blog/*.md`） |
| フロント | Next.js |

### データフロー

`content/managed-life/blog/*.md` → `src/libs/markdownContents.ts`（gray-matter でパース） → `src/libs/getContents.ts`（ラッパー関数） → ページの `getStaticProps`/`getStaticPaths` → React コンポーネント

### 主要ディレクトリ

- **`content/managed-life/`** — Git サブモジュール。`blog/*.md` がコンテンツソース、`blog/*.png` 等が画像
- **`pages/`** — Next.js のファイルベースルーティング（投稿: `blogs/[id].tsx`、ページネーション: `pages/blogs/[id].tsx`、タグ絞り込み: `pages/tags/[id].tsx`）
- **`src/components/`** — React コンポーネント。テストは `__tests__/` に併置
- **`src/libs/`** — ユーティリティ: `markdownContents.ts`（マークダウンパース）、`getContents.ts`（外部向けラッパー）、`types.ts`（コア型）、`gtag.ts`（アナリティクス）、`next-seo.config.ts`
- **`src/index.ts`** — バレルエクスポート。すべてのコンポーネント/ユーティリティはここからインポート
- **`scripts/copy-blog-images.js`** — `content/managed-life/blog/` の画像を `public/blog/` にコピー（`predev`/`prebuild` で自動実行）

### マークダウンファイル形式

```yaml
---
title: 記事タイトル
description: 説明文
created_at: 2026/03/01
updated_at: # 空白 OK → created_at にフォールバック
image: /blog/image.png # オプション（未指定時はデフォルト画像）
tag:
  - タグ名
---
本文（zenn-markdown-html でレンダリング）
```

Blog ID = ファイル名から `.md` を除いたもの（例: `20260301-test`）

### スタイリング

- メインUI: DaisyUI
- Font: `font-title`（Hachi Maru Pop）、`font-head`（Kosugi Maru）、`font-body`（Noto Sans JP）
- ブログ本文は SCSS モジュール（`styles/blog.module.scss`）でスタイル適用

### Markdown レンダリング

ブログ本文は `zenn-markdown-html` でパースし、`zenn-content-css` でスタイル。目次はサーバー側で JSDOM により見出し要素から抽出。

## 規約

- インポート: パスエイリアス `@/src/`, `@/pages/`, `@/styles/` を使用
- エクスポート: 公開コンポーネント/ユーティリティは `src/index.ts` 経由
- コードスタイル: Prettier（`singleQuote: true`, `semi: false`, `printWidth: 120`、インデント 2 スペース）
- TypeScript: strict モード有効。未使用引数は `_` を接頭辞に
- コミット: Conventional Commits（`feat:`、`fix:`、`chore:` など）
- Git フック: pre-commit は lint-staged（ステージ済みの TS ファイルに ESLint + Prettier）を実行、pre-push は type-check を実行

### コンポーネントの追加

1. `src/components/ComponentName.tsx` を作成
2. `src/index.ts` にエクスポートを追加
3. `src/components/__tests__/ComponentName.test.tsx` にテストを追加
4. `import { ComponentName } from '@/src/index'` でインポート

### コンテンツの管理

- `content/managed-life/blog/` にマークダウンファイルを追加
- ファイル名がブログ ID になる（例: `20260301-post.md` → `/blogs/20260301-post`）
- 画像は同ディレクトリに置く → ビルド時に `public/blog/` にコピーされる
- サブモジュール更新: `npm run submodule:update`

## 環境変数

`.env.development.local` に必要:

```
GA_TRACKING_ID=<google-analytics-id>
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## テストカバレッジの閾値

`jest.config.js` で設定: ステートメント 60%、分岐 45%、関数 25%、行 68%。
