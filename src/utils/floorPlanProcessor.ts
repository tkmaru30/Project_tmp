import { FloorPlanData, Room, Wall, ProcessingOptions } from '../types';

export class FloorPlanProcessor {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
  }

  async processImage(imageFile: File, options: ProcessingOptions): Promise<FloorPlanData> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        try {
          const floorPlanData = this.analyzeFloorPlan(img, options);
          resolve(floorPlanData);
        } catch (error) {
          reject(error);
        }
      };
      img.onerror = () => reject(new Error('画像の読み込みに失敗しました'));
      img.src = URL.createObjectURL(imageFile);
    });
  }

  private analyzeFloorPlan(img: HTMLImageElement, options: ProcessingOptions): FloorPlanData {
    this.canvas.width = img.width;
    this.canvas.height = img.height;
    this.ctx.drawImage(img, 0, 0);

    const imageData = this.ctx.getImageData(0, 0, img.width, img.height);
    
    // 簡単な間取り解析アルゴリズム
    // 実際のプロジェクトでは、より高度な画像処理やAIを使用
    const rooms = this.detectRooms(imageData, options);
    const walls = this.detectWalls(imageData, options);

    return {
      rooms,
      walls,
      dimensions: {
        width: img.width * options.scale,
        height: img.height * options.scale,
      },
    };
  }

  private detectRooms(imageData: ImageData, options: ProcessingOptions): Room[] {
    // デモ用の簡単な部屋検出
    // 実際の実装では、エッジ検出や輪郭検出を使用
    const rooms: Room[] = [];
    const { width, height } = imageData;
    
    // サンプル部屋を生成（実際の画像解析の代わり）
    const sampleRooms = [
      {
        id: 'living',
        name: 'リビング',
        bounds: { x: width * 0.1, y: height * 0.1, width: width * 0.4, height: height * 0.6 },
        color: '#e8f4f8',
        height: options.roomHeight,
      },
      {
        id: 'kitchen',
        name: 'キッチン',
        bounds: { x: width * 0.55, y: height * 0.1, width: width * 0.35, height: height * 0.3 },
        color: '#f8f4e8',
        height: options.roomHeight,
      },
      {
        id: 'bedroom',
        name: '寝室',
        bounds: { x: width * 0.55, y: height * 0.45, width: width * 0.35, height: height * 0.45 },
        color: '#f4e8f8',
        height: options.roomHeight,
      },
    ];

    return sampleRooms.map(room => ({
      ...room,
      bounds: {
        ...room.bounds,
        x: room.bounds.x * options.scale,
        y: room.bounds.y * options.scale,
        width: room.bounds.width * options.scale,
        height: room.bounds.height * options.scale,
      },
    }));
  }

  private detectWalls(imageData: ImageData, options: ProcessingOptions): Wall[] {
    // デモ用の簡単な壁検出
    const walls: Wall[] = [];
    const { width, height } = imageData;
    
    // サンプル壁を生成
    const sampleWalls = [
      {
        id: 'wall1',
        start: { x: width * 0.1, y: height * 0.1 },
        end: { x: width * 0.9, y: height * 0.1 },
        thickness: options.wallThickness,
        height: options.wallHeight,
      },
      {
        id: 'wall2',
        start: { x: width * 0.1, y: height * 0.1 },
        end: { x: width * 0.1, y: height * 0.9 },
        thickness: options.wallThickness,
        height: options.wallHeight,
      },
      {
        id: 'wall3',
        start: { x: width * 0.9, y: height * 0.1 },
        end: { x: width * 0.9, y: height * 0.9 },
        thickness: options.wallThickness,
        height: options.wallHeight,
      },
      {
        id: 'wall4',
        start: { x: width * 0.1, y: height * 0.9 },
        end: { x: width * 0.9, y: height * 0.9 },
        thickness: options.wallThickness,
        height: options.wallHeight,
      },
      // 内部の壁
      {
        id: 'wall5',
        start: { x: width * 0.5, y: height * 0.1 },
        end: { x: width * 0.5, y: height * 0.4 },
        thickness: options.wallThickness,
        height: options.wallHeight,
      },
      {
        id: 'wall6',
        start: { x: width * 0.5, y: height * 0.45 },
        end: { x: width * 0.9, y: height * 0.45 },
        thickness: options.wallThickness,
        height: options.wallHeight,
      },
    ];

    return sampleWalls.map(wall => ({
      ...wall,
      start: {
        x: wall.start.x * options.scale,
        y: wall.start.y * options.scale,
      },
      end: {
        x: wall.end.x * options.scale,
        y: wall.end.y * options.scale,
      },
    }));
  }
}

export const floorPlanProcessor = new FloorPlanProcessor();