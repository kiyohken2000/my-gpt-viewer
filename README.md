# ガチ有能AI助手 画像ビューア

スマホアプリ「ガチ有能AI助手」で生成したAI画像をWebで閲覧・管理するビューア。

## 技術スタック

- **フレームワーク**: React + React Native Web
- **バックエンド**: Firebase (Firestore / Storage)
- **検索**: Algolia
- **決済**: Stripe
- **ホスティング**: Cloudflare Pages
- **定期実行**: Cloudflare Workers (Cron Triggers)

## セットアップ

```bash
yarn install
```

## 開発

```bash
yarn start
```

## デプロイ

### フロントエンド (Cloudflare Pages)

```bash
# ビルド → デプロイ
yarn deploy:prod

# デプロイのみ
yarn deploy
```

### Cloudflare Workers (keep-alive)

```bash
yarn deploy:workers
```

## Cloudflare Workers

`workers/keepalive/` にCloud Run APIのkeep-alive Workerがあります。

6時間ごとに以下を実行します：
- `generateTags` APIへのリクエスト
- 有効な画像生成モデル（19件）へのウォームアップリクエスト

### Workerのローカルテスト

```bash
cd workers/keepalive
npx wrangler dev --test-scheduled
# 別ターミナルで
curl "http://localhost:8787/__scheduled?cron=0+*/6+*+*+*"
```

### Workerのデプロイ

```bash
cd workers/keepalive
npx wrangler deploy
```
