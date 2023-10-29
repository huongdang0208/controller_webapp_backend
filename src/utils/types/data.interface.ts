import { Stream } from 'stream';

export interface FileUpload {
  file_id: number;
  filename: string;
  mimetype: string;
  size: number;
  created_at: string,
  updated_at: string,
  createReadStream?: () => Stream;
}

export interface Dataproduct {
  data_id: number;
  size: number;
  weight: number;
  power: number;
}