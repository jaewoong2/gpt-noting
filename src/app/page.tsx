import HeartIcon from "@/components/ui/icons/HeartIcon";
import HomeIcon from "@/components/ui/icons/HomeIcon";
import SearchIcon from "@/components/ui/icons/SearchIcon";
import UserIcon from "@/components/ui/icons/UserIcon";
import TwitterCard from "@/components/ui/twitter-card";
import Link from "next/link";
import React from "react";

// Edu VIC WA NT Beginner

const placeholder = {
  user: {
    name: "임재웅",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocIMVQKg4pVJbHwHTQkwpjl2eL9Y1C3n4wuz6YJmHtB-J8MQUA=s96-c",
  },
};

const HomePage = () => {
  return (
    <main className="w-full h-full flex mx-auto min-h-screen flex-col items-center">
      <nav className="w-full h-14 flex justify-between items-center px-4">
        <div className="font-Edu_VIC_WA_NT_Beginner font-bold underline text-gray-600">
          <Link href={""}>{process.env.NEXT_PUBLIC_LOGO_TEXT}</Link>
        </div>
        <ul className="flex gap-10">
          <li>
            <Link href={"#"}>
              <HomeIcon strokeWidth={2} className="size-6 stroke-slate-600" />
            </Link>
          </li>
          <li>
            <Link href={"#"}>
              <UserIcon strokeWidth={2} className="size-6 stroke-slate-600" />
            </Link>
          </li>
          <li>
            <Link href={"#"}>
              <HeartIcon strokeWidth={2} className="size-6 stroke-slate-600" />
            </Link>
          </li>
          <li>
            <Link href={"#"}>
              <SearchIcon strokeWidth={2} className="size-6 stroke-slate-600" />
            </Link>
          </li>
        </ul>
        <div>
          <figure className="w-10 h-10 rounded-full overflow-hidden border">
            <img src={placeholder.user.avatar} alt={placeholder.user.name} />
          </figure>
        </div>
      </nav>
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
