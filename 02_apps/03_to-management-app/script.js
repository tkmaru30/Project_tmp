class ToManagementApp {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
        this.taskIdCounter = 0;
        
        this.initializeEventListeners();
        this.loadTasks();
        this.updateStats();
        this.renderTasks();
    }
    
    initializeEventListeners() {
        // タスク追加
        document.getElementById('addTask').addEventListener('click', () => {
            this.addTask();
        });
        
        // Enterキーでタスク追加
        document.getElementById('taskInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });
        
        // フィルターボタン
        document.getElementById('showAll').addEventListener('click', () => {
            this.setFilter('all');
        });
        
        document.getElementById('showPending').addEventListener('click', () => {
            this.setFilter('pending');
        });
        
        document.getElementById('showCompleted').addEventListener('click', () => {
            this.setFilter('completed');
        });
        
        // 完了済みタスクを削除
        document.getElementById('clearCompleted').addEventListener('click', () => {
            this.clearCompletedTasks();
        });
    }
    
    addTask() {
        const taskInput = document.getElementById('taskInput');
        const prioritySelect = document.getElementById('prioritySelect');
        
        const taskText = taskInput.value.trim();
        if (!taskText) {
            alert('タスクを入力してください');
            return;
        }
        
        const task = {
            id: this.taskIdCounter++,
            text: taskText,
            priority: prioritySelect.value,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        this.tasks.push(task);
        taskInput.value = '';
        
        this.saveTasks();
        this.updateStats();
        this.renderTasks();
        
        // アニメーション効果
        this.showNotification('タスクが追加されました！');
    }
    
    toggleTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.updateStats();
            this.renderTasks();
            
            const message = task.completed ? 'タスクを完了しました！' : 'タスクを未完了に戻しました';
            this.showNotification(message);
        }
    }
    
    deleteTask(taskId) {
        if (confirm('このタスクを削除しますか？')) {
            this.tasks = this.tasks.filter(t => t.id !== taskId);
            this.saveTasks();
            this.updateStats();
            this.renderTasks();
            this.showNotification('タスクを削除しました');
        }
    }
    
    setFilter(filter) {
        this.currentFilter = filter;
        
        // ボタンのアクティブ状態を更新
        document.querySelectorAll('.filter-actions button').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(`show${filter.charAt(0).toUpperCase() + filter.slice(1)}`).classList.add('active');
        
        this.renderTasks();
    }
    
    clearCompletedTasks() {
        const completedCount = this.tasks.filter(t => t.completed).length;
        if (completedCount === 0) {
            alert('完了済みのタスクがありません');
            return;
        }
        
        if (confirm(`${completedCount}個の完了済みタスクを削除しますか？`)) {
            this.tasks = this.tasks.filter(t => !t.completed);
            this.saveTasks();
            this.updateStats();
            this.renderTasks();
            this.showNotification(`${completedCount}個のタスクを削除しました`);
        }
    }
    
    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'pending':
                return this.tasks.filter(t => !t.completed);
            case 'completed':
                return this.tasks.filter(t => t.completed);
            default:
                return this.tasks;
        }
    }
    
    renderTasks() {
        const taskList = document.getElementById('taskList');
        const filteredTasks = this.getFilteredTasks();
        
        if (filteredTasks.length === 0) {
            taskList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📝</div>
                    <h3>タスクがありません</h3>
                    <p>新しいタスクを追加してください</p>
                </div>
            `;
            return;
        }
        
        taskList.innerHTML = filteredTasks.map(task => `
            <div class="task-item ${task.completed ? 'completed' : ''} priority-${task.priority}" 
                 data-task-id="${task.id}">
                <div class="task-content" onclick="toManagementApp.toggleTask(${task.id})">
                    <div class="task-checkbox">
                        <span class="checkbox-icon">${task.completed ? '✓' : ''}</span>
                    </div>
                    <div class="task-text">
                        <span class="task-title">${this.escapeHtml(task.text)}</span>
                        <span class="task-date">${this.formatDate(task.createdAt)}</span>
                    </div>
                    <div class="task-priority priority-${task.priority}">
                        ${this.getPriorityText(task.priority)}
                    </div>
                </div>
                <div class="task-actions">
                    <button class="delete-btn" onclick="toManagementApp.deleteTask(${task.id})" title="削除">
                        🗑️
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    updateStats() {
        const totalTasks = this.tasks.length;
        const pendingTasks = this.tasks.filter(t => !t.completed).length;
        const completedTasks = this.tasks.filter(t => t.completed).length;
        
        document.getElementById('totalTasks').textContent = totalTasks;
        document.getElementById('pendingTasks').textContent = pendingTasks;
        document.getElementById('completedTasks').textContent = completedTasks;
    }
    
    getPriorityText(priority) {
        switch (priority) {
            case 'high': return '高';
            case 'medium': return '中';
            case 'low': return '低';
            default: return '中';
        }
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ja-JP', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    showNotification(message) {
        // 通知要素を作成
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // スタイルを設定
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // アニメーション
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // 3秒後に削除
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    saveTasks() {
        localStorage.setItem('toManagementTasks', JSON.stringify(this.tasks));
        localStorage.setItem('toManagementTaskIdCounter', this.taskIdCounter.toString());
    }
    
    loadTasks() {
        const savedTasks = localStorage.getItem('toManagementTasks');
        const savedCounter = localStorage.getItem('toManagementTaskIdCounter');
        
        if (savedTasks) {
            this.tasks = JSON.parse(savedTasks);
        }
        
        if (savedCounter) {
            this.taskIdCounter = parseInt(savedCounter);
        }
    }
}

// アプリを初期化
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('TO管理アプリを初期化しています...');
        window.toManagementApp = new ToManagementApp();
        console.log('TO管理アプリの初期化が完了しました');
    } catch (error) {
        console.error('アプリ初期化エラー:', error);
        alert('アプリの初期化に失敗しました。ページを再読み込みしてください。');
    }
});

// ウィンドウリサイズ時の対応
window.addEventListener('resize', () => {
    // 必要に応じてレイアウトを調整
    if (window.toManagementApp) {
        window.toManagementApp.renderTasks();
    }
});