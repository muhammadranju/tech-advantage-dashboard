export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="w-full  bg-white ">{children}</div>
    </div>
  );
}
