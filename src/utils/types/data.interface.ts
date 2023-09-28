import { Stream } from 'stream';

export interface FileUpload {
  file_id: number;
  filename: string;
  mimetype: string;
  size: number;
  created_at: Date,
  updated_at: Date,
  createReadStream?: () => Stream;
}

export interface DataCategory {
  data_id?: number;
  size: number;
  weight: number;
  power: number;
}