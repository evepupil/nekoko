import { GallerySection } from '@/components/organisms/GallerySection';

/**
 * Gallery 页面 - 图片画廊
 * 展示社区和个人的 AI 生成图片
 */
export default function GalleryPage() {
  return (
    <div className="w-full">
      {/* 页面标题 */}
      <section className="w-full max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Gallery
          </h1>
          <p className="text-xl text-gray-600">
            Explore stunning AI-generated artwork from our community
          </p>
        </div>
      </section>

      {/* 画廊区域 */}
      <GallerySection />
    </div>
  );
}
