import React, { useState, useCallback, useEffect } from 'react';
import { ImageUpload } from './components/ImageUpload';
import { FloorPlan3D } from './components/FloorPlan3D';
import { Controls } from './components/Controls';
import { floorPlanProcessor } from './utils/floorPlanProcessor';
import { UploadState, ProcessingOptions } from './types';
import { Home, Zap, Eye } from 'lucide-react';

const App: React.FC = () => {
  const [uploadState, setUploadState] = useState<UploadState>({
    file: null,
    imageUrl: null,
    isProcessing: false,
    error: null,
    floorPlanData: null,
  });

  const [options, setOptions] = useState<ProcessingOptions>({
    wallHeight: 250,
    wallThickness: 15,
    roomHeight: 250,
    scale: 1.0,
  });

  const processImage = useCallback(async (file: File) => {
    setUploadState(prev => ({
      ...prev,
      isProcessing: true,
      error: null,
    }));

    try {
      const floorPlanData = await floorPlanProcessor.processImage(file, options);
      
      setUploadState(prev => ({
        ...prev,
        floorPlanData,
        isProcessing: false,
      }));
    } catch (error) {
      setUploadState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : '処理中にエラーが発生しました',
        isProcessing: false,
      }));
    }
  }, [options]);

  const handleImageUpload = useCallback((file: File) => {
    const imageUrl = URL.createObjectURL(file);
    
    setUploadState(prev => ({
      ...prev,
      file,
      imageUrl,
      floorPlanData: null,
    }));

    processImage(file);
  }, [processImage]);

  const handleReprocess = useCallback(() => {
    if (uploadState.file) {
      processImage(uploadState.file);
    }
  }, [uploadState.file, processImage]);

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (uploadState.imageUrl) {
        URL.revokeObjectURL(uploadState.imageUrl);
      }
    };
  }, [uploadState.imageUrl]);

  return (
    <div className="container">
      {/* ヘッダー */}
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <Home size={48} color="white" />
          <h1 style={{ 
            fontSize: '2.5rem', 
            color: 'white', 
            margin: 0,
            background: 'linear-gradient(45deg, #fff, #e0e0e0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
          }}>
            間取り3D変換アプリ
          </h1>
        </div>
        <p style={{ 
          fontSize: '1.2rem', 
          color: 'rgba(255, 255, 255, 0.8)', 
          margin: 0,
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          間取り図をアップロードして、リアルタイムで3D空間を体験しよう
        </p>
      </header>

      {/* 機能紹介 */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1.5rem', 
        marginBottom: '3rem' 
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '1.5rem',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}>
          <Zap size={32} color="#4a90e2" style={{ marginBottom: '1rem' }} />
          <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>高速処理</h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
            AIが間取り図を瞬時に解析し、3Dモデルを生成
          </p>
        </div>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '1.5rem',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}>
          <Eye size={32} color="#4a90e2" style={{ marginBottom: '1rem' }} />
          <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>リアルタイム3D</h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
            マウスで自由に視点を変更し、空間を体験
          </p>
        </div>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '1.5rem',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}>
          <Home size={32} color="#4a90e2" style={{ marginBottom: '1rem' }} />
          <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>カスタマイズ</h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
            壁の高さや厚さなど、詳細設定が可能
          </p>
        </div>
      </div>

      {/* アップロード領域 */}
      <ImageUpload 
        onImageUpload={handleImageUpload}
        isProcessing={uploadState.isProcessing}
      />

      {/* エラー表示 */}
      {uploadState.error && (
        <div className="error-message">
          <strong>エラー:</strong> {uploadState.error}
        </div>
      )}

      {/* プレビューエリア */}
      {(uploadState.imageUrl || uploadState.floorPlanData) && (
        <div className="preview-container">
          {/* 元画像プレビュー */}
          <div className="preview-section">
            <h3 className="preview-title">📷 アップロード画像</h3>
            {uploadState.imageUrl && (
              <img
                src={uploadState.imageUrl}
                alt="アップロードされた間取り図"
                className="image-preview"
              />
            )}
          </div>

          {/* 3Dプレビュー */}
          <div className="preview-section">
            <h3 className="preview-title">🏠 3D間取り</h3>
            {uploadState.isProcessing ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <div className="loading-text">3Dモデルを生成中...</div>
              </div>
            ) : uploadState.floorPlanData ? (
              <FloorPlan3D 
                floorPlanData={uploadState.floorPlanData}
                wallHeight={options.wallHeight}
                wallThickness={options.wallThickness}
              />
            ) : null}
          </div>
        </div>
      )}

      {/* コントロールパネル */}
      {uploadState.floorPlanData && (
        <Controls
          options={options}
          onOptionsChange={setOptions}
          onReprocess={handleReprocess}
          isProcessing={uploadState.isProcessing}
        />
      )}

      {/* 使い方説明 */}
      {!uploadState.file && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '2rem',
          marginTop: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}>
          <h3 style={{ color: 'white', marginBottom: '1rem' }}>📖 使い方</h3>
          <ol style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.8' }}>
            <li>間取り図の画像ファイル（PNG、JPG、JPEG）を準備します</li>
            <li>上の領域にドラッグ＆ドロップするか、クリックしてファイルを選択します</li>
            <li>AIが自動的に間取りを解析し、3Dモデルを生成します</li>
            <li>マウスで3Dモデルを回転・ズームして空間を確認できます</li>
            <li>設定パネルで壁の高さや厚さなどを調整できます</li>
          </ol>
        </div>
      )}

      {/* フッター */}
      <footer style={{ 
        textAlign: 'center', 
        marginTop: '4rem', 
        paddingTop: '2rem', 
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        color: 'rgba(255, 255, 255, 0.6)',
      }}>
        <p>© 2024 間取り3D変換アプリ - 空間をもっと身近に</p>
      </footer>
    </div>
  );
};

export default App;