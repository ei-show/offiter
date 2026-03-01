# CLAUDE.md

ここでは`https://offiter.net`を管理しています。

## プロジェクト概要

Offiter は microCMS をヘッドレス CMS バックエンドとして利用する Next.js（Pages Router）製ブログです。
コンテンツはビルド時に静的生成されます。
サイトは日本語で、IT/クラウドエンジニアリングを対象としています。

## アーキテクチャ

### 主要コンポーネント

| コンポーネント | サービス |
| ホスティング | Vecel |
| バックエンド | microCMS |
| フロント | Next.js |

### データフロー

microCMS API → Aspida 生成クライアント（`src/api/$api.ts`） → ヘルパー関数（`src/libs/getContents.ts`） → ページの `getStaticProps`/`getStaticPaths` → React コンポーネント

### 主要ディレクトリ

- **`pages/`** — Next.js のファイルベースルーティング（投稿: `blogs/[id].tsx`、ページネーション: `pages/blogs/[id].tsx`、タグ絞り込み: `pages/tags/[id].tsx`）
- **`src/components/`** — React コンポーネント。テストは `__tests__/` に併置
- **`src/libs/`** — ユーティリティ: `getContents.ts`（再試行/ページネーション付き CMS 取得）、`types.ts`（コア型）、`gtag.ts`（アナリティクス）、`next-seo.config.ts`
- **`src/api/`** — Aspida の API 型定義。変更後は `npm run api:build` を実行
- **`src/index.ts`** — バレルエクスポート。すべてのコンポーネント/ユーティリティはここからインポート

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

### API 型の変更

1. `src/api/` の型定義を更新
2. `npm run api:build` を実行
3. 必要に応じて `getContents.ts` を更新

## 環境変数

`.env.development.local` に必要:

```
API_KEY=<microcms-api-key>
GA_TRACKING_ID=<google-analytics-id>
NEXT_PUBLIC_BASE_URL=http://localhost:3000
HEADLESS_CMS=https://offiter.microcms.io/api/v1
```

## テストカバレッジの閾値

`jest.config.js` で設定: ステートメント 60%、分岐 45%、関数 25%、行 68%。
