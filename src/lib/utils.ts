import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 工具函数 - 合并 Tailwind CSS 类名
 * 使用 clsx 和 tailwind-merge 来智能合并类名
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
