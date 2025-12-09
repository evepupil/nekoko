import React from 'react';
import { ChevronRight } from 'lucide-react';
import { ContentCard } from '@/components/molecules/ContentCard';
import { Button } from '@/components/atoms/Button';

/**
 * 组织组件 - 探索区域
 * 展示内容网格和操作按钮
 * 优化后的精致版本 - 不同的渐变封面颜色
 */
export const ExploreSection: React.FC = () => {
  // 模拟内容数据 - 添加不同的渐变色
  const contentItems = [
    {
      id: 1,
      title: 'The Future of AI in Content Creation',
      author: 'Sarah Johnson',
      duration: '12:34',
      plays: '2.5K',
      coverGradient: 'bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400',
    },
    {
      id: 2,
      title: 'Building Better Products with User Feedback',
      author: 'Michael Chen',
      duration: '18:45',
      plays: '1.8K',
      coverGradient: 'bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-400',
    },
    {
      id: 3,
      title: 'Design Systems at Scale',
      author: 'Emily Davis',
      duration: '25:12',
      plays: '3.2K',
      coverGradient: 'bg-gradient-to-br from-amber-400 via-orange-400 to-red-400',
    },
    {
      id: 4,
      title: 'The Art of Storytelling in Podcasts',
      author: 'David Martinez',
      duration: '15:30',
      plays: '4.1K',
      coverGradient: 'bg-gradient-to-br from-emerald-400 via-green-400 to-lime-400',
    },
  ];

  return (
    <section className="w-full max-w-4xl mx-auto px-6 py-12">
      {/* 区域头部 */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Explore</h2>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            Play All
          </Button>
          <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 内容网格 - 2列布局，增加间距 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {contentItems.map((item) => (
          <ContentCard
            key={item.id}
            title={item.title}
            author={item.author}
            duration={item.duration}
            plays={item.plays}
            coverGradient={item.coverGradient}
          />
        ))}
      </div>
    </section>
  );
};
