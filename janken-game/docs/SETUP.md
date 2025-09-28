# 開発環境セットアップガイド

## 🎯 概要

このガイドでは、じゃんけんゲームプロジェクトの開発環境を構築する手順を説明します。

## 📋 前提条件

### 必須ソフトウェア

| ソフトウェア | バージョン | 用途 |
|-------------|-----------|------|
| Node.js | 18.0.0以上 | JavaScript実行環境 |
| npm | 8.0.0以上 | パッケージ管理 |
| Git | 2.30.0以上 | バージョン管理 |
| VS Code | 最新版 | 推奨エディタ |

### 推奨ソフトウェア

| ソフトウェア | バージョン | 用途 |
|-------------|-----------|------|
| Docker | 20.10.0以上 | コンテナ環境 |
| Docker Compose | 2.0.0以上 | マルチコンテナ管理 |
| Postman | 最新版 | APIテスト |

## 🚀 セットアップ手順

### 1. リポジトリのクローン

```bash
# SSHを使用する場合
git clone git@github.com:your-org/janken-game.git
cd janken-game

# HTTPSを使用する場合
git clone https://github.com/your-org/janken-game.git
cd janken-game
```

### 2. Node.js環境の確認

```bash
# Node.jsのバージョン確認
node --version

# npmのバージョン確認
npm --version

# 推奨バージョンでない場合は、nvmを使用してインストール
# nvm install 18.17.0
# nvm use 18.17.0
```

### 3. 依存関係のインストール

```bash
# 依存関係をインストール
npm install

# またはyarnを使用する場合
yarn install
```

### 4. 環境変数の設定

```bash
# 環境変数ファイルを作成
cp .env.example .env.local

# 環境変数を編集（必要に応じて）
nano .env.local
```

**環境変数の例:**
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/janken_game
```

### 5. データベースのセットアップ（必要に応じて）

```bash
# Dockerを使用する場合
docker-compose up -d postgres

# またはローカルにPostgreSQLをインストール
# データベースの作成
createdb janken_game
```

### 6. 開発サーバーの起動

```bash
# 開発サーバーを起動
npm run dev

# または
yarn dev
```

### 7. 動作確認

ブラウザで `http://localhost:3000` にアクセスして、アプリケーションが正常に動作することを確認してください。

## 🛠️ 開発ツールの設定

### VS Code設定

#### 推奨拡張機能

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "eamodio.gitlens",
    "ms-vscode.vscode-json"
  ]
}
```

#### ワークスペース設定

`.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

### ESLint設定

`.eslintrc.js`:
```javascript
module.exports = {
  extends: [
    'next/core-web-vitals',
    '@typescript-eslint/recommended',
    'prettier'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    'prefer-const': 'error'
  }
}
```

### Prettier設定

`.prettierrc`:
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

## 🧪 テスト環境のセットアップ

### 1. テストライブラリのインストール

```bash
# Jest + React Testing Library
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Playwright for E2E testing
npm install --save-dev @playwright/test
```

### 2. テストの実行

```bash
# 全テスト実行
npm test

# ウォッチモードでテスト実行
npm run test:watch

# カバレッジレポート生成
npm run test:coverage

# E2Eテスト実行
npm run test:e2e
```

## 🐳 Docker環境

### Docker Compose設定

`docker-compose.yml`:
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - postgres

  postgres:
    image: postgres:13
    environment:
      POSTGRES_DB: janken_game
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Docker環境での起動

```bash
# 全サービス起動
docker-compose up -d

# ログ確認
docker-compose logs -f app

# サービス停止
docker-compose down
```

## 🔧 トラブルシューティング

### よくある問題と解決方法

#### 1. Node.jsのバージョンエラー

**問題**: `Node.js version X is not supported`

**解決方法**:
```bash
# nvmを使用してNode.jsをインストール
nvm install 18.17.0
nvm use 18.17.0
```

#### 2. 依存関係のインストールエラー

**問題**: `npm install` でエラーが発生

**解決方法**:
```bash
# キャッシュをクリア
npm cache clean --force

# node_modulesを削除して再インストール
rm -rf node_modules package-lock.json
npm install
```

#### 3. ポートが既に使用されている

**問題**: `Port 3000 is already in use`

**解決方法**:
```bash
# プロセスを確認
lsof -ti:3000

# プロセスを終了
kill -9 $(lsof -ti:3000)

# または別のポートを使用
npm run dev -- -p 3001
```

#### 4. 環境変数が読み込まれない

**問題**: 環境変数が `undefined` になる

**解決方法**:
- `.env.local` ファイルが正しい場所にあるか確認
- 環境変数名が `NEXT_PUBLIC_` で始まっているか確認
- 開発サーバーを再起動

## 📚 参考資料

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)

## 🆘 サポート

セットアップで問題が発生した場合は、以下の方法でサポートを受けてください：

1. **Slack**: #janken-game チャンネル
2. **GitHub Issues**: バグ報告・機能要求
3. **メール**: dev-team@company.com

---

**最終更新**: 2024年12月