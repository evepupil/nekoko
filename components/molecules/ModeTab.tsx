import React from 'react';
import { cn } from '@/lib/utils';

interface ModeTabProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

/**
 * 分子组件 - 模式切换标签
 * 用于 Hero 区域的模式切换（AI Podcast, FlowSpeech, Video）
 */
export const ModeTab: React.FC<ModeTabProps> = ({
  label,
  active = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        // 基础样式
        'px-6 py-2.5 rounded-xl font-medium text-sm',
        'transition-all duration-200',
        // 活动状态
        active
          ? 'bg-gray-900 text-white shadow-lg'
          : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
      )}
    >
      {label}
    </button>
  );
};
