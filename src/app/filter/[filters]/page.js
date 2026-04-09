import Showcase from "@/components/Showcase";
import Navigation from "@/components/Navigation";

export default function FilterPage() {
  return (
    <>
      <Navigation />
      <main className="main-content">
        <div className="container">
          <Showcase />
        </div>
      </main>
    </>
  );
}
