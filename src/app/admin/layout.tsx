import AuthProvider from "@/components/AuthProvider";
import AdminNav from "@/components/AdminNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-ink">
        <AdminNav />
        <div className="mx-auto max-w-4xl px-6 py-12">{children}</div>
      </div>
    </AuthProvider>
  );
}
