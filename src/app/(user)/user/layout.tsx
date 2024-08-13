import AlertHeaderComponent from "@/components/alertheader";
import { SessionProvider } from "@/components/useSession";
import { UserRoles } from "@/lib/models/interfaces";
import Footer from "./footer";
import Header from "./header";

export default function RootLayout({
  children,
  login,
}: Readonly<{
  children: React.ReactNode;
  login: React.ReactNode;
}>) {
  return (
    <SessionProvider role={UserRoles.User}>
      <AlertHeaderComponent />
      <Header />
      <main className="flex min-h-[calc(100vh-351px)] flex-col bg-[#f1f1f1]">
        <div className="container mx-auto px-4 lg:px-12 mt-8">
          {children}
        </div>
      </main>
      <Footer />
      {login}
    </SessionProvider>
  );
}
