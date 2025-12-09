import { AuthProvider } from '@/components/AuthProvider';
import Header from '@/components/Header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        {children}
      </div>
    </AuthProvider>
  );
}
