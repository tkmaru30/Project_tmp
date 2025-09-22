export interface FloorPlanData {
  rooms: Room[];
  walls: Wall[];
  dimensions: {
    width: number;
    height: number;
  };
}

export interface Room {
  id: string;
  name: string;
  bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  color: string;
  height: number;
}

export interface Wall {
  id: string;
  start: { x: number; y: number };
  end: { x: number; y: number };
  thickness: number;
  height: number;
}

export interface ProcessingOptions {
  wallHeight: number;
  wallThickness: number;
  roomHeight: number;
  scale: number;
}

export interface UploadState {
  file: File | null;
  imageUrl: string | null;
  isProcessing: boolean;
  error: string | null;
  floorPlanData: FloorPlanData | null;
}