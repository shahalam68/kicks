import Hero from "@/components/Header/Hero";
import NavBar from "@/components/Header/NavBar";
import Categories from "@/components/sections/Categories";
import NewDrops from "@/components/sections/NewDrops";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <NavBar />
      <Hero />
      <NewDrops />
      <Categories />
    </div>
  );
}
