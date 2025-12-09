import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ghost';
}

/**
 * 原子组件 - 图标按钮
 * 纯图标的圆形按钮
 */
export const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  size = 'md',
  variant = 'default',
  className,
  ...props
}) => {
  // 尺寸映射
  const sizeStyles = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  // 变体样式
  const variantStyles = {
    default: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-600',
  };

  return (
    <button
      className={cn(
        // 基础样式
        'inline-flex items-center justify-center',
        'rounded-full transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-gray-300',
        // 尺寸样式
        sizeStyles[size],
        // 变体样式
        variantStyles[variant],
        // 自定义类名
        className
      )}
      {...props}
    >
      <Icon className={iconSizes[size]} />
    </button>
  );
};
