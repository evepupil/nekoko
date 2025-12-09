import React from 'react';
import { ImagePlus, Upload, Loader2 } from 'lucide-react';
import { ConfigPill } from '@/components/atoms/ConfigPill';
import { IconButton } from '@/components/atoms/IconButton';
import { Button } from '@/components/atoms/Button';

interface InputToolbarProps {
  onGenerate?: () => void;
  generating?: boolean;
  disabled?: boolean;
}

/**
 * 分子组件 - 输入工具栏
 * 位于输入框底部，包含配置选项和操作按钮
 * Nekoko AI 图片生成平台版本 - 图片生成参数配置
 */
export const InputToolbar: React.FC<InputToolbarProps> = ({
  onGenerate,
  generating = false,
  disabled = false
}) => {
  return (
    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-3">
      {/* 左侧配置选项 - 图片生成参数 */}
      <div className="flex items-center gap-2">
        <ConfigPill label="风格" value="数字艺术" />
        <ConfigPill label="比例" value="1:1" />
        <ConfigPill label="质量" value="高清" />
      </div>

      {/* 右侧操作按钮 - 图片上传和生成 */}
      <div className="flex items-center gap-2">
        <IconButton icon={ImagePlus} variant="ghost" size="sm" />
        <IconButton icon={Upload} variant="ghost" size="sm" />
        <Button
          variant="primary"
          size="sm"
          className="px-5"
          onClick={onGenerate}
          disabled={disabled || generating}
        >
          {generating ? (
            <>
              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              生成中...
            </>
          ) : (
            '生成'
          )}
        </Button>
      </div>
    </div>
  );
};
