# Offiter

ブログ。

## Requirements

- pnpm - package manager
- vercel CLI - deployment tool for Vercel

## Setup

```sh
pnpm install
vc dev
```

```sh
open http://localhost:3000
```

## Architecture

- TypeScript
- Hono - Framework
- Vercel - Deployment Platform
- Inkdrop - Markdown Editor

### Inkdrop

ブログを書くために使用するMarkdownエディタ。
HonoからInkdropにアクセスしてブログ記事を取得する。

