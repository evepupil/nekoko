/**
 * API 页面 - API 文档和密钥管理
 */
export default function APIPage() {
  return (
    <div className="w-full">
      <section className="w-full max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">API</h1>
        <p className="text-xl text-gray-600 mb-12">
          Integrate Nekoko into your applications
        </p>

        {/* API Keys */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">API Keys</h2>
          <div className="bg-gray-50 rounded-xl p-4 font-mono text-sm mb-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">nk_live_••••••••••••••••••••</span>
              <button className="text-violet-600 hover:text-violet-700 font-sans font-medium">
                Reveal
              </button>
            </div>
          </div>
          <button className="px-4 py-2 bg-gray-100 text-gray-900 rounded-xl font-medium hover:bg-gray-200 transition-colors">
            Generate New Key
          </button>
        </div>

        {/* Quick Start */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Start</h2>
          <p className="text-gray-600 mb-4">Generate an image with a simple API call:</p>

          <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
            <pre className="text-sm text-gray-100 font-mono">
{`curl -X POST https://api.nekoko.ai/v1/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "A mystical cat with glowing eyes",
    "style": "digital-art",
    "ratio": "1:1",
    "quality": "hd"
  }'`}
            </pre>
          </div>

          <a
            href="#"
            className="inline-block mt-6 text-violet-600 hover:text-violet-700 font-medium"
          >
            View Full Documentation →
          </a>
        </div>
      </section>
    </div>
  );
}
