# 📁 プロジェクト管理ワークスペース

PMが効率的にプロジェクト管理を行うための構造化されたワークスペースです。

## 📋 ディレクトリ構造

```
/workspace/
├── 📁 01_docs/ # 文書・タスク・アイデア管理システム
│   ├── 📋 01_tasks/ # タスク管理（backlog/active/completed）
│   ├── 📝 02_meeting-notes/ # 議事録管理
│   ├── 💡 03_ideas/ # アイデア管理（inbox/archived）
│   ├── 📊 04_reports/ # 調査レポート・分析資料
│   └── 📄 05_working-memo/ # 作業メモ管理
├── 📁 02_apps/ # Webアプリケーション管理
│   ├── 01_app-name/ # 個別Webアプリ
│   ├── 09_shared/ # 共通リソース
│   └── app-template/ # アプリテンプレート
└── 📁 09_other/ # その他のファイル・Slack連携
```

## 🚀 使い方

### 1. タスク管理
- `01_docs/01_tasks/` でタスクを管理
- backlog → active → completed の流れで進捗管理
- `task-template.md` をコピーして新しいタスクを作成

### 2. 会議管理
- `01_docs/02_meeting-notes/` に議事録を保存
- `meeting-template.md` を使用して統一フォーマットで記録

### 3. アイデア管理
- `01_docs/03_ideas/inbox/` に新しいアイデアを保存
- 検討後は `archived/` に移動
- `idea-template.md` で構造化された記録

### 4. レポート管理
- `01_docs/04_reports/` に調査・分析資料を保存
- `report-template.md` で統一フォーマット

### 5. アプリ開発
- `02_apps/` でWebアプリケーションを管理
- `app-template/` を参考に新しいアプリを作成
- `09_shared/` で共通リソースを管理

## 📝 テンプレートファイル

各カテゴリにテンプレートファイルを用意しています：
- `task-template.md` - タスク管理用
- `meeting-template.md` - 議事録用
- `idea-template.md` - アイデア管理用
- `report-template.md` - レポート用
- `memo-template.md` - 作業メモ用

## 🔄 運用ルール

1. **定期的な整理**: 月1回、各ディレクトリの整理を行う
2. **命名規則**: ファイル名は日付-タイトル形式（例: `2024-01-15-プロジェクトキックオフ.md`）
3. **バージョン管理**: 重要な変更はGitでコミット
4. **アクセス権限**: 必要に応じてチームメンバーに適切な権限を設定

## 📞 サポート

質問や改善提案がある場合は、プロジェクトチームまでお問い合わせください。