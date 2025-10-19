# AI最新ニュース - News Aggregator

世界中の主要なテックメディアからAI関連の最新ニュースを自動収集して表示するウェブアプリケーションです。

## 機能

- 🤖 複数のニュースソースからAI関連ニュースを自動収集
- 📰 最新50件のニュースを時系列で表示
- 🎨 モダンで美しいUI/UX
- 🔄 リアルタイムでニュースを更新
- 📱 レスポンシブデザイン対応

## ニュースソース

- MIT Technology Review
- TechCrunch - AI
- AI News
- VentureBeat - AI

## セットアップ

### 必要な環境

- Python 3.8以上（Python 3.13でテスト済み）
- pip

### インストール手順

1. 依存パッケージをインストール:
```bash
cd 02_apps/02_ai-news-app
pip install -r requirements.txt
```

2. アプリケーションを起動:
```bash
python app.py
```

3. ブラウザで以下のURLにアクセス:
```
http://localhost:5000
```

## 使い方

1. アプリケーションを起動するとホームページが表示されます
2. 自動的に最新のAIニュースが読み込まれます
3. 「🔄 更新」ボタンをクリックすると最新のニュースを再取得します
4. 各ニュースカードの「続きを読む」リンクから元記事にアクセスできます

## 技術スタック

### バックエンド
- **Flask**: Pythonウェブフレームワーク
- **xml.etree.ElementTree**: RSSフィードのXML解析（標準ライブラリ）
- **BeautifulSoup4**: HTMLコンテンツの処理
- **requests**: HTTP通信
- **python-dateutil**: 日付のパース

### フロントエンド
- **HTML5**: マークアップ
- **CSS3**: モダンなスタイリング（グラデーション、アニメーション）
- **JavaScript**: 非同期データ取得とDOM操作

## API エンドポイント

### GET /api/news

最新のAIニュースを取得します。

**レスポンス例:**
```json
{
  "success": true,
  "count": 50,
  "news": [
    {
      "title": "ニュースのタイトル",
      "link": "https://example.com/article",
      "source": "TechCrunch - AI",
      "published": "2025-10-19 12:30",
      "summary": "ニュースの要約...",
      "timestamp": 1729338600.0
    }
  ]
}
```

## カスタマイズ

### ニュースソースの追加

`app.py` の `NEWS_SOURCES` リストにRSSフィードのURLを追加できます:

```python
NEWS_SOURCES = [
    {
        'name': 'あなたのソース名',
        'url': 'https://example.com/rss',
        'category': 'ai'
    },
    # ... 他のソース
]
```

### 表示件数の変更

- 各ソースからの取得件数: `fetch_news()` 関数の `[:10]` を変更
- 最終的な表示件数: `return all_news[:50]` の数字を変更

## トラブルシューティング

### ニュースが表示されない場合

1. インターネット接続を確認してください
2. RSSフィードのURLが有効か確認してください
3. ブラウザのコンソールでエラーメッセージを確認してください

### ポート5000が使用中の場合

`app.py` の最後の行でポート番号を変更できます:
```python
app.run(debug=True, host='0.0.0.0', port=8080)  # 8080に変更
```

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 今後の拡張予定

- [ ] キーワード検索機能
- [ ] カテゴリフィルター
- [ ] お気に入り機能
- [ ] ダークモード対応
- [ ] 多言語対応
