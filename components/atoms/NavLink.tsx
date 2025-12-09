import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

/**
 * 原子组件 - 导航链接
 * 用于侧边栏的导航项
 */
export const NavLink: React.FC<NavLinkProps> = ({
  icon: Icon,
  label,
  active = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        // 基础样式
        'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl',
        'text-sm font-medium transition-all duration-200',
        // 活动状态样式
        active
          ? 'bg-gray-100 text-gray-900'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      )}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
};
