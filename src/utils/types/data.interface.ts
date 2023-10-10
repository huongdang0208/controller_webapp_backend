import { Stream } from 'stream';
import * as prisma from '@prisma/client';

export interface FileUpload {
  file_id: number;
  filename: string;
  mimetype: string;
  size: number;
  created_at: Date,
  updated_at: Date,
  createReadStream?: () => Stream;
}

export interface Dataproduct extends prisma.Data {
  data_id: number;
  size: number;
  weight: number;
  power: number;
}