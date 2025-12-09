import React from 'react';
import { ImagePlus, Upload } from 'lucide-react';
import { ConfigPill } from '@/components/atoms/ConfigPill';
import { IconButton } from '@/components/atoms/IconButton';
import { Button } from '@/components/atoms/Button';

/**
 * 分子组件 - 输入工具栏
 * 位于输入框底部，包含配置选项和操作按钮
 * Nekoko AI 图片生成平台版本 - 图片生成参数配置
 */
export const InputToolbar: React.FC = () => {
  return (
    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-3">
      {/* 左侧配置选项 - 图片生成参数 */}
      <div className="flex items-center gap-2">
        <ConfigPill label="Style" value="Digital Art" />
        <ConfigPill label="Ratio" value="1:1" />
        <ConfigPill label="Quality" value="HD" />
      </div>

      {/* 右侧操作按钮 - 图片上传和生成 */}
      <div className="flex items-center gap-2">
        <IconButton icon={ImagePlus} variant="ghost" size="sm" />
        <IconButton icon={Upload} variant="ghost" size="sm" />
        <Button variant="primary" size="sm" className="px-5">
          Generate
        </Button>
      </div>
    </div>
  );
};
