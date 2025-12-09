'use client';

import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { SegmentedControl } from '@/components/molecules/SegmentedControl';
import { InputToolbar } from '@/components/molecules/InputToolbar';

type Mode = 'text-to-image' | 'image-to-image' | 'sketch-to-image';

/**
 * 组织组件 - Hero 区域
 * 包含品牌标题、模式切换器和输入区域
 * Nekoko AI 图片生成平台版本 - 柔和渐变、魔法图标、分段控制器
 */
export const HeroSection: React.FC = () => {
  const [activeMode, setActiveMode] = useState<Mode>('text-to-image');

  const modeOptions = [
    { value: 'text-to-image', label: 'Text to Image' },
    { value: 'image-to-image', label: 'Image to Image' },
    { value: 'sketch-to-image', label: 'Sketch to Image' },
  ];

  return (
    <section className="w-full max-w-4xl mx-auto px-6 py-16">
      {/* 品牌标题 - 添加魔法图标和柔和渐变 */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Wand2 className="w-12 h-12 text-violet-400" strokeWidth={1.5} />
          <h1 className="text-6xl font-bold bg-gradient-to-r from-violet-400 via-violet-500 to-fuchsia-400 bg-clip-text text-transparent">
            Nekoko
          </h1>
        </div>
        <p className="text-xl text-gray-600">
          Transform your ideas into stunning AI-generated images
        </p>
      </div>

      {/* 模式切换器 - 使用分段控制器 */}
      <div className="flex items-center justify-center mb-8">
        <SegmentedControl
          options={modeOptions}
          value={activeMode}
          onChange={(value) => setActiveMode(value as Mode)}
        />
      </div>

      {/* 输入区域 - 提示词输入 */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        {/* 文本输入框 - 提示词 */}
        <textarea
          placeholder="Describe the image you want to create... (e.g., A mystical cat with glowing eyes sitting on a crescent moon, digital art style)"
          className="w-full min-h-[120px] resize-none border-none outline-none text-gray-900 placeholder:text-gray-400 text-base"
        />

        {/* 底部工具栏 */}
        <InputToolbar />
      </div>
    </section>
  );
};
