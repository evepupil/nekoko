import { HeroSection } from '@/components/organisms/HeroSection';

/**
 * Create 页面 - AI 图片创作页面
 * 专注于图片生成功能
 */
export default function CreatePage() {
  return (
    <div className="w-full">
      {/* Hero 区域 - 图片生成 */}
      <HeroSection />

      {/* 生成历史区域 */}
      <section className="w-full max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Creations</h2>
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500">Your generated images will appear here</p>
        </div>
      </section>
    </div>
  );
}
