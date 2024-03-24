
import Sidebar from "./_components/sidebar";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex lg:ml-10">
      <Sidebar />
      <div>{children}</div>
    </div>
  );
}
