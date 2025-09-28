# プロジェクト構成概要

このワークスペースのフォルダ構成の概要説明です。

## 📁 ディレクトリ構成

```
workspace/
├── 01_docs/                    # ドキュメント管理
│   ├── 01_tasks/              # タスク管理
│   │   └── task-template.md
│   ├── 02_meeting-notes/      # 会議ノート
│   │   └── meeting-template.md
│   ├── 03_ideas/              # アイデア管理
│   │   └── idea-template.md
│   ├── 04_reports/            # レポート
│   │   └── report-template.md
│   ├── 05_working-memo/       # 作業メモ
│   │   └── memo-template.md
│   └── README.md
├── 02_apps/                    # アプリケーション開発
│   ├── 09_shared/             # 共有コンポーネント
│   │   └── README.md
│   ├── app-template/          # アプリテンプレート
│   │   └── README.md
│   └── README.md
├── 09_other/                   # その他のファイル
│   └── README.md
├── janken-game/               # じゃんけんゲームプロジェクト
│   ├── CONTRIBUTING.md        # コントリビューションガイド
│   ├── docs/                  # プロジェクトドキュメント
│   │   └── SETUP.md
│   ├── pmo/                   # プロジェクト管理オフィス
│   │   ├── 01_integration-management/    # 統合管理
│   │   │   ├── project-charter/
│   │   │   │   └── project-charter.md
│   │   │   └── project-management-plan/
│   │   │       └── project-management-plan.md
│   │   ├── 02_scope-management/          # スコープ管理
│   │   │   ├── requirements/
│   │   │   │   └── requirements.md
│   │   │   └── work-breakdown-structure/
│   │   │       └── wbs.md
│   │   ├── 05_quality-management/        # 品質管理
│   │   │   └── quality-plan/
│   │   │       └── quality-plan.md
│   │   ├── 08_risk-management/           # リスク管理
│   │   │   └── risk-register/
│   │   │       └── risk-register.md
│   │   ├── 10_stakeholder-management/    # ステークホルダー管理
│   │   │   └── stakeholder-register/
│   │   │       └── stakeholder-register.md
│   │   ├── project-dashboard/            # プロジェクトダッシュボード
│   │   │   └── dashboard.md
│   │   └── README.md
│   ├── package.json
│   └── README.md
├── project_tmp/               # 一時的なプロジェクトファイル
│   └── README.md              # このファイル
├── index.html                 # メインHTMLファイル
├── readme.md                  # プロジェクト概要
├── README.md                  # メインREADME
└── PROJECT_MANAGEMENT_README.md  # プロジェクト管理概要
```

## 📋 各ディレクトリの説明

### 01_docs/
プロジェクト関連のドキュメントを管理するディレクトリです。
- **01_tasks/**: タスク管理用のテンプレートとファイル
- **02_meeting-notes/**: 会議ノートのテンプレート
- **03_ideas/**: アイデア管理用のテンプレート
- **04_reports/**: レポート作成用のテンプレート
- **05_working-memo/**: 作業メモ用のテンプレート

### 02_apps/
アプリケーション開発用のディレクトリです。
- **09_shared/**: 複数のアプリで共有するコンポーネント
- **app-template/**: 新しいアプリケーションのテンプレート

### 09_other/
その他のファイルやドキュメントを格納するディレクトリです。

### janken-game/
じゃんけんゲームプロジェクトのメインディレクトリです。
- **docs/**: プロジェクト固有のドキュメント
- **pmo/**: プロジェクト管理オフィス（PMO）関連ファイル
  - 統合管理、スコープ管理、品質管理、リスク管理、ステークホルダー管理
  - プロジェクトダッシュボード

### project_tmp/
一時的なプロジェクトファイルや作業用ファイルを格納するディレクトリです。

## 🎯 プロジェクト管理の特徴

このワークスペースは、以下の特徴を持つプロジェクト管理構造になっています：

1. **体系的なドキュメント管理**: 01_docs/で各種ドキュメントを分類管理
2. **アプリケーション開発支援**: 02_apps/で開発環境を整備
3. **PMO機能**: janken-game/pmo/で本格的なプロジェクト管理を実践
4. **テンプレート化**: 各ディレクトリにテンプレートファイルを配置

## 📝 使用方法

1. 新しいプロジェクトを開始する際は、適切なディレクトリにファイルを配置
2. ドキュメントは01_docs/の各サブディレクトリに分類して保存
3. アプリケーション開発は02_apps/を活用
4. プロジェクト管理が必要な場合は、janken-game/pmo/の構造を参考にする

---

*このREADMEは、ワークスペースの全体構成を理解するための概要説明です。*