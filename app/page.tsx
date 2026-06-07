import Nav from "@/components/Nav";
import SideNav from "@/components/SideNav";
import Hero from "@/components/Hero";
import Stack from "@/components/Stack";
import Experience from "@/components/Experience";
import Work from "@/components/Work";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <SideNav />
      <main>
        <Hero />
        <Stack />
        <Experience />
        <Work />
      </main>
      <Footer />
    </>
  );
}
