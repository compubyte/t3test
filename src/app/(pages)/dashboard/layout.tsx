import "@/styles/globals.css";
import { Navbar } from "@/app/_components/dashboard/NavBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
