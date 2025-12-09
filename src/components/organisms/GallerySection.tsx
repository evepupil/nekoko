import React from 'react';
import { ChevronRight } from 'lucide-react';
import { ImageCard } from '@/components/molecules/ImageCard';
import { Button } from '@/components/atoms/Button';

/**
 * 组织组件 - 图片画廊区域
 * 展示 AI 生成的图片网格
 * Nekoko AI 图片生成平台版本 - 多彩渐变图片占位符
 */
export const GallerySection: React.FC = () => {
  // 模拟图片数据 - 添加不同的渐变色
  const imageItems = [
    {
      id: 1,
      prompt: 'A mystical cat with glowing purple eyes sitting on a crescent moon, surrounded by stars, digital art',
      author: 'Emma Wilson',
      likes: '1.2K',
      imagePlaceholder: 'bg-gradient-to-br from-violet-400 via-purple-400 to-fuchsia-400',
    },
    {
      id: 2,
      prompt: 'Futuristic cityscape at sunset with flying cars and neon lights, cyberpunk style',
      author: 'Alex Chen',
      likes: '2.8K',
      imagePlaceholder: 'bg-gradient-to-br from-cyan-400 via-blue-400 to-indigo-400',
    },
    {
      id: 3,
      prompt: 'Enchanted forest with bioluminescent mushrooms and fairy lights, fantasy illustration',
      author: 'Sophie Taylor',
      likes: '3.5K',
      imagePlaceholder: 'bg-gradient-to-br from-emerald-400 via-green-400 to-teal-400',
    },
    {
      id: 4,
      prompt: 'Steampunk airship floating above clouds during golden hour, detailed mechanical design',
      author: 'Marcus Rodriguez',
      likes: '1.9K',
      imagePlaceholder: 'bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400',
    },
    {
      id: 5,
      prompt: 'Underwater palace made of coral and pearls, ethereal lighting, concept art',
      author: 'Luna Park',
      likes: '2.3K',
      imagePlaceholder: 'bg-gradient-to-br from-blue-300 via-cyan-300 to-sky-300',
    },
    {
      id: 6,
      prompt: 'Ancient temple in cherry blossom garden, Japanese aesthetic, serene atmosphere',
      author: 'Yuki Tanaka',
      likes: '4.1K',
      imagePlaceholder: 'bg-gradient-to-br from-pink-300 via-rose-300 to-red-300',
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-12">
      {/* 区域头部 */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">社区画廊</h2>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            热门
          </Button>
          <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
            查看全部
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 图片网格 - 3列布局 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {imageItems.map((item) => (
          <ImageCard
            key={item.id}
            prompt={item.prompt}
            author={item.author}
            likes={item.likes}
            imagePlaceholder={item.imagePlaceholder}
          />
        ))}
      </div>
    </section>
  );
};
