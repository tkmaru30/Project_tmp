# アプリテンプレート

新しいWebアプリケーションを作成する際のテンプレートです。

## 推奨構造
```
app-name/
├── frontend/           # フロントエンド
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
├── backend/            # バックエンド
│   ├── src/
│   ├── tests/
│   ├── package.json
│   └── README.md
├── docs/              # アプリ固有のドキュメント
│   ├── api/           # API仕様書
│   ├── design/        # デザイン資料
│   └── deployment/    # デプロイメント情報
├── tests/             # 統合テスト
├── docker/            # Docker設定
├── .github/           # GitHub Actions等
├── .env.example       # 環境変数テンプレート
└── README.md          # アプリの説明
```

## セットアップ手順
1. このテンプレートをコピー
2. アプリ名に合わせてディレクトリ名を変更
3. 必要な依存関係をインストール
4. 環境変数を設定
5. 開発サーバーを起動

## 開発ガイドライン
- コードレビューを必須とする
- テストカバレッジを80%以上維持
- ドキュメントを随時更新
- セキュリティを最優先で考慮