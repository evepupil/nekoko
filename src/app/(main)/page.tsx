'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import Link from 'next/link';
import { Sparkles, Image as ImageIcon, Loader2 } from 'lucide-react';

interface Model {
  id: string;
  name: string;
  type: string;
  pricePerCall: number;
  providerName: string;
  config: {
    defaultWidth?: number;
    defaultHeight?: number;
  };
}

export default function HomePage() {
  const { user, loading: authLoading } = useAuth();
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(1024);
  const [generating, setGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const res = await fetch('/api/models');
      if (res.ok) {
        const data = await res.json();
        setModels(data);
        if (data.length > 0) {
          setSelectedModel(data[0]);
          setWidth(data[0].config?.defaultWidth || 1024);
          setHeight(data[0].config?.defaultHeight || 1024);
        }
      }
    } catch (err) {
      console.error('Failed to fetch models:', err);
    }
  };

  const handleModelChange = (modelId: string) => {
    const model = models.find((m) => m.id === modelId);
    if (model) {
      setSelectedModel(model);
      setWidth(model.config?.defaultWidth || 1024);
      setHeight(model.config?.defaultHeight || 1024);
    }
  };

  const handleGenerate = async () => {
    if (!user) {
      setError('请先登录');
      return;
    }

    if (!selectedModel) {
      setError('请选择模型');
      return;
    }

    if (!prompt.trim()) {
      setError('请输入提示词');
      return;
    }

    if (user.balance < selectedModel.pricePerCall) {
      setError('余额不足');
      return;
    }

    setError('');
    setGenerating(true);
    setGeneratedImage(null);

    // 模拟生成过程（因为API还没实现）
    setTimeout(() => {
      setGenerating(false);
      // 使用占位图
      setGeneratedImage(
        `https://placehold.co/${width}x${height}/1a1a2e/eaeaea?text=AI+Generated+Image`
      );
      setError('生图功能需要配置真实的API服务商。这是一个演示占位图。');
    }, 2000);
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          AI 图像生成
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          输入提示词，让 AI 为你创造精美图像
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 左侧：输入区域 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            生成设置
          </h2>

          {!user && (
            <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-blue-800 dark:text-blue-300 text-sm">
                请先{' '}
                <Link href="/login" className="underline font-medium">
                  登录
                </Link>{' '}
                或{' '}
                <Link href="/register" className="underline font-medium">
                  注册
                </Link>{' '}
                后使用生图功能
              </p>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                选择模型
              </label>
              <select
                value={selectedModel?.id || ''}
                onChange={(e) => handleModelChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                disabled={models.length === 0}
              >
                {models.length === 0 ? (
                  <option value="">暂无可用模型</option>
                ) : (
                  models.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name} ({model.providerName}) - ¥{model.pricePerCall}/次
                    </option>
                  ))
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                提示词 (Prompt)
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                rows={4}
                placeholder="描述你想要生成的图像，例如：一只可爱的猫咪在阳光下打盹..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                负面提示词 (Negative Prompt)
              </label>
              <textarea
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                rows={2}
                placeholder="描述你不想出现的内容（可选）"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  宽度
                </label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(parseInt(e.target.value) || 1024)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  min={256}
                  max={2048}
                  step={64}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  高度
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(parseInt(e.target.value) || 1024)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  min={256}
                  max={2048}
                  step={64}
                />
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={generating || !user || models.length === 0}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600
                       hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500
                       text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2"
            >
              {generating ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  生成中...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  开始生成
                </>
              )}
            </button>

            {user && selectedModel && (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                本次生成将消耗 ¥{selectedModel.pricePerCall.toFixed(2)}，当前余额 ¥{user.balance.toFixed(2)}
              </p>
            )}
          </div>
        </div>

        {/* 右侧：预览区域 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            生成结果
          </h2>

          <div
            className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden"
          >
            {generating ? (
              <div className="text-center">
                <Loader2 className="animate-spin text-blue-600 mx-auto mb-2" size={48} />
                <p className="text-gray-500 dark:text-gray-400">AI 正在创作中...</p>
              </div>
            ) : generatedImage ? (
              <img
                src={generatedImage}
                alt="Generated"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="text-center text-gray-400 dark:text-gray-500">
                <ImageIcon size={64} className="mx-auto mb-2 opacity-50" />
                <p>生成的图像将显示在这里</p>
              </div>
            )}
          </div>

          {generatedImage && !generating && (
            <div className="mt-4 flex gap-2">
              <a
                href={generatedImage}
                download="generated-image.png"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300
                         hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-center transition-colors"
              >
                下载图片
              </a>
              <button
                onClick={() => setGeneratedImage(null)}
                className="flex-1 py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300
                         hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                清除
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 使用说明 */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          使用说明
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600 dark:text-gray-400">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">1. 选择模型</h3>
            <p>选择合适的 AI 模型，不同模型有不同的风格和特点。</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">2. 输入提示词</h3>
            <p>用文字描述你想要的图像，描述越详细效果越好。</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">3. 生成图像</h3>
            <p>点击生成按钮，等待 AI 为你创作精美图像。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
