from flask import Flask, render_template, jsonify
from datetime import datetime
import requests
from bs4 import BeautifulSoup
import xml.etree.ElementTree as ET
from dateutil import parser as date_parser
import re

app = Flask(__name__)

# AI関連のニュースソースのRSSフィード
NEWS_SOURCES = [
    {
        'name': 'MIT Technology Review - AI',
        'url': 'https://www.technologyreview.com/feed/',
        'category': 'ai'
    },
    {
        'name': 'TechCrunch - AI',
        'url': 'https://techcrunch.com/category/artificial-intelligence/feed/',
        'category': 'ai'
    },
    {
        'name': 'AI News',
        'url': 'https://www.artificialintelligence-news.com/feed/',
        'category': 'ai'
    },
    {
        'name': 'VentureBeat - AI',
        'url': 'https://venturebeat.com/category/ai/feed/',
        'category': 'ai'
    }
]

def parse_rss_feed(url):
    """RSSフィードをパースして記事のリストを返す"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        # XMLをパース
        root = ET.fromstring(response.content)
        
        items = []
        # RSS 2.0 形式
        for item in root.findall('.//item')[:10]:
            title = item.find('title')
            link = item.find('link')
            pub_date = item.find('pubDate')
            description = item.find('description')
            
            items.append({
                'title': title.text if title is not None else 'No Title',
                'link': link.text if link is not None else '#',
                'pub_date': pub_date.text if pub_date is not None else None,
                'description': description.text if description is not None else ''
            })
        
        # Atom形式も試す
        if not items:
            for entry in root.findall('.//{http://www.w3.org/2005/Atom}entry')[:10]:
                title = entry.find('{http://www.w3.org/2005/Atom}title')
                link = entry.find('{http://www.w3.org/2005/Atom}link')
                updated = entry.find('{http://www.w3.org/2005/Atom}updated')
                summary = entry.find('{http://www.w3.org/2005/Atom}summary')
                
                items.append({
                    'title': title.text if title is not None else 'No Title',
                    'link': link.get('href') if link is not None else '#',
                    'pub_date': updated.text if updated is not None else None,
                    'description': summary.text if summary is not None else ''
                })
        
        return items
    except Exception as e:
        print(f"Error parsing feed {url}: {str(e)}")
        return []

def clean_html(text):
    """HTMLタグを除去してプレーンテキストを返す"""
    if not text:
        return ''
    soup = BeautifulSoup(text, 'html.parser')
    return soup.get_text()[:200] + '...' if soup.get_text() else ''

def parse_date(date_string):
    """日付文字列をパースしてdatetimeオブジェクトを返す"""
    if not date_string:
        return datetime.now()
    try:
        return date_parser.parse(date_string)
    except:
        return datetime.now()

def fetch_news():
    """RSSフィードから最新のAIニュースを取得"""
    all_news = []
    
    for source in NEWS_SOURCES:
        try:
            items = parse_rss_feed(source['url'])
            
            for item in items:
                pub_date = parse_date(item['pub_date'])
                
                news_item = {
                    'title': item['title'],
                    'link': item['link'],
                    'source': source['name'],
                    'published': pub_date.strftime('%Y-%m-%d %H:%M'),
                    'summary': clean_html(item['description']),
                    'timestamp': pub_date.timestamp()
                }
                all_news.append(news_item)
        except Exception as e:
            print(f"Error fetching from {source['name']}: {str(e)}")
            continue
    
    # 公開日時で新しい順にソート
    all_news.sort(key=lambda x: x['timestamp'], reverse=True)
    
    return all_news[:50]  # 最新50件を返す

@app.route('/')
def index():
    """メインページ"""
    return render_template('index.html')

@app.route('/api/news')
def get_news():
    """ニュースAPIエンドポイント"""
    try:
        news = fetch_news()
        return jsonify({
            'success': True,
            'count': len(news),
            'news': news
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
