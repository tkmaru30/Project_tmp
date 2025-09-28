# じゃんけんゲーム プロジェクト

## 📋 プロジェクト概要

シンプルで楽しいじゃんけんゲームのWebアプリケーションです。ユーザーはコンピューターとじゃんけんを楽しむことができ、勝敗の記録や統計を確認できます。

## 🎯 プロジェクト目標

- **ユーザビリティ**: 直感的で使いやすいインターフェース
- **パフォーマンス**: 高速でスムーズな動作
- **拡張性**: 将来的な機能追加に対応できる設計
- **品質**: 高品質なコードとテストカバレッジ

## 🏗️ プロジェクト構成

```
janken-game/
├── src/                    # ソースコード
│   ├── components/         # React/Vueコンポーネント
│   ├── utils/             # ユーティリティ関数
│   ├── types/             # TypeScript型定義
│   └── styles/            # CSS/SCSSスタイル
├── public/                # 静的ファイル
├── docs/                  # ドキュメント
│   ├── api/               # API仕様書
│   ├── design/            # デザイン仕様
│   └── deployment/        # デプロイメント手順
├── tests/                 # テストファイル
│   ├── unit/              # 単体テスト
│   ├── integration/       # 統合テスト
│   └── e2e/               # E2Eテスト
├── scripts/               # ビルド・デプロイスクリプト
├── config/                # 設定ファイル
├── package.json           # 依存関係管理
├── README.md              # このファイル
└── CONTRIBUTING.md        # コントリビューションガイド
```

## 🚀 クイックスタート

### 前提条件

- Node.js 18.0.0以上
- npm または yarn
- Git

### セットアップ手順

1. **リポジトリのクローン**
   ```bash
   git clone <repository-url>
   cd janken-game
   ```

2. **依存関係のインストール**
   ```bash
   npm install
   # または
   yarn install
   ```

3. **開発サーバーの起動**
   ```bash
   npm run dev
   # または
   yarn dev
   ```

4. **ブラウザでアクセス**
   ```
   http://localhost:3000
   ```

## 🛠️ 開発ガイドライン

### コーディング規約

- **言語**: TypeScript/JavaScript
- **スタイル**: ESLint + Prettier設定に従う
- **命名**: camelCase（変数・関数）、PascalCase（コンポーネント）
- **コメント**: 複雑なロジックには必ずコメントを記述

### ブランチ戦略

- `main`: 本番環境用ブランチ
- `develop`: 開発統合ブランチ
- `feature/*`: 機能開発ブランチ
- `hotfix/*`: 緊急修正ブランチ

### コミットメッセージ規約

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Type例:**
- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント更新
- `style`: コードフォーマット
- `refactor`: リファクタリング
- `test`: テスト追加・修正
- `chore`: その他の変更

## 🧪 テスト戦略

### テストレベル

1. **単体テスト**: 個別関数・コンポーネントのテスト
2. **統合テスト**: 複数コンポーネント間の連携テスト
3. **E2Eテスト**: ユーザーシナリオベースのテスト

### テスト実行

```bash
# 全テスト実行
npm test

# 単体テストのみ
npm run test:unit

# E2Eテストのみ
npm run test:e2e

# カバレッジレポート
npm run test:coverage
```

## 📦 ビルド・デプロイ

### ビルド

```bash
# 本番用ビルド
npm run build

# 開発用ビルド
npm run build:dev
```

### デプロイ

```bash
# ステージング環境
npm run deploy:staging

# 本番環境
npm run deploy:production
```

## 🔧 開発環境

### 推奨エディタ設定

- **VSCode**: 推奨エディタ
- **拡張機能**:
  - ESLint
  - Prettier
  - TypeScript Importer
  - GitLens

### 環境変数

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NODE_ENV=development
```

## 📊 プロジェクト管理

### PMO管理
プロジェクト管理オフィス（PMO）関連の資料は `01_docs/06_pmo/` で管理されています。

- **統合管理**: プロジェクト憲章、管理計画書
- **スコープ管理**: 要件定義、WBS
- **品質管理**: 品質計画、品質メトリクス
- **リスク管理**: リスク登録簿、リスク評価
- **ステークホルダー管理**: 登録簿、分析
- **プロジェクトダッシュボード**: 進捗・状況管理

### タスク管理

- **GitHub Issues**: バグ報告・機能要求
- **GitHub Projects**: タスクボード管理
- **Milestones**: リリース計画

### レビュープロセス

1. **プルリクエスト作成**
2. **自動テスト実行**
3. **コードレビュー**
4. **承認後マージ**

### リリースサイクル

- **スプリント**: 2週間
- **リリース**: 月1回（月末）
- **ホットフィックス**: 必要に応じて

## 🤝 コントリビューション

### 参加方法

1. リポジトリをフォーク
2. 機能ブランチを作成
3. 変更をコミット
4. プルリクエストを作成

### コントリビューションガイドライン

詳細は [CONTRIBUTING.md](./CONTRIBUTING.md) を参照してください。

## 📞 サポート・連絡先

- **プロジェクトマネージャー**: [PM名]
- **技術リード**: [Tech Lead名]
- **Slack**: #janken-game
- **メール**: janken-game@company.com

## 📄 ライセンス

このプロジェクトは [MIT License](./LICENSE) の下で公開されています。

## 🗺️ ロードマップ

### Phase 1 (MVP)
- [x] 基本的なじゃんけん機能
- [x] シンプルなUI
- [ ] 基本的なテスト

### Phase 2 (Enhancement)
- [ ] 統計機能
- [ ] アニメーション
- [ ] レスポンシブデザイン

### Phase 3 (Advanced)
- [ ] マルチプレイヤー機能
- [ ] ランキングシステム
- [ ] カスタマイズ機能

---

**最終更新**: 2024年12月
**バージョン**: 1.0.0