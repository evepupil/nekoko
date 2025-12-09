/**
 * Pricing 页面 - 定价方案
 */
export default function PricingPage() {
  return (
    <div className="w-full">
      <section className="w-full max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            定价方案
          </h1>
          <p className="text-xl text-gray-600">
            选择适合你创作需求的套餐
          </p>
        </div>

        {/* 定价卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 免费版 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">免费版</h3>
            <p className="text-gray-600 mb-6">适合入门体验</p>
            <p className="text-4xl font-bold text-gray-900 mb-6">¥0<span className="text-lg font-normal text-gray-600">/月</span></p>
            <ul className="space-y-3 mb-8">
              <li className="text-gray-600">✓ 每月 10 张图片</li>
              <li className="text-gray-600">✓ 基础风格</li>
              <li className="text-gray-600">✓ 标准质量</li>
            </ul>
            <button className="w-full px-6 py-3 bg-gray-100 text-gray-900 rounded-xl font-medium hover:bg-gray-200 transition-colors">
              开始使用
            </button>
          </div>

          {/* 专业版 */}
          <div className="bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl p-8 text-white transform scale-105 shadow-xl">
            <h3 className="text-2xl font-bold mb-2">专业版</h3>
            <p className="text-violet-100 mb-6">最受欢迎</p>
            <p className="text-4xl font-bold mb-6">¥99<span className="text-lg font-normal text-violet-100">/月</span></p>
            <ul className="space-y-3 mb-8">
              <li className="text-white">✓ 每月 500 张图片</li>
              <li className="text-white">✓ 全部风格</li>
              <li className="text-white">✓ 高清质量</li>
              <li className="text-white">✓ 优先生成</li>
            </ul>
            <button className="w-full px-6 py-3 bg-white text-violet-600 rounded-xl font-medium hover:bg-violet-50 transition-colors">
              升级专业版
            </button>
          </div>

          {/* 企业版 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">企业版</h3>
            <p className="text-gray-600 mb-6">适合大型团队</p>
            <p className="text-4xl font-bold text-gray-900 mb-6">¥499<span className="text-lg font-normal text-gray-600">/月</span></p>
            <ul className="space-y-3 mb-8">
              <li className="text-gray-600">✓ 无限图片</li>
              <li className="text-gray-600">✓ 自定义风格</li>
              <li className="text-gray-600">✓ 4K 质量</li>
              <li className="text-gray-600">✓ API 接入</li>
              <li className="text-gray-600">✓ 专属客服</li>
            </ul>
            <button className="w-full px-6 py-3 bg-gray-100 text-gray-900 rounded-xl font-medium hover:bg-gray-200 transition-colors">
              联系销售
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
