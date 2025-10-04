# Webアプリケーション管理フォルダ

このフォルダは複数のWebアプリケーションを管理するためのディレクトリです。

## 使用方法

### 新しいWebアプリの作成
Slackから以下のような指示でWebアプリを作成できます：

```
@Cursor 新しいReactアプリ「タスク管理アプリ」を作成して、apps/task-managerフォルダに配置してください
```

### フォルダ構造
各Webアプリは独立したフォルダで管理されます：

```
apps/
├── task-manager/          # タスク管理アプリ
│   ├── src/
│   ├── package.json
│   ├── README.md
│   └── ...
├── blog-system/           # ブログシステム
│   ├── src/
│   ├── package.json
│   ├── README.md
│   └── ...
└── e-commerce/           # ECサイト
    ├── src/
    ├── package.json
    ├── README.md
    └── ...
```

## 命名規則
- フォルダ名：ケバブケース（例：my-web-app）
- 日本語名をケバブケースに変換（例：「タスク管理アプリ」→ task-manager）

## 各アプリの必須ファイル
1. `README.md` - アプリの概要と使用方法
2. `package.json` - 依存関係とスクリプト
3. `.env.example` - 環境変数のサンプル

## 開発時の注意事項
- 各アプリは独立して開発・デプロイできるよう設計
- 共通コンポーネントが必要な場合は `/workspace/shared/` に配置
- ポート番号の重複を避ける（3000番台から順次使用）

## Slack連携での作成例
```
# React + TypeScript アプリの作成
@Cursor React TypeScriptで「商品管理システム」を作成し、apps/product-managementに配置してください

# Next.js アプリの作成
@Cursor Next.jsで「ブログサイト」を作成し、apps/blog-siteに配置してください

# Express API の作成
@Cursor Express.jsで「ユーザー管理API」を作成し、apps/user-apiに配置してください
```

作成されたアプリは自動的にこのフォルダ構造に従って配置され、適切な設定ファイルが生成されます。

## 📱 現在利用可能なアプリ

### 🎮 じゃんけんゲーム (`janken-game/`)
ブラウザで遊べる美しいじゃんけんゲームWebアプリケーション

**機能:**
- モダンなグラデーション背景とグラスモーフィズム
- グー・パー・チョキでコンピューターと対戦
- キーボードサポート（R/1=グー, P/2=パー, S/3=チョキ）
- レスポンシブ対応（デスクトップ・モバイル）
- 選択時のバウンスアニメーション

**使用方法:**
```bash
# ブラウザでファイルを開く
open apps/janken-game/index.html
```

### 📸 証明写真ジェネレーター (`photo-id-generator/`)
写真をアップロードして、プロ品質の証明写真を自動生成するアプリケーション

**機能:**
- 自動背景変更（白色、青色、グレー）
- サイズ調整（パスポート、運転免許証、履歴書用）
- 明るさ・コントラスト調整
- 高品質PNG出力

**使用方法:**
```bash
# ブラウザでファイルを開く
open apps/photo-id-generator/index.html
```

### 🛍️ メルカリ写真加工ツール (`mercari-photo-enhancer/`)
商品写真をプロ級に加工して、メルカリでの売上アップを目指すアプリケーション

**機能:**
- 6つの加工プリセット（自動最適化、明るく鮮やか、クリーン背景など）
- カスタム詳細調整（明るさ、コントラスト、彩度、シャープネス）
- リアルタイムプレビュー
- 商品カテゴリ別最適化

**使用方法:**
```bash
# ブラウザでファイルを開く
open apps/mercari-photo-enhancer/index.html
```

### 📅 Outlookスケジューラー (`outlook-scheduler/`)
メール内容から日時要求を自動解析し、Outlook予定表の空き時間を検索して自動返信を生成するPythonツール

**機能:**
- 自動メール監視と日時要求検出
- 自然言語処理による日時情報抽出
- Microsoft Graph APIによる予定表連携
- 空き時間スロットの自動検索
- 自動返信メール生成・送信

**使用方法:**
```bash
# デモモードで動作確認
cd apps/outlook-scheduler && python run_demo.py

# メール監視の開始
cd apps/outlook-scheduler && python email_monitor.py
```

## 🔧 共通コンポーネント

画像処理系のアプリ（証明写真ジェネレーター、メルカリ写真加工ツール）は `/workspace/shared/image-processor.js` の共通ライブラリを使用しており、以下の機能を提供：
- 高度な画像処理機能
- ファイルアップロード・検証
- ドラッグ&ドロップ機能
