import React from 'react';
import { ProcessingOptions } from '../types';

interface ControlsProps {
  options: ProcessingOptions;
  onOptionsChange: (options: ProcessingOptions) => void;
  onReprocess: () => void;
  isProcessing: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
  options,
  onOptionsChange,
  onReprocess,
  isProcessing,
}) => {
  const handleSliderChange = (key: keyof ProcessingOptions, value: number) => {
    onOptionsChange({
      ...options,
      [key]: value,
    });
  };

  return (
    <div className="controls">
      <h3 className="controls-title">3D表示設定</h3>
      
      <div className="control-group">
        <label className="control-label">壁の高さ</label>
        <input
          type="range"
          className="control-slider"
          min="200"
          max="400"
          value={options.wallHeight}
          onChange={(e) => handleSliderChange('wallHeight', parseInt(e.target.value))}
          disabled={isProcessing}
        />
        <span className="control-value">{options.wallHeight}cm</span>
      </div>

      <div className="control-group">
        <label className="control-label">壁の厚さ</label>
        <input
          type="range"
          className="control-slider"
          min="10"
          max="30"
          value={options.wallThickness}
          onChange={(e) => handleSliderChange('wallThickness', parseInt(e.target.value))}
          disabled={isProcessing}
        />
        <span className="control-value">{options.wallThickness}cm</span>
      </div>

      <div className="control-group">
        <label className="control-label">部屋の高さ</label>
        <input
          type="range"
          className="control-slider"
          min="200"
          max="350"
          value={options.roomHeight}
          onChange={(e) => handleSliderChange('roomHeight', parseInt(e.target.value))}
          disabled={isProcessing}
        />
        <span className="control-value">{options.roomHeight}cm</span>
      </div>

      <div className="control-group">
        <label className="control-label">スケール</label>
        <input
          type="range"
          className="control-slider"
          min="0.5"
          max="2"
          step="0.1"
          value={options.scale}
          onChange={(e) => handleSliderChange('scale', parseFloat(e.target.value))}
          disabled={isProcessing}
        />
        <span className="control-value">×{options.scale}</span>
      </div>

      <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <button
          onClick={onReprocess}
          disabled={isProcessing}
          style={{
            background: isProcessing 
              ? 'rgba(255, 255, 255, 0.3)' 
              : 'linear-gradient(45deg, #4a90e2, #357abd)',
            border: 'none',
            borderRadius: '8px',
            padding: '0.8rem 1.5rem',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: isProcessing ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            opacity: isProcessing ? 0.6 : 1,
          }}
        >
          {isProcessing ? '処理中...' : '3Dモデルを更新'}
        </button>
      </div>
    </div>
  );
};