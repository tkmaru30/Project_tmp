# コントリビューションガイドライン

## 🤝 はじめに

じゃんけんゲームプロジェクトへのコントリビューションをありがとうございます！このガイドラインに従って、スムーズな開発プロセスを維持しましょう。

## 📋 コントリビューションの種類

### 🐛 バグ報告
- 既存の機能で問題が発生している場合
- 予期しない動作やエラーが発生している場合

### ✨ 機能追加
- 新しい機能の提案・実装
- 既存機能の改善・拡張

### 📚 ドキュメント
- READMEの更新
- API仕様書の作成・更新
- コメントの追加・改善

### 🧪 テスト
- テストケースの追加
- テストカバレッジの向上
- テストの最適化

## 🚀 コントリビューション手順

### 1. リポジトリのフォーク

```bash
# GitHub上でリポジトリをフォーク
# その後、ローカルにクローン
git clone https://github.com/your-username/janken-game.git
cd janken-game
```

### 2. リモートリポジトリの設定

```bash
# 上流リポジトリを追加
git remote add upstream https://github.com/original-org/janken-game.git

# リモートの確認
git remote -v
```

### 3. ブランチの作成

```bash
# 最新のmainブランチを取得
git checkout main
git pull upstream main

# 機能ブランチを作成
git checkout -b feature/your-feature-name
# または
git checkout -b fix/your-bug-fix
```

### 4. 開発・テスト

```bash
# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev

# テストを実行
npm test

# リンターを実行
npm run lint

# フォーマッターを実行
npm run format
```

### 5. コミット

```bash
# 変更をステージング
git add .

# コミットメッセージを記述
git commit -m "feat: add rock-paper-scissors game logic"
```

### 6. プッシュ・プルリクエスト

```bash
# ブランチをプッシュ
git push origin feature/your-feature-name

# GitHub上でプルリクエストを作成
```

## 📝 コーディング規約

### 命名規約

#### 変数・関数
```typescript
// ✅ Good
const gameResult = calculateWinner(playerChoice, computerChoice);
const isGameOver = false;

// ❌ Bad
const gameresult = calculatewinner(playerchoice, computerchoice);
const is_game_over = false;
```

#### コンポーネント
```typescript
// ✅ Good
const GameBoard = () => { ... };
const PlayerChoice = () => { ... };

// ❌ Bad
const gameboard = () => { ... };
const player_choice = () => { ... };
```

#### ファイル名
```
// ✅ Good
GameBoard.tsx
PlayerChoice.tsx
gameUtils.ts

// ❌ Bad
gameboard.tsx
player_choice.tsx
game-utils.ts
```

### TypeScript規約

#### 型定義
```typescript
// ✅ Good
interface GameState {
  playerChoice: Choice | null;
  computerChoice: Choice | null;
  result: GameResult | null;
}

type Choice = 'rock' | 'paper' | 'scissors';
type GameResult = 'win' | 'lose' | 'draw';

// ❌ Bad
interface gamestate {
  playerchoice: any;
  computerchoice: any;
  result: any;
}
```

#### 関数定義
```typescript
// ✅ Good
const calculateWinner = (player: Choice, computer: Choice): GameResult => {
  // implementation
};

// ❌ Bad
function calculatewinner(player, computer) {
  // implementation
}
```

### React規約

#### コンポーネント定義
```typescript
// ✅ Good
interface GameBoardProps {
  onChoiceSelect: (choice: Choice) => void;
  gameState: GameState;
}

const GameBoard: React.FC<GameBoardProps> = ({ onChoiceSelect, gameState }) => {
  return (
    <div className="game-board">
      {/* JSX */}
    </div>
  );
};

// ❌ Bad
const GameBoard = (props) => {
  return <div>{/* JSX */}</div>;
};
```

#### フック使用
```typescript
// ✅ Good
const [gameState, setGameState] = useState<GameState>(initialState);

useEffect(() => {
  // side effects
}, [dependency]);

// ❌ Bad
const [gamestate, setgamestate] = useState(initialState);

useEffect(() => {
  // side effects
}, []); // missing dependencies
```

## 🧪 テスト規約

### 単体テスト

```typescript
// ✅ Good
describe('calculateWinner', () => {
  it('should return win when player chooses rock and computer chooses scissors', () => {
    const result = calculateWinner('rock', 'scissors');
    expect(result).toBe('win');
  });

  it('should return draw when both players choose the same option', () => {
    const result = calculateWinner('rock', 'rock');
    expect(result).toBe('draw');
  });
});
```

### コンポーネントテスト

```typescript
// ✅ Good
import { render, screen, fireEvent } from '@testing-library/react';
import { GameBoard } from './GameBoard';

describe('GameBoard', () => {
  it('should call onChoiceSelect when rock button is clicked', () => {
    const mockOnChoiceSelect = jest.fn();
    render(<GameBoard onChoiceSelect={mockOnChoiceSelect} gameState={initialState} />);
    
    fireEvent.click(screen.getByText('Rock'));
    expect(mockOnChoiceSelect).toHaveBeenCalledWith('rock');
  });
});
```

## 📋 コミットメッセージ規約

### フォーマット
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Type一覧

| Type | 説明 | 例 |
|------|------|-----|
| `feat` | 新機能 | `feat: add computer AI logic` |
| `fix` | バグ修正 | `fix: resolve game state reset issue` |
| `docs` | ドキュメント | `docs: update API documentation` |
| `style` | コードフォーマット | `style: format code with prettier` |
| `refactor` | リファクタリング | `refactor: extract game logic to utils` |
| `test` | テスト | `test: add unit tests for game logic` |
| `chore` | その他 | `chore: update dependencies` |

### 例

```bash
# ✅ Good
feat(game): add score tracking functionality
fix(ui): resolve button alignment issue
docs(api): update game state interface
test(utils): add tests for calculateWinner function

# ❌ Bad
add score tracking
fix bug
update docs
add tests
```

## 🔍 プルリクエスト規約

### プルリクエストテンプレート

```markdown
## 概要
このPRの概要を簡潔に説明してください。

## 変更内容
- 変更点1
- 変更点2
- 変更点3

## テスト
- [ ] 単体テストを追加/更新
- [ ] 統合テストを実行
- [ ] E2Eテストを実行
- [ ] 手動テストを実行

## チェックリスト
- [ ] コードレビューを依頼
- [ ] ドキュメントを更新
- [ ] 破壊的変更がないことを確認
- [ ] パフォーマンスに影響がないことを確認
```

### レビュー基準

#### 必須チェック項目
- [ ] コードがプロジェクトの規約に従っている
- [ ] 適切なテストが含まれている
- [ ] ドキュメントが更新されている
- [ ] パフォーマンスに問題がない
- [ ] セキュリティに問題がない

#### 推奨チェック項目
- [ ] コードが読みやすい
- [ ] 適切なコメントが含まれている
- [ ] エラーハンドリングが適切
- [ ] アクセシビリティを考慮している

## 🚫 避けるべきこと

### コード
- ハードコーディングされた値
- マジックナンバー
- 深いネスト
- 長すぎる関数
- 不適切な型定義

### コミット
- 複数の機能を1つのコミットに含める
- 意味のないコミットメッセージ
- 大きなファイルの追加
- 機密情報のコミット

### プルリクエスト
- 未完成のコードの提出
- テストなしの機能追加
- ドキュメント未更新
- レビューコメントへの対応なし

## 🆘 サポート

### 質問・相談
- **Slack**: #janken-game チャンネル
- **GitHub Discussions**: 一般的な質問
- **GitHub Issues**: バグ報告・機能要求

### 緊急時
- **メール**: dev-team@company.com
- **電話**: 緊急連絡先

## 📚 参考資料

- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [React Best Practices](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**最終更新**: 2024年12月