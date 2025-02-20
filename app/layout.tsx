import "./globals.css";
import { AuthProvider } from "@/context/auth";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html>
        <body>
            <main className="flex-grow min-h-screen bg-black">{children}</main>
        </body>
      </html>
    </AuthProvider>
  );
}
