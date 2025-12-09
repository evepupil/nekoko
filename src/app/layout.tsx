import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/organisms/Sidebar";
import { AuthProvider } from "@/components/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Nekoko - AI Image Generation Platform",
  description: "Transform your ideas into stunning AI-generated images with Nekoko",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <AuthProvider>
          <div className="flex min-h-screen bg-white">
            {/* 左侧边栏 - 所有页面共享 */}
            <Sidebar />

            {/* 右侧主内容区域 */}
            <main className="flex-1 ml-60 overflow-y-auto">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
