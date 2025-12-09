import { Sidebar } from '@/components/organisms/Sidebar';
import { HeroSection } from '@/components/organisms/HeroSection';
import { GallerySection } from '@/components/organisms/GallerySection';

/**
 * 主页面 - Nekoko AI 图片生成平台
 * 整合所有组织组件，构建完整的 AI 图片生成平台布局
 */
export default function Home() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* 左侧边栏 */}
      <Sidebar />

      {/* 右侧主内容区域 */}
      <main className="flex-1 ml-60 overflow-y-auto pb-16">
        {/* Hero 区域 - 居中显示 */}
        <HeroSection />

        {/* Gallery 区域 - 图片画廊 */}
        <GallerySection />
      </main>
    </div>
  );
}
