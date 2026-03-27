import Header from "@/components/Header";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import Footer from "@/components/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="app">
      <Header />
      <ClientLayoutWrapper>
        {children}
      </ClientLayoutWrapper>
      <Footer />
    </div>
  );
}
