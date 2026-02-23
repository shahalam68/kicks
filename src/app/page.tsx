import Hero from "@/components/Header/Hero";
import Categories from "@/components/sections/Categories";
import NewDrops from "@/components/sections/NewDrops";
import Reviews from "@/components/sections/Reviews";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <Hero />
      <NewDrops />
      <Categories />
      <Reviews />
    </div>
  );
}
