import "../../globals.css";
// import Footer from "@/components/Footer";
import LayoutClient from "@/components/ui/LayoutClient";
import AuthGuard from "@/components/AuthGuard";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <LayoutClient>
        {children}
      </LayoutClient>
  );
}
