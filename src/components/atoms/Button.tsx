import React from 'react';
import { cn } from '@/lib/utils';

// 按钮变体类型定义
type ButtonVariant = 'primary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  fullWidth?: boolean;
}

/**
 * 原子组件 - 基础按钮
 * 支持多种变体和尺寸
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  className,
  ...props
}) => {
  // 变体样式映射
  const variantStyles = {
    primary: 'bg-black text-white hover:bg-gray-800 active:bg-gray-900',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200',
    outline: 'bg-transparent border border-gray-200 text-gray-700 hover:bg-gray-50',
  };

  // 尺寸样式映射
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={cn(
        // 基础样式
        'rounded-xl font-medium transition-all duration-200 inline-flex items-center justify-center',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        // 变体样式
        variantStyles[variant],
        // 尺寸样式
        sizeStyles[size],
        // 全宽样式
        fullWidth && 'w-full',
        // 自定义类名
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
