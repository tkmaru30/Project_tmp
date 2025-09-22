import React, { useCallback, useState } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  isProcessing: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, isProcessing }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onImageUpload(file);
      }
    }
  }, [onImageUpload]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onImageUpload(files[0]);
    }
  }, [onImageUpload]);

  const handleClick = useCallback(() => {
    if (!isProcessing) {
      document.getElementById('file-input')?.click();
    }
  }, [isProcessing]);

  return (
    <div
      className={`upload-area ${isDragOver ? 'dragover' : ''} ${isProcessing ? 'processing' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      style={{
        cursor: isProcessing ? 'not-allowed' : 'pointer',
        opacity: isProcessing ? 0.7 : 1,
      }}
    >
      <div className="upload-icon">
        <Upload size={64} />
      </div>
      <div className="upload-text">
        {isProcessing ? '画像を処理中...' : '間取り画像をアップロード'}
      </div>
      <div className="upload-subtext">
        {isProcessing 
          ? 'しばらくお待ちください' 
          : 'クリックまたはドラッグ＆ドロップで画像を選択 (PNG, JPG, JPEG)'
        }
      </div>
      <input
        id="file-input"
        type="file"
        className="file-input"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isProcessing}
      />
    </div>
  );
};