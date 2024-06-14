import Sidebar from "./_components/sidebar";
import "./style.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="bg-gray-100 w-full mt-[-70px]">{children}</div>
    </div>
  );
}
