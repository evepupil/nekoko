'use client';

import React, { useState } from 'react';
import { Wand2, Loader2, Download, X } from 'lucide-react';
import { SegmentedControl } from '@/components/molecules/SegmentedControl';
import { InputToolbar } from '@/components/molecules/InputToolbar';
import { useAuth } from '@/components/AuthProvider';

type Mode = 'text-to-image' | 'image-to-image' | 'sketch-to-image';

/**
 * 组织组件 - Hero 区域
 * 包含品牌标题、模式切换器和输入区域
 * Nekoko AI 图片生成平台版本 - 柔和渐变、魔法图标、分段控制器
 */
export const HeroSection: React.FC = () => {
  const { user, refresh } = useAuth();
  const [activeMode, setActiveMode] = useState<Mode>('text-to-image');
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [lastCost, setLastCost] = useState<number | null>(null);

  const modeOptions = [
    { value: 'text-to-image', label: '文生图' },
    { value: 'image-to-image', label: '图生图' },
    { value: 'sketch-to-image', label: '草图生图' },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('请输入提示词');
      return;
    }

    if (!user) {
      setError('请先登录');
      return;
    }

    setGenerating(true);
    setError('');
    setGeneratedImage(null);
    setLastCost(null);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          width: 1024,
          height: 1024,
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || '生成失败');
      }

      // 刷新用户信息（更新余额）
      refresh();

      // 显示生成的图片
      if (data.imageUrl) {
        setGeneratedImage(data.imageUrl);
      } else if (data.imageBase64) {
        setGeneratedImage(`data:image/png;base64,${data.imageBase64}`);
      }

      setLastCost(data.cost);

    } catch (err) {
      setError(err instanceof Error ? err.message : '生成失败');
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;

    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `nekoko-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
          用 AI 将你的创意转化为惊艳的图片
        </p>
        {user && (
          <p className="text-sm text-gray-500 mt-2">
            当前余额: <span className="font-medium text-violet-600">¥{user.balance.toFixed(2)}</span>
          </p>
        )}
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
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* 生成的图片展示 */}
        {generatedImage && (
          <div className="mb-4 relative">
            <div className="relative rounded-xl overflow-hidden bg-gray-100">
              <img
                src={generatedImage}
                alt="生成的图片"
                className="w-full h-auto max-h-[512px] object-contain"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={handleDownload}
                  className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-sm transition-colors"
                  title="下载图片"
                >
                  <Download size={18} className="text-gray-700" />
                </button>
                <button
                  onClick={() => setGeneratedImage(null)}
                  className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-sm transition-colors"
                  title="关闭"
                >
                  <X size={18} className="text-gray-700" />
                </button>
              </div>
            </div>
            {lastCost && (
              <p className="text-sm text-gray-500 mt-2 text-center">
                本次消耗 ¥{lastCost.toFixed(2)}
              </p>
            )}
          </div>
        )}

        {/* 文本输入框 - 提示词 */}
        <textarea
          placeholder="描述你想要生成的图片... (例如: 一只在月牙上休息的神秘猫咪，紫色发光的眼睛，数字艺术风格)"
          className="w-full min-h-[120px] resize-none border-none outline-none text-gray-900 placeholder:text-gray-400 text-base"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={generating}
        />

        {/* 底部工具栏 */}
        <InputToolbar
          onGenerate={handleGenerate}
          generating={generating}
          disabled={!user}
        />
      </div>

      {!user && (
        <p className="text-center text-gray-500 mt-4 text-sm">
          请先 <a href="/login" className="text-violet-600 hover:underline">登录</a> 后再生成图片
        </p>
      )}
    </section>
  );
};
