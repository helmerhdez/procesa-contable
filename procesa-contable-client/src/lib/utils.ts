import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { FILE_SIZES } from "./constants"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const bytesToSize = (bytes?: number): string => {
  if (bytes === 0 || !bytes) return 'n/a';
  const i = parseInt(Math.floor(Math.log(Math.abs(bytes)) / Math.log(1024)).toString(), 10);
  if (i === 0) return `${bytes} ${FILE_SIZES[i]}`;
  return `${(bytes / (1024 ** i)).toFixed(1)} ${FILE_SIZES[i]}`;
}

export const deleteItemWithIndexFromList = (list: any[], index: number, range = 1): any[] => {
  const newList = [...list];
  newList.splice(index, range);
  return newList;
}

export const getFileExtension = (mimeType: string): string => {
  if (!mimeType || typeof mimeType !== 'string') {
    throw new Error('Invalid MIME type');
  }

  const [type, subtype] = mimeType.split('/');
  return subtype || type;
};

export const formatDate = (date: string | Date, local: string): string => {
  return new Date(date).toLocaleString(local, {
    hour12: true,
  })
}