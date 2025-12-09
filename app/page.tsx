import { HeroSection } from '@/components/organisms/HeroSection';
import { GallerySection } from '@/components/organisms/GallerySection';

/**
 * 主页面 - Nekoko AI 图片生成平台
 * Home 页面 - 展示 Hero 区域和社区画廊
 */
export default function Home() {
  return (
    <div className="w-full pb-16">
      {/* Hero 区域 - 图片生成 */}
      <HeroSection />

      {/* Gallery 区域 - 社区画廊预览 */}
      <GallerySection />
    </div>
  );
}
