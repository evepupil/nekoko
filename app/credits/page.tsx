/**
 * Credits 页面 - 积分管理
 */
export default function CreditsPage() {
  return (
    <div className="w-full">
      <section className="w-full max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Credits</h1>
        <p className="text-xl text-gray-600 mb-12">
          Manage your generation credits
        </p>

        {/* 积分余额卡片 */}
        <div className="bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl p-8 text-white mb-8">
          <p className="text-violet-100 mb-2">Available Credits</p>
          <p className="text-6xl font-bold mb-4">1,250</p>
          <p className="text-violet-100">Approximately 625 images remaining</p>
        </div>

        {/* 使用历史 */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Usage History</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Image Generation</p>
                <p className="text-sm text-gray-600">Dec 9, 2025</p>
              </div>
              <p className="text-gray-900 font-medium">-2 credits</p>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">HD Upscale</p>
                <p className="text-sm text-gray-600">Dec 8, 2025</p>
              </div>
              <p className="text-gray-900 font-medium">-5 credits</p>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Purchase</p>
                <p className="text-sm text-gray-600">Dec 7, 2025</p>
              </div>
              <p className="text-green-600 font-medium">+500 credits</p>
            </div>
          </div>
        </div>

        {/* 购买积分按钮 */}
        <button className="mt-8 px-6 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity">
          Buy More Credits
        </button>
      </section>
    </div>
  );
}
