import HeroSection from "./_components/hero";
import Ilustration from "./_components/ilustration";
import Form from "./_components/form";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <section className="mt-12">
        <div className="container">
          <div className="flex justify-between flex-row">
            <Ilustration width={471} height={347}/>
            <Form />
          </div>
        </div>
      </section>
    </main>
  );
}
