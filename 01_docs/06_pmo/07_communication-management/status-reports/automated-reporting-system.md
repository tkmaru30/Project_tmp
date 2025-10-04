# 自動進捗レポート生成システム

## 🎯 システム概要

### 目的
- 手動レポート作成作業の削減
- 一貫性のあるレポート品質の確保
- リアルタイムでの進捗情報提供
- ステークホルダーへの効果的なコミュニケーション

### 主要機能
1. **自動データ収集**: 各種ツールからの自動データ取得
2. **テンプレートベース生成**: 標準化されたレポート形式
3. **多様な出力形式**: PDF、HTML、PowerPoint、Excel対応
4. **スケジュール配信**: 定期自動配信機能

## 📊 レポート種類と頻度

### 1. 日次レポート
```yaml
# daily-report-config.yml
daily_report:
  frequency: "毎日 18:00"
  recipients:
    - project_team@company.com
    - pm@company.com
  
  sections:
    - summary:
        title: "本日の進捗サマリー"
        data_sources: ["github", "slack", "time_tracking"]
    
    - completed_tasks:
        title: "完了タスク"
        data_sources: ["github_issues", "jira"]
    
    - blockers:
        title: "ブロッカー・課題"
        data_sources: ["slack", "github_issues"]
    
    - tomorrow_plan:
        title: "明日の予定"
        data_sources: ["calendar", "project_plan"]
```

### 2. 週次レポート
```yaml
# weekly-report-config.yml
weekly_report:
  frequency: "毎週金曜日 17:00"
  recipients:
    - stakeholders@company.com
    - management@company.com
    - project_team@company.com
  
  sections:
    - executive_summary:
        title: "エグゼクティブサマリー"
        include_charts: true
    
    - progress_overview:
        title: "進捗概要"
        data_sources: ["progress_tracking", "milestones"]
    
    - resource_utilization:
        title: "リソース稼働状況"
        data_sources: ["time_tracking", "resource_management"]
    
    - risk_status:
        title: "リスク・課題状況"
        data_sources: ["risk_register", "issue_tracking"]
    
    - next_week_plan:
        title: "来週の計画"
        data_sources: ["project_plan", "resource_planning"]
```

### 3. 月次レポート
```yaml
# monthly-report-config.yml
monthly_report:
  frequency: "毎月最終営業日 16:00"
  recipients:
    - executives@company.com
    - steering_committee@company.com
    - stakeholders@company.com
  
  sections:
    - project_health:
        title: "プロジェクト健康度"
        include_dashboard: true
    
    - milestone_achievements:
        title: "マイルストーン達成状況"
        data_sources: ["milestones", "progress_tracking"]
    
    - budget_status:
        title: "予算・コスト状況"
        data_sources: ["cost_tracking", "budget_management"]
    
    - quality_metrics:
        title: "品質メトリクス"
        data_sources: ["quality_management", "testing"]
    
    - lessons_learned:
        title: "教訓・改善点"
        data_sources: ["retrospectives", "feedback"]
```

## 🔄 自動レポート生成エンジン

### データ収集モジュール
```python
# data_collector.py
import asyncio
from datetime import datetime, timedelta
from typing import Dict, List, Any
import aiohttp
import pandas as pd

class DataCollector:
    def __init__(self):
        self.sources = {
            'github': GitHubCollector(),
            'slack': SlackCollector(),
            'jira': JiraCollector(),
            'time_tracking': TimeTrackingCollector(),
            'calendar': CalendarCollector()
        }
    
    async def collect_data(self, report_type: str, date_range: tuple) -> Dict[str, Any]:
        """指定された期間のデータを収集"""
        start_date, end_date = date_range
        
        tasks = []
        for source_name, collector in self.sources.items():
            task = collector.collect_data(start_date, end_date, report_type)
            tasks.append(task)
        
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        # データの統合
        integrated_data = self.integrate_data(results)
        return integrated_data
    
    def integrate_data(self, raw_data: List[Dict]) -> Dict[str, Any]:
        """複数ソースのデータを統合"""
        integrated = {
            'timestamp': datetime.now(),
            'progress_data': {},
            'task_data': {},
            'resource_data': {},
            'risk_data': {},
            'quality_data': {}
        }
        
        for data in raw_data:
            if isinstance(data, dict):
                integrated['progress_data'].update(data.get('progress', {}))
                integrated['task_data'].update(data.get('tasks', {}))
                integrated['resource_data'].update(data.get('resources', {}))
                integrated['risk_data'].update(data.get('risks', {}))
                integrated['quality_data'].update(data.get('quality', {}))
        
        return integrated

class GitHubCollector:
    async def collect_data(self, start_date: datetime, end_date: datetime, report_type: str) -> Dict:
        """GitHubからのデータ収集"""
        async with aiohttp.ClientSession() as session:
            # コミットデータ
            commits = await self.get_commits(session, start_date, end_date)
            
            # Issue/PRデータ
            issues = await self.get_issues(session, start_date, end_date)
            pull_requests = await self.get_pull_requests(session, start_date, end_date)
            
            return {
                'progress': {
                    'commits_count': len(commits),
                    'lines_added': sum(c['additions'] for c in commits),
                    'lines_deleted': sum(c['deletions'] for c in commits)
                },
                'tasks': {
                    'issues_closed': len([i for i in issues if i['state'] == 'closed']),
                    'prs_merged': len([pr for pr in pull_requests if pr['merged']])
                }
            }
    
    async def get_commits(self, session: aiohttp.ClientSession, start_date: datetime, end_date: datetime) -> List[Dict]:
        """コミットデータの取得"""
        url = f"https://api.github.com/repos/{self.repo}/commits"
        params = {
            'since': start_date.isoformat(),
            'until': end_date.isoformat()
        }
        
        async with session.get(url, params=params) as response:
            commits = await response.json()
            return commits
```

### レポート生成エンジン
```python
# report_generator.py
from jinja2 import Template
import matplotlib.pyplot as plt
import seaborn as sns
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image
from reportlab.lib.styles import getSampleStyleSheet
import io

class ReportGenerator:
    def __init__(self, template_dir: str):
        self.template_dir = template_dir
        self.setup_plotting()
    
    def setup_plotting(self):
        """プロット設定"""
        plt.style.use('seaborn-v0_8')
        sns.set_palette("husl")
    
    def generate_report(self, report_type: str, data: Dict[str, Any], output_format: str = 'pdf') -> bytes:
        """レポートの生成"""
        if report_type == 'daily':
            return self.generate_daily_report(data, output_format)
        elif report_type == 'weekly':
            return self.generate_weekly_report(data, output_format)
        elif report_type == 'monthly':
            return self.generate_monthly_report(data, output_format)
        else:
            raise ValueError(f"Unknown report type: {report_type}")
    
    def generate_weekly_report(self, data: Dict[str, Any], output_format: str) -> bytes:
        """週次レポートの生成"""
        if output_format == 'pdf':
            return self.generate_pdf_report(data, 'weekly')
        elif output_format == 'html':
            return self.generate_html_report(data, 'weekly')
        elif output_format == 'powerpoint':
            return self.generate_powerpoint_report(data, 'weekly')
        else:
            raise ValueError(f"Unsupported output format: {output_format}")
    
    def generate_pdf_report(self, data: Dict[str, Any], report_type: str) -> bytes:
        """PDFレポートの生成"""
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=letter)
        styles = getSampleStyleSheet()
        story = []
        
        # タイトル
        title = Paragraph(f"{report_type.title()} Progress Report", styles['Title'])
        story.append(title)
        story.append(Spacer(1, 12))
        
        # エグゼクティブサマリー
        summary = self.create_executive_summary(data)
        story.append(Paragraph("Executive Summary", styles['Heading1']))
        story.append(Paragraph(summary, styles['Normal']))
        story.append(Spacer(1, 12))
        
        # 進捗チャート
        progress_chart = self.create_progress_chart(data)
        story.append(Paragraph("Progress Overview", styles['Heading1']))
        story.append(Image(progress_chart, width=400, height=300))
        story.append(Spacer(1, 12))
        
        # リスク・課題
        risks = self.create_risk_section(data)
        story.append(Paragraph("Risks and Issues", styles['Heading1']))
        story.append(Paragraph(risks, styles['Normal']))
        
        doc.build(story)
        buffer.seek(0)
        return buffer.getvalue()
    
    def create_progress_chart(self, data: Dict[str, Any]) -> io.BytesIO:
        """進捗チャートの作成"""
        fig, axes = plt.subplots(2, 2, figsize=(12, 8))
        
        # 全体進捗
        self.plot_overall_progress(axes[0, 0], data)
        
        # マイルストーン進捗
        self.plot_milestone_progress(axes[0, 1], data)
        
        # リソース稼働率
        self.plot_resource_utilization(axes[1, 0], data)
        
        # コスト進捗
        self.plot_cost_progress(axes[1, 1], data)
        
        plt.tight_layout()
        
        # 画像として保存
        buffer = io.BytesIO()
        plt.savefig(buffer, format='png', dpi=300, bbox_inches='tight')
        buffer.seek(0)
        plt.close()
        
        return buffer
    
    def generate_html_report(self, data: Dict[str, Any], report_type: str) -> bytes:
        """HTMLレポートの生成"""
        template_path = f"{self.template_dir}/{report_type}_template.html"
        
        with open(template_path, 'r', encoding='utf-8') as f:
            template_content = f.read()
        
        template = Template(template_content)
        
        # データの準備
        report_data = {
            'title': f"{report_type.title()} Progress Report",
            'date': datetime.now().strftime('%Y年%m月%d日'),
            'executive_summary': self.create_executive_summary(data),
            'progress_data': data.get('progress_data', {}),
            'task_data': data.get('task_data', {}),
            'risk_data': data.get('risk_data', {}),
            'charts': self.create_chart_data(data)
        }
        
        html_content = template.render(**report_data)
        return html_content.encode('utf-8')
```

### テンプレートシステム
```html
<!-- weekly_template.html -->
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title }}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        
        .header {
            text-align: center;
            border-bottom: 3px solid #2196F3;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        
        .header h1 {
            color: #2196F3;
            margin: 0;
            font-size: 2.5em;
        }
        
        .header .date {
            color: #666;
            font-size: 1.2em;
            margin-top: 10px;
        }
        
        .section {
            margin-bottom: 40px;
        }
        
        .section h2 {
            color: #333;
            border-left: 4px solid #2196F3;
            padding-left: 15px;
            margin-bottom: 20px;
        }
        
        .kpi-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .kpi-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }
        
        .kpi-card h3 {
            margin: 0 0 10px 0;
            font-size: 1.1em;
        }
        
        .kpi-card .value {
            font-size: 2em;
            font-weight: bold;
            margin: 10px 0;
        }
        
        .chart-container {
            margin: 20px 0;
            text-align: center;
        }
        
        .chart-container img {
            max-width: 100%;
            height: auto;
            border-radius: 5px;
        }
        
        .risk-item {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 5px;
            padding: 15px;
            margin-bottom: 15px;
        }
        
        .risk-item.high {
            background-color: #f8d7da;
            border-color: #f5c6cb;
        }
        
        .risk-item.medium {
            background-color: #fff3cd;
            border-color: #ffeaa7;
        }
        
        .risk-item.low {
            background-color: #d1ecf1;
            border-color: #bee5eb;
        }
        
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            text-align: center;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>{{ title }}</h1>
            <div class="date">{{ date }}</div>
        </div>
        
        <!-- エグゼクティブサマリー -->
        <div class="section">
            <h2>📊 エグゼクティブサマリー</h2>
            <div class="kpi-grid">
                <div class="kpi-card">
                    <h3>全体進捗</h3>
                    <div class="value">{{ progress_data.overall_progress }}%</div>
                </div>
                <div class="kpi-card">
                    <h3>完了タスク</h3>
                    <div class="value">{{ task_data.completed_count }}</div>
                </div>
                <div class="kpi-card">
                    <h3>アクティブリスク</h3>
                    <div class="value">{{ risk_data.active_count }}</div>
                </div>
                <div class="kpi-card">
                    <h3>予算消化率</h3>
                    <div class="value">{{ progress_data.budget_consumption }}%</div>
                </div>
            </div>
            <p>{{ executive_summary }}</p>
        </div>
        
        <!-- 進捗概要 -->
        <div class="section">
            <h2>📈 進捗概要</h2>
            <div class="chart-container">
                <img src="data:image/png;base64,{{ charts.progress_overview }}" alt="進捗概要チャート">
            </div>
        </div>
        
        <!-- マイルストーン進捗 -->
        <div class="section">
            <h2>🎯 マイルストーン進捗</h2>
            <div class="chart-container">
                <img src="data:image/png;base64,{{ charts.milestone_progress }}" alt="マイルストーン進捗チャート">
            </div>
        </div>
        
        <!-- リスク・課題 -->
        <div class="section">
            <h2>⚠️ リスク・課題状況</h2>
            {% for risk in risk_data.items %}
            <div class="risk-item {{ risk.severity }}">
                <h4>{{ risk.title }}</h4>
                <p><strong>説明:</strong> {{ risk.description }}</p>
                <p><strong>対応策:</strong> {{ risk.mitigation }}</p>
                <p><strong>責任者:</strong> {{ risk.owner }}</p>
            </div>
            {% endfor %}
        </div>
        
        <!-- 来週の計画 -->
        <div class="section">
            <h2>📅 来週の計画</h2>
            <ul>
                {% for plan in task_data.next_week_plans %}
                <li>{{ plan }}</li>
                {% endfor %}
            </ul>
        </div>
        
        <div class="footer">
            <p>このレポートは自動生成されました。質問やご不明な点がございましたら、プロジェクトマネージャーまでお問い合わせください。</p>
        </div>
    </div>
</body>
</html>
```

## 📧 自動配信システム

### メール配信機能
```python
# email_sender.py
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from typing import List, Dict
import os

class EmailSender:
    def __init__(self, smtp_server: str, smtp_port: int, username: str, password: str):
        self.smtp_server = smtp_server
        self.smtp_port = smtp_port
        self.username = username
        self.password = password
    
    def send_report(self, recipients: List[str], report_data: bytes, report_type: str, format: str = 'pdf'):
        """レポートの送信"""
        msg = MIMEMultipart()
        
        # メールヘッダー
        msg['From'] = self.username
        msg['To'] = ', '.join(recipients)
        msg['Subject'] = f"{report_type.title()} Progress Report - {datetime.now().strftime('%Y年%m月%d日')}"
        
        # メール本文
        body = self.create_email_body(report_type)
        msg.attach(MIMEText(body, 'html', 'utf-8'))
        
        # レポート添付
        filename = f"{report_type}_report_{datetime.now().strftime('%Y%m%d')}.{format}"
        attachment = MIMEBase('application', 'octet-stream')
        attachment.set_payload(report_data)
        encoders.encode_base64(attachment)
        attachment.add_header('Content-Disposition', f'attachment; filename= {filename}')
        msg.attach(attachment)
        
        # メール送信
        with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
            server.starttls()
            server.login(self.username, self.password)
            server.send_message(msg)
    
    def create_email_body(self, report_type: str) -> str:
        """メール本文の作成"""
        return f"""
        <html>
        <body>
            <h2>{report_type.title()} Progress Report</h2>
            <p>プロジェクトの進捗レポートをお送りいたします。</p>
            <p>詳細は添付ファイルをご確認ください。</p>
            <br>
            <p>ご質問やご不明な点がございましたら、お気軽にお問い合わせください。</p>
            <br>
            <p>プロジェクトマネージャー</p>
        </body>
        </html>
        """
```

### Slack配信機能
```python
# slack_sender.py
import requests
import json
from typing import Dict, List

class SlackSender:
    def __init__(self, webhook_url: str, bot_token: str):
        self.webhook_url = webhook_url
        self.bot_token = bot_token
    
    def send_report_summary(self, report_data: Dict[str, Any], report_type: str):
        """Slackへのレポートサマリー送信"""
        blocks = self.create_slack_blocks(report_data, report_type)
        
        payload = {
            "text": f"{report_type.title()} Progress Report",
            "blocks": blocks
        }
        
        response = requests.post(self.webhook_url, json=payload)
        return response.status_code == 200
    
    def create_slack_blocks(self, data: Dict[str, Any], report_type: str) -> List[Dict]:
        """Slackブロックの作成"""
        blocks = [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": f"{report_type.title()} Progress Report"
                }
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": f"*全体進捗:*\n{data['progress_data']['overall_progress']}%"
                    },
                    {
                        "type": "mrkdwn",
                        "text": f"*完了タスク:*\n{data['task_data']['completed_count']}"
                    },
                    {
                        "type": "mrkdwn",
                        "text": f"*アクティブリスク:*\n{data['risk_data']['active_count']}"
                    },
                    {
                        "type": "mrkdwn",
                        "text": f"*予算消化率:*\n{data['progress_data']['budget_consumption']}%"
                    }
                ]
            }
        ]
        
        # リスク情報の追加
        if data['risk_data']['items']:
            risk_text = "\n".join([
                f"• {risk['title']} ({risk['severity']})"
                for risk in data['risk_data']['items'][:3]  # 上位3件のみ
            ])
            
            blocks.append({
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f"*主要リスク:*\n{risk_text}"
                }
            })
        
        return blocks
```

## ⏰ スケジュール管理

### タスクスケジューラー
```python
# scheduler.py
import schedule
import time
from datetime import datetime, timedelta
import asyncio

class ReportScheduler:
    def __init__(self):
        self.generator = ReportGenerator()
        self.email_sender = EmailSender()
        self.slack_sender = SlackSender()
        self.setup_schedules()
    
    def setup_schedules(self):
        """スケジュールの設定"""
        # 日次レポート（毎日18:00）
        schedule.every().day.at("18:00").do(self.send_daily_report)
        
        # 週次レポート（毎週金曜日17:00）
        schedule.every().friday.at("17:00").do(self.send_weekly_report)
        
        # 月次レポート（毎月最終営業日16:00）
        schedule.every().month.do(self.send_monthly_report)
    
    def send_daily_report(self):
        """日次レポートの送信"""
        yesterday = datetime.now() - timedelta(days=1)
        today = datetime.now()
        
        data = asyncio.run(self.collect_daily_data(yesterday, today))
        report = self.generator.generate_report('daily', data, 'html')
        
        # メール送信
        recipients = ['project_team@company.com', 'pm@company.com']
        self.email_sender.send_report(recipients, report, 'daily', 'html')
        
        # Slack送信
        self.slack_sender.send_report_summary(data, 'daily')
    
    def send_weekly_report(self):
        """週次レポートの送信"""
        week_ago = datetime.now() - timedelta(weeks=1)
        today = datetime.now()
        
        data = asyncio.run(self.collect_weekly_data(week_ago, today))
        report = self.generator.generate_report('weekly', data, 'pdf')
        
        # メール送信
        recipients = ['stakeholders@company.com', 'management@company.com']
        self.email_sender.send_report(recipients, report, 'weekly', 'pdf')
        
        # Slack送信
        self.slack_sender.send_report_summary(data, 'weekly')
    
    def run_scheduler(self):
        """スケジューラーの実行"""
        while True:
            schedule.run_pending()
            time.sleep(60)  # 1分ごとにチェック
```

## 🔧 実装手順

### Phase 1: 基本レポート生成（1週間）
1. **データ収集モジュールの構築**
2. **基本レポートテンプレートの作成**
3. **PDF/HTML出力機能の実装**

### Phase 2: 自動化機能（1週間）
1. **スケジューラー機能の実装**
2. **メール配信機能の実装**
3. **Slack連携機能の実装**

### Phase 3: 高度機能（2週間）
1. **PowerPoint/Excel出力機能**
2. **カスタマイズ機能**
3. **レポート品質向上**

## 📋 運用ガイドライン

### データ品質管理
- **データ検証**: 収集データの妥当性チェック
- **エラーハンドリング**: データ取得失敗時の対応
- **フォールバック**: 手動データ入力の仕組み

### セキュリティ
- **アクセス制御**: レポート配信先の管理
- **データ暗号化**: 機密データの保護
- **監査ログ**: レポート配信履歴の記録

### メンテナンス
- **テンプレート更新**: 定期的なテンプレート見直し
- **配信先管理**: ステークホルダー変更への対応
- **パフォーマンス監視**: レポート生成時間の監視

---

**自動進捗レポート生成システム**
- 作成者：PMO
- 承認者：PMO Director
- 承認日：2024年12月1日
- 次回更新：2024年12月15日
- 保管期間：プロジェクト完了後3年間