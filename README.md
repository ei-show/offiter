# Offiter's Homepage
[https://offiter.net](https://offiter.net)

## 動作環境
```sh
$ node -v
v14.18.1
```

## 使い方
このリポジトリをクローンします。
```sh
git clone https://github.com/ei-show/offiter.git
npm ci
npx husky install
```

### 環境変数の作成
#### `local env` ファイルの作成
`.env.development.local` ファイルを追加します。
```
API_KEY=8fae269a-fb4a-480d-83de-598e8fac61d1
GA_TRACKING_ID=G-AXXXXXXXXX
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

#### deploy env
localの内容をdeploy先に環境変数として登録します。
```
API_KEY=8fae269a-fb4a-480d-83de-598e8fac61d1
GA_TRACKING_ID=G-AXXXXXXXXX
NEXT_PUBLIC_BASE_URL=https://offiter.net
```

`NEXT_PUBLIC_BASE_URL` だけ値が違うことに注意してください。
なお、 `NEXT_PUBLIC_BASE_URL` の環境変数はproductionに応じた値に変更予定です。

### ローカル実行
`npm run dev` を実行します。
ブラウザで [http://localhost:3000](http://localhost:3000) を開くと確認することができます。  
なお、このリポジトリのproductionは [http://offiter.net](http://offiter.net) になります。

## アーキテクチャ

### デプロイ

Next.jsを開発している [Vercel](https://vercel.com) としている。

### ヘッドレスCMS

APIベースの日本製ヘッドレスCMSである [microCMS](https://microcms.io) を利用しています。

### その他主要なライブラリ

- fontawesome
- tailwindcss
- canvas
- highlight.js
- jsdom
- next-seo

`fontawesome` はアイコンを提供するライブラリです。  
`tailwindcss` はCSSフレームワークです。  
`canvas` は自由にお絵かきできるライブラリです。  
`highlight.js` はcodeにシンタックスハイライトを付与するライブラリです。  
`jsdom` はhtml解析ライブラリです。  
`next-seo` はSEOデータを付与するライブラリです。  

