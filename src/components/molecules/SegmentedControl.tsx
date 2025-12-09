'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SegmentedControlOption {
  value: string;
  label: string;
}

interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
}

/**
 * 分子组件 - 分段控制器
 * 类似 iOS 的 Segmented Control 样式
 * 单一容器内的标签切换器，选中项有白色背景和阴影
 */
export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <div className="inline-flex items-center gap-1 p-1 bg-gray-100 rounded-full">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            // 基础样式
            'px-6 py-2 rounded-full text-sm font-medium',
            'transition-all duration-200',
            // 选中状态
            value === option.value
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
