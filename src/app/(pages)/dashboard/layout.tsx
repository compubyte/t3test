import "@/styles/globals.css";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { MenuBar } from "@/app/_components/dashboard/MenuBar";
import { ThemeProvider } from "@/app/_components/dashboard/ThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <MenuBar />
        {children}
      </ThemeProvider>
    </ProtectedRoute>
  );
}
