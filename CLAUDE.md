# CLAUDE.md

ここでは`https://offiter.net`を管理しています。

## プロジェクト概要

Offiter は GitHub リポジトリ（`ei-show/managed-life`）のマークダウンファイルをコンテンツソースとして利用する Next.js（Pages Router）製ブログです。
コンテンツはビルド時に GitHub API + raw URL 経由で取得して静的生成されます。
サイトは日本語で、IT/クラウドエンジニアリングを対象としています。

## アーキテクチャ

### 主要コンポーネント

| コンポーネント | サービス |
| ホスティング | Vecel |
| コンテンツ | GitHub API + raw URL（`ei-show/managed-life` リポジトリの `blog/<id>/blog.md`） |
| フロント | Next.js |

### データフロー

GitHub API（ディレクトリ一覧）/ `raw.githubusercontent.com`（blog.md 取得） → `src/libs/markdownContents.ts`（gray-matter でパース） → `src/libs/getContents.ts`（ラッパー関数） → ページの `getStaticProps`/`getStaticPaths` → React コンポーネント

### 主要ディレクトリ

- **`pages/`** — Next.js のファイルベースルーティング（投稿: `blogs/[id].tsx`、ページネーション: `pages/blogs/[id].tsx`、タグ絞り込み: `pages/tags/[id].tsx`）
- **`src/components/`** — React コンポーネント。テストは `__tests__/` に併置
- **`src/libs/`** — ユーティリティ: `markdownContents.ts`（マークダウンパース・GitHub API アクセス）、`getContents.ts`（外部向けラッパー）、`types.ts`（コア型）、`gtag.ts`（アナリティクス）、`next-seo.config.ts`
- **`src/index.ts`** — バレルエクスポート。すべてのコンポーネント/ユーティリティはここからインポート

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

Blog ID = ディレクトリ名（例: `blog/20260301-test/blog.md` → ID は `20260301-test`）

### 画像配信

ブログ内の相対画像パス（例: `![alt](image.png)`）はビルド時に `raw.githubusercontent.com` URL に自動変換される。
画像は `ei-show/managed-life` リポジトリの `blog/<id>/` ディレクトリに置く。

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

- `ei-show/managed-life` リポジトリの `blog/<id>/blog.md` にマークダウンファイルを追加
- ディレクトリ名がブログ ID になる（例: `blog/20260301-post/blog.md` → `/blogs/20260301-post`）
- 画像はそのブログのディレクトリに置く（例: `blog/20260301-post/image.png`）→ `raw.githubusercontent.com` 経由で直接配信

## 環境変数

`.env.development.local` に必要:

```
GA_TRACKING_ID=<google-analytics-id>
NEXT_PUBLIC_BASE_URL=http://localhost:3000
GITHUB_TOKEN=ghp_xxxxx  # オプション（GitHub API レート制限緩和用）
```

## テストカバレッジの閾値

`jest.config.js` で設定: ステートメント 60%、分岐 45%、関数 25%、行 68%。
