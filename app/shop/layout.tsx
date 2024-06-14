
import Sidebar from "./_components/sidebar";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:mr-10" dir="rtl">
      <Sidebar />
      <div>{children}</div>
    </div>
  );
}
