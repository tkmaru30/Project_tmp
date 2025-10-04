class AmidakujiGame {
    constructor() {
        this.playerCount = 4;
        this.verticalLines = [];
        this.horizontalLines = [];
        this.drawnLines = new Set();
        this.winnerIndex = null;
        
        this.initializeEventListeners();
        this.generateGame();
    }
    
    initializeEventListeners() {
        document.getElementById('generateGame').addEventListener('click', () => {
            console.log('ゲーム生成ボタンがクリックされました');
            const inputValue = parseInt(document.getElementById('playerCount').value);
            
            if (isNaN(inputValue) || inputValue < 2 || inputValue > 10) {
                console.error('無効な参加人数:', inputValue);
                alert('参加人数は2〜10の間で設定してください');
                return;
            }
            
            this.playerCount = inputValue;
            console.log('参加人数:', this.playerCount);
            this.generateGame();
        });
        
        document.getElementById('clearLines').addEventListener('click', () => {
            this.clearLines();
        });
        
        document.getElementById('resetGame').addEventListener('click', () => {
            this.resetGame();
        });
        
        document.getElementById('showResult').addEventListener('click', () => {
            this.showResult();
        });
    }
    
    generateGame() {
        console.log('ゲーム生成を開始します...');
        this.clearGame();
        this.createPlayers();
        this.createAmidakuji();
        console.log('ゲーム生成が完了しました');
    }
    
    clearGame() {
        // SVGをクリア
        const svg = document.getElementById('amidakujiSvg');
        svg.innerHTML = '';
        
        // プレイヤーをクリア
        document.getElementById('playersTop').innerHTML = '';
        document.getElementById('playersBottom').innerHTML = '';
        
        // 結果をクリア
        document.getElementById('resultSection').style.display = 'none';
        
        // データをリセット
        this.verticalLines = [];
        this.horizontalLines = [];
        this.drawnLines.clear();
        this.winnerIndex = null;
    }
    
    createPlayers() {
        const playersTop = document.getElementById('playersTop');
        const playersBottom = document.getElementById('playersBottom');
        
        if (!playersTop || !playersBottom) {
            console.error('プレイヤーコンテナが見つかりません');
            return;
        }
        
        // 上部のプレイヤー（開始点）
        for (let i = 0; i < this.playerCount; i++) {
            const player = document.createElement('div');
            player.className = 'player';
            player.textContent = `プレイヤー${i + 1}`;
            player.id = `player-top-${i}`;
            playersTop.appendChild(player);
        }
        
        // 下部のプレイヤー（終了点）
        for (let i = 0; i < this.playerCount; i++) {
            const player = document.createElement('div');
            player.className = 'player';
            player.textContent = `ゴール${i + 1}`;
            player.id = `player-bottom-${i}`;
            playersBottom.appendChild(player);
        }
    }
    
    createAmidakuji() {
        const svg = document.getElementById('amidakujiSvg');
        const container = document.querySelector('.amidakuji-container');
        
        if (!svg || !container) {
            console.error('SVGまたはコンテナが見つかりません');
            return;
        }
        
        const containerWidth = container.clientWidth - 40; // パディングを考慮
        const containerHeight = container.clientHeight - 40;
        
        console.log('コンテナサイズ:', containerWidth, 'x', containerHeight);
        
        // SVGのviewBoxを設定
        svg.setAttribute('viewBox', `0 0 ${containerWidth} ${containerHeight}`);
        
        // 縦線の間隔を計算
        const lineSpacing = containerWidth / (this.playerCount + 1);
        const lineHeight = containerHeight;
        
        // 縦線を作成
        for (let i = 0; i < this.playerCount; i++) {
            const x = lineSpacing * (i + 1);
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x);
            line.setAttribute('y1', 20);
            line.setAttribute('x2', x);
            line.setAttribute('y2', lineHeight - 20);
            line.setAttribute('class', 'vertical-line');
            line.setAttribute('data-line-index', i);
            line.setAttribute('stroke', '#333');
            line.setAttribute('stroke-width', '3');
            line.setAttribute('fill', 'none');
            svg.appendChild(line);
            
            this.verticalLines.push({
                x: x,
                index: i
            });
        }
        
        // 横線の位置を計算（ランダムに配置）
        this.generateHorizontalLines(lineSpacing, lineHeight);
    }
    
    generateHorizontalLines(lineSpacing, lineHeight) {
        const svg = document.getElementById('amidakujiSvg');
        const numHorizontalLines = Math.floor(this.playerCount * 1.5); // プレイヤー数の1.5倍の横線
        
        console.log('横線を生成中...', numHorizontalLines, '本');
        
        for (let i = 0; i < numHorizontalLines; i++) {
            // ランダムな位置を選択
            const startLine = Math.floor(Math.random() * (this.playerCount - 1));
            const y = 50 + Math.random() * (lineHeight - 100);
            
            // 横線を作成
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            const x1 = this.verticalLines[startLine].x;
            const x2 = this.verticalLines[startLine + 1].x;
            
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y);
            line.setAttribute('class', 'horizontal-line');
            line.setAttribute('data-line-id', `h-${startLine}-${i}`);
            line.setAttribute('stroke', '#667eea');
            line.setAttribute('stroke-width', '4');
            line.setAttribute('fill', 'none');
            line.addEventListener('click', () => this.toggleHorizontalLine(line));
            
            svg.appendChild(line);
            
            console.log(`横線 ${i + 1}: (${x1}, ${y}) から (${x2}, ${y})`);
            
            this.horizontalLines.push({
                x1: x1,
                x2: x2,
                y: y,
                startLine: startLine,
                endLine: startLine + 1,
                element: line,
                id: `h-${startLine}-${i}`
            });
        }
        
        console.log('横線の生成が完了しました:', this.horizontalLines.length, '本');
    }
    
    toggleHorizontalLine(lineElement) {
        const lineId = lineElement.getAttribute('data-line-id');
        
        if (this.drawnLines.has(lineId)) {
            // 線を消す
            lineElement.classList.remove('drawn');
            this.drawnLines.delete(lineId);
        } else {
            // 線を引く
            lineElement.classList.add('drawn');
            this.drawnLines.add(lineId);
        }
    }
    
    clearLines() {
        this.drawnLines.clear();
        document.querySelectorAll('.horizontal-line').forEach(line => {
            line.classList.remove('drawn');
        });
    }
    
    resetGame() {
        this.generateGame();
    }
    
    showResult() {
        const results = this.calculateResults();
        this.displayResults(results);
    }
    
    calculateResults() {
        const results = [];
        
        for (let startPlayer = 0; startPlayer < this.playerCount; startPlayer++) {
            let currentPosition = startPlayer;
            
            // 横線を上から下に順番に処理
            const sortedLines = this.horizontalLines
                .filter(line => this.drawnLines.has(line.id))
                .sort((a, b) => a.y - b.y);
            
            for (const line of sortedLines) {
                // 現在の位置が横線の開始位置または終了位置にある場合
                if (currentPosition === line.startLine) {
                    currentPosition = line.endLine;
                } else if (currentPosition === line.endLine) {
                    currentPosition = line.startLine;
                }
            }
            
            results.push({
                startPlayer: startPlayer,
                endPlayer: currentPosition,
                startName: `プレイヤー${startPlayer + 1}`,
                endName: `ゴール${currentPosition + 1}`
            });
        }
        
        return results;
    }
    
    displayResults(results) {
        const resultSection = document.getElementById('resultSection');
        const resultContent = document.getElementById('resultContent');
        
        resultContent.innerHTML = '';
        
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.innerHTML = `
                <div>${result.startName}</div>
                <div>↓</div>
                <div>${result.endName}</div>
            `;
            resultContent.appendChild(resultItem);
        });
        
        resultSection.style.display = 'block';
        
        // 結果を表示する際にアニメーションを追加
        setTimeout(() => {
            resultContent.style.opacity = '0';
            resultContent.style.transform = 'translateY(20px)';
            resultContent.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                resultContent.style.opacity = '1';
                resultContent.style.transform = 'translateY(0)';
            }, 100);
        }, 50);
    }
}

// ゲームを初期化
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('あみだくじゲームを初期化しています...');
        window.amidakujiGame = new AmidakujiGame();
        console.log('あみだくじゲームの初期化が完了しました');
    } catch (error) {
        console.error('ゲーム初期化エラー:', error);
        alert('ゲームの初期化に失敗しました。ページを再読み込みしてください。');
    }
});

// ウィンドウリサイズ時の対応
window.addEventListener('resize', () => {
    // リサイズ時にゲームを再生成
    setTimeout(() => {
        if (window.amidakujiGame) {
            window.amidakujiGame.generateGame();
        }
    }, 100);
});