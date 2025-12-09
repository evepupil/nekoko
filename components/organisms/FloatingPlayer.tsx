'use client';

import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { IconButton } from '@/components/atoms/IconButton';
import { Avatar } from '@/components/atoms/Avatar';

/**
 * 组织组件 - 悬浮播放器
 * 固定在底部中央，使用高级玻璃态效果
 * 优化后的精致版本 - 更宽、半透明白色背景、重阴影、白色边框
 */
export const FloatingPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
      <div
        className="bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl px-8 py-5"
        style={{
          boxShadow: '0 8px 30px rgb(0,0,0,0.12), 0 2px 10px rgb(0,0,0,0.08)'
        }}
      >
        <div className="flex items-center gap-8">
          {/* 左侧 - 当前播放信息 */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <Avatar size="lg" fallback="P" />
            <div className="min-w-0">
              <p className="text-base font-semibold text-gray-900 truncate">
                The Future of AI in Content Creation
              </p>
              <p className="text-sm text-gray-500 truncate">Sarah Johnson</p>
            </div>
          </div>

          {/* 中间 - 播放控制（居中） */}
          <div className="flex items-center gap-3">
            <IconButton
              icon={SkipBack}
              size="sm"
              variant="ghost"
              className="text-gray-700"
            />
            <IconButton
              icon={isPlaying ? Pause : Play}
              size="lg"
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-gray-900 text-white hover:bg-gray-800 shadow-md"
            />
            <IconButton
              icon={SkipForward}
              size="sm"
              variant="ghost"
              className="text-gray-700"
            />
          </div>

          {/* 右侧 - 音量和速度 */}
          <div className="flex items-center gap-5 flex-1 justify-end">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-gray-600" />
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="70"
                className="w-24 h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-gray-900"
              />
            </div>
            <button className="text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100/50 transition-colors border border-gray-200">
              1.0x
            </button>
          </div>
        </div>

        {/* 进度条 - 纤细优雅 */}
        <div className="mt-4">
          <div className="relative h-1.5 bg-gray-200/80 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500 font-medium">4:23</span>
            <span className="text-xs text-gray-500 font-medium">12:34</span>
          </div>
        </div>
      </div>
    </div>
  );
};
