# 間取り3D変換アプリ

間取り図の画像をアップロードして、リアルタイムで3D空間を体験できるWebアプリケーションです。

## ✨ 機能

- 📷 **画像アップロード**: ドラッグ＆ドロップまたはクリックで間取り図をアップロード
- 🤖 **AI解析**: アップロードされた間取り図を自動解析
- 🏠 **3D可視化**: Three.jsを使用したリアルタイム3D表示
- 🎛️ **カスタマイズ**: 壁の高さ、厚さ、スケールなどの調整機能
- 📱 **レスポンシブ**: モバイルデバイス対応

## 🚀 技術スタック

- **Frontend**: React 18 + TypeScript
- **3D Graphics**: Three.js + React Three Fiber
- **Build Tool**: Vite
- **Styling**: CSS3 with modern features
- **Icons**: Lucide React

## 📦 インストール

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# プロダクションビルド
npm run build
```

## 🎯 使い方

1. **画像の準備**: 間取り図のPNG、JPG、またはJPEGファイルを準備
2. **アップロード**: アップロード領域にドラッグ＆ドロップまたはクリックして選択
3. **3D表示**: 自動的に3Dモデルが生成され、マウスで操作可能
4. **カスタマイズ**: 設定パネルで壁の高さや厚さを調整
5. **探索**: マウスで回転・ズームして空間を自由に探索

## 🔧 開発

### プロジェクト構造

```
src/
├── components/          # Reactコンポーネント
│   ├── ImageUpload.tsx  # 画像アップロード
│   ├── FloorPlan3D.tsx  # 3D表示
│   └── Controls.tsx     # 設定パネル
├── utils/               # ユーティリティ
│   └── floorPlanProcessor.ts  # 画像処理
├── types/               # TypeScript型定義
│   └── index.ts
├── App.tsx              # メインアプリ
├── main.tsx            # エントリーポイント
└── index.css           # グローバルスタイル
```

### カスタマイズ

- **画像処理アルゴリズム**: `src/utils/floorPlanProcessor.ts`で処理ロジックを変更
- **3Dレンダリング**: `src/components/FloorPlan3D.tsx`で3D表示をカスタマイズ
- **スタイリング**: `src/index.css`でデザインを調整

## 🤝 貢献

プルリクエストやイシューの報告を歓迎します！

## 📄 ライセンス

MIT License

## 🌟 今後の機能

- [ ] より高度な画像処理アルゴリズム
- [ ] 家具配置機能
- [ ] VR/AR対応
- [ ] 複数階対応
- [ ] エクスポート機能（OBJ、GLTFなど）