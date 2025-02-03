import "@/styles/globals.css";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { MenuBar } from "@/app/_components/dashboard/MenuBar";
import { ThemeProvider } from "@/app/_components/dashboard/ThemeProvider";
import { ModeToggle } from "@/app/_components/dashboard/ModeToogle";
import { UserInfo } from "@/app/_components/dashboard/UserInfo";

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
        <div className="flex w-full min-w-[50%] items-center justify-between">
          {/* MenuBar alineado a la izquierda */}
          <MenuBar />
          {/* UserInfo y ModeToggle alineados a la derecha */}
          <div className="flex items-center gap-1">
            <UserInfo />
            <ModeToggle />
          </div>
        </div>

        {children}
      </ThemeProvider>
    </ProtectedRoute>
  );
}
