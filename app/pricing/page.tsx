/**
 * Pricing 页面 - 定价方案
 */
export default function PricingPage() {
  return (
    <div className="w-full">
      <section className="w-full max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Pricing
          </h1>
          <p className="text-xl text-gray-600">
            Choose the perfect plan for your creative needs
          </p>
        </div>

        {/* 定价卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
            <p className="text-gray-600 mb-6">Perfect for getting started</p>
            <p className="text-4xl font-bold text-gray-900 mb-6">$0<span className="text-lg font-normal text-gray-600">/month</span></p>
            <ul className="space-y-3 mb-8">
              <li className="text-gray-600">✓ 10 images per month</li>
              <li className="text-gray-600">✓ Basic styles</li>
              <li className="text-gray-600">✓ Standard quality</li>
            </ul>
            <button className="w-full px-6 py-3 bg-gray-100 text-gray-900 rounded-xl font-medium hover:bg-gray-200 transition-colors">
              Get Started
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl p-8 text-white transform scale-105 shadow-xl">
            <h3 className="text-2xl font-bold mb-2">Pro</h3>
            <p className="text-violet-100 mb-6">Most popular choice</p>
            <p className="text-4xl font-bold mb-6">$19<span className="text-lg font-normal text-violet-100">/month</span></p>
            <ul className="space-y-3 mb-8">
              <li className="text-white">✓ 500 images per month</li>
              <li className="text-white">✓ All styles</li>
              <li className="text-white">✓ HD quality</li>
              <li className="text-white">✓ Priority generation</li>
            </ul>
            <button className="w-full px-6 py-3 bg-white text-violet-600 rounded-xl font-medium hover:bg-violet-50 transition-colors">
              Upgrade to Pro
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
            <p className="text-gray-600 mb-6">For large teams</p>
            <p className="text-4xl font-bold text-gray-900 mb-6">$99<span className="text-lg font-normal text-gray-600">/month</span></p>
            <ul className="space-y-3 mb-8">
              <li className="text-gray-600">✓ Unlimited images</li>
              <li className="text-gray-600">✓ Custom styles</li>
              <li className="text-gray-600">✓ 4K quality</li>
              <li className="text-gray-600">✓ API access</li>
              <li className="text-gray-600">✓ Dedicated support</li>
            </ul>
            <button className="w-full px-6 py-3 bg-gray-100 text-gray-900 rounded-xl font-medium hover:bg-gray-200 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
