import { Categories, Hero, NewDrops, Reviews } from "@/components";

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
