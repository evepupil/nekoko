import React from 'react';
import { Play, Clock, Eye } from 'lucide-react';
import { Avatar } from '@/components/atoms/Avatar';
import { IconButton } from '@/components/atoms/IconButton';
import { cn } from '@/lib/utils';

interface ContentCardProps {
  title: string;
  author: string;
  authorAvatar?: string;
  coverImage?: string;
  coverGradient?: string;
  duration: string;
  plays: string;
  className?: string;
}

/**
 * 分子组件 - 内容卡片
 * 用于展示播客或视频内容，包含封面、标题、作者信息和统计数据
 * 优化后的精致版本 - 更大圆角、微妙边框、精致渐变封面
 */
export const ContentCard: React.FC<ContentCardProps> = ({
  title,
  author,
  authorAvatar,
  coverImage,
  coverGradient,
  duration,
  plays,
  className,
}) => {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-gray-100 overflow-hidden',
        'hover:shadow-xl hover:border-gray-200 transition-all duration-300',
        'cursor-pointer group',
        className
      )}
    >
      <div className="flex gap-4 p-5">
        {/* 左侧封面图 - 增大尺寸 */}
        <div className="relative w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
          {coverImage ? (
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className={cn(
                "w-full h-full",
                coverGradient || "bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400"
              )}
            />
          )}
          {/* 悬停时显示播放按钮 */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
              <Play className="w-5 h-5 text-gray-900 ml-0.5" fill="currentColor" />
            </div>
          </div>
        </div>

        {/* 右侧内容信息 */}
        <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
          {/* 标题 */}
          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 leading-snug">
            {title}
          </h3>

          {/* 作者信息 */}
          <div className="flex items-center gap-2 mb-3">
            <Avatar
              src={authorAvatar}
              alt={author}
              size="sm"
              fallback={author[0]}
            />
            <span className="text-sm text-gray-600 truncate">{author}</span>
          </div>

          {/* 统计信息 */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              <span>{plays}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
