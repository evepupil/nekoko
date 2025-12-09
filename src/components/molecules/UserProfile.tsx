import React from 'react';
import { Avatar } from '@/components/atoms/Avatar';
import { cn } from '@/lib/utils';

interface UserProfileProps {
  name: string;
  email: string;
  avatarSrc?: string;
  className?: string;
}

/**
 * 分子组件 - 用户资料卡片
 * 组合头像和用户信息，用于侧边栏底部
 */
export const UserProfile: React.FC<UserProfileProps> = ({
  name,
  email,
  avatarSrc,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex items-center gap-3 p-3 rounded-xl',
        'hover:bg-gray-50 transition-colors duration-200 cursor-pointer',
        className
      )}
    >
      <Avatar src={avatarSrc} alt={name} size="md" fallback={name[0]} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
        <p className="text-xs text-gray-500 truncate">{email}</p>
      </div>
    </div>
  );
};
