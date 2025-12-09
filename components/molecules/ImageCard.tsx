import React from 'react';
import { Heart, Download, Expand } from 'lucide-react';
import { Avatar } from '@/components/atoms/Avatar';
import { IconButton } from '@/components/atoms/IconButton';
import { cn } from '@/lib/utils';

interface ImageCardProps {
  imageUrl?: string;
  imagePlaceholder?: string;
  prompt: string;
  author: string;
  authorAvatar?: string;
  likes: string;
  className?: string;
}

/**
 * 分子组件 - 图片卡片
 * 用于展示 AI 生成的图片，包含图片、提示词、作者信息
 * Nekoko AI 图片生成平台专用
 */
export const ImageCard: React.FC<ImageCardProps> = ({
  imageUrl,
  imagePlaceholder,
  prompt,
  author,
  authorAvatar,
  likes,
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
      {/* 顶部图片区域 */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={prompt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div
            className={cn(
              "w-full h-full",
              imagePlaceholder || "bg-gradient-to-br from-violet-300 via-fuchsia-300 to-pink-300"
            )}
          />
        )}

        {/* 悬停时显示操作按钮 */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="absolute top-3 right-3 flex gap-2">
            <div className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-colors">
              <Heart className="w-4 h-4 text-gray-700" />
            </div>
            <div className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-colors">
              <Download className="w-4 h-4 text-gray-700" />
            </div>
          </div>
          <div className="absolute bottom-3 right-3">
            <div className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-colors">
              <Expand className="w-4 h-4 text-gray-700" />
            </div>
          </div>
        </div>
      </div>

      {/* 底部信息区域 */}
      <div className="p-4">
        {/* 提示词 */}
        <p className="text-sm text-gray-700 line-clamp-2 mb-3 leading-relaxed">
          {prompt}
        </p>

        {/* 作者信息和点赞 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar
              src={authorAvatar}
              alt={author}
              size="sm"
              fallback={author[0]}
            />
            <span className="text-sm text-gray-600 truncate">{author}</span>
          </div>

          <div className="flex items-center gap-1 text-gray-500">
            <Heart className="w-4 h-4" />
            <span className="text-xs font-medium">{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
