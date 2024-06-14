import SideBar from "./_components/sideBar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" flex flex-col lg:flex-row" dir="rtl">
    <SideBar/>
    <main className=" basis-2/3">{children}</main>
    </div>
  );
}
