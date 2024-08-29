export default function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="flex-1 lg:pl-64 p-6">{children}</main>;
}
