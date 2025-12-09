import React from 'react';
import { cn } from '@/lib/utils';

interface ConfigPillProps {
  label: string;
  value: string;
  onClick?: () => void;
}

/**
 * 原子组件 - 配置药丸按钮
 * 用于显示和选择配置选项（速度、语言、声音等）
 * 优化后的精致版本 - 白色背景、边框、圆角
 */
export const ConfigPill: React.FC<ConfigPillProps> = ({
  label,
  value,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5',
        'bg-white hover:bg-gray-50',
        'border border-gray-200 hover:border-gray-300',
        'rounded-full text-xs',
        'transition-all duration-200'
      )}
    >
      <span className="text-gray-500 font-normal">{label}:</span>
      <span className="text-gray-900 font-medium">{value}</span>
    </button>
  );
};
