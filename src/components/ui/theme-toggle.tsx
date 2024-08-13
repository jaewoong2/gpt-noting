"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="hover:bg-slate-200 dark:hover:bg-accent"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="size-6 dark:hidden" />
      <Moon className="hidden size-6 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
