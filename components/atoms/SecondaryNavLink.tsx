import React from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SecondaryNavLinkProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

/**
 * 原子组件 - 次要导航链接
 * 用于侧边栏的次要功能链接（Pricing, Credits, API, Settings）
 * 使用更小的图标和更浅的颜色
 */
export const SecondaryNavLink: React.FC<SecondaryNavLinkProps> = ({
  icon: Icon,
  label,
  href,
}) => {
  return (
    <Link
      href={href}
      className={cn(
        // 基础样式
        'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg',
        'text-sm font-normal text-gray-500',
        'transition-all duration-200',
        // 悬停样式
        'hover:bg-gray-100/50 hover:text-gray-700'
      )}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </Link>
  );
};
