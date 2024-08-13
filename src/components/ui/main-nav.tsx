"use client";
import Link from "next/link";
import React from "react";
import HomeIcon from "./icons/HomeIcon";
import UserIcon from "./icons/UserIcon";
import HeartIcon from "./icons/HeartIcon";
import SearchIcon from "./icons/SearchIcon";
import UserAvatar from "../containers/UserAvatar";
import { ThemeToggle } from "./theme-toggle";
import { buttonVariants } from "./button";

const MainNav = () => {
  return (
    <nav className="w-full h-14 flex justify-between items-center px-4 sticky top-0 backdrop-blur-lg">
      <div className="font-Edu_VIC_WA_NT_Beginner font-bold underline text-gray-600 dark:text-white">
        <Link href={""}>{process.env.NEXT_PUBLIC_LOGO_TEXT}</Link>
      </div>
      <ul className="flex gap-4">
        <li>
          <Link
            className={buttonVariants({
              variant: "ghost",
              className: "hover:bg-slate-200 dark:hover:bg-accent",
            })}
            href={"#"}
          >
            <HomeIcon
              strokeWidth={2}
              className="size-6 stroke-slate-600 dark:stroke-white"
            />
          </Link>
        </li>
        <li>
          <Link
            className={buttonVariants({
              variant: "ghost",
              className: "hover:bg-slate-200 dark:hover:bg-accent",
            })}
            href={"#"}
          >
            <UserIcon
              strokeWidth={2}
              className="size-6 stroke-slate-600 dark:stroke-white"
            />
          </Link>
        </li>
        <li>
          <Link
            className={buttonVariants({
              variant: "ghost",
              className: "hover:bg-slate-200 dark:hover:bg-accent",
            })}
            href={"#"}
          >
            <HeartIcon
              strokeWidth={2}
              className="size-6 stroke-slate-600 dark:stroke-white"
            />
          </Link>
        </li>
        <li>
          <Link
            className={buttonVariants({
              variant: "ghost",
              className: "hover:bg-slate-200 dark:hover:bg-accent",
            })}
            href={"#"}
          >
            <SearchIcon
              strokeWidth={2}
              className="size-6 stroke-slate-600 dark:stroke-white"
            />
          </Link>
        </li>
      </ul>
      <div className="flex gap-2">
        <ThemeToggle />
        <UserAvatar />
      </div>
    </nav>
  );
};

export default MainNav;
