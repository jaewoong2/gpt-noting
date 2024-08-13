import MainNav from "@/components/ui/main-nav";
import TwitterCard from "@/components/ui/twitter-card";
import React from "react";

const HomePage = () => {
  return (
    <main className="w-full h-full flex mx-auto min-h-screen flex-col items-center">
      <MainNav />
      <section className="">
        <TwitterCard />
        <TwitterCard />
        <TwitterCard />
        <TwitterCard />
      </section>
    </main>
  );
};

export default HomePage;
