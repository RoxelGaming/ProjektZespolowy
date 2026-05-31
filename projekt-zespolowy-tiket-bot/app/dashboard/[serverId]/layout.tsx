import Sidebar from '../../components/layout/Sidebar'; 
import Topbar from '../../components/layout/Topbar'; 

export default function ServerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-[#101216] text-[#f2f3f5] overflow-hidden animate-fadeIn">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}