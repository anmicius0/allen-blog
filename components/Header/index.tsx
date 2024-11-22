import { Popover } from "@headlessui/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Button from "../Button";
// Local Data
import data from "../../data/portfolio.json";

interface HeaderProps {
  handleWorkScroll?: () => void;
  handleAboutScroll?: () => void;
  isBlog: boolean;
}

const Header: React.FC<HeaderProps> = ({
  handleWorkScroll,
  handleAboutScroll,
  isBlog,
}) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { name, showBlog, showResume, darkMode } = data;

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(
    () => setTheme(theme === "dark" ? "light" : "dark"),
    [theme, setTheme]
  );

  const navItems = isBlog
    ? [
        { label: "Home", onClick: () => router.push("/") },
        ...(showBlog
          ? [{ label: "Blog", onClick: () => router.push("/blog") }]
          : []),
        ...(showResume
          ? [{ label: "Resume", onClick: () => router.push("/resume") }]
          : []),
        {
          label: "Contact",
          onClick: () => window.open("mailto:hello@chetanverma.com"),
        },
      ]
    : [
        { label: "Work", onClick: handleWorkScroll },
        { label: "About", onClick: handleAboutScroll },
        ...(showBlog
          ? [{ label: "Blog", onClick: () => router.push("/blog") }]
          : []),
        ...(showResume
          ? [{ label: "Resume", onClick: () => router.push("/resume") }]
          : []),
        {
          label: "Contact",
          onClick: () => window.open("mailto:hello@chetanverma.com"),
        },
      ];

  return (
    <>
      <Popover className="block tablet:hidden mt-5">
        {({ open }) => (
          <>
            <div className="flex items-center justify-between p-2 laptop:p-0">
              <h1
                onClick={() => router.push("/")}
                className="font-medium p-2 laptop:p-0 link"
              >
                {name}.
              </h1>
              <div className="flex items-center">
                {darkMode && (
                  <Button type="secondary" onClick={toggleTheme}>
                    <Image
                      className="h-6"
                      src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`}
                      alt="Theme Icon"
                      width={24}
                      height={24}
                    />
                  </Button>
                )}
                <Popover.Button>
                  <Image
                    className="h-5"
                    src={`/images/${!open ? (theme === "dark" ? "menu-white.svg" : "menu.svg") : theme === "light" ? "cancel.svg" : "cancel-white.svg"}`}
                    alt="Menu Icon"
                    width={20}
                    height={20}
                  />
                </Popover.Button>
              </div>
            </div>
            <Popover.Panel
              className={`absolute right-0 z-10 w-11/12 p-4 ${theme === "dark" ? "bg-slate-800" : "bg-white"} shadow-md rounded-md`}
            >
              <div className="grid grid-cols-1">
                {navItems.map((item, index) => (
                  <Button key={index} type="secondary" onClick={item.onClick}>
                    {item.label}
                  </Button>
                ))}
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>

      <div
        className={`mt-10 hidden flex-row items-center justify-between sticky ${theme === "light" && "bg-white"} dark:text-white top-0 z-10 tablet:flex`}
      >
        <h1
          onClick={() => router.push("/")}
          className="font-medium cursor-pointer mob:p-2 laptop:p-0"
        >
          {name}.
        </h1>
        <div className="flex">
          {navItems.map((item, index) => (
            <Button key={index} type="secondary" onClick={item.onClick}>
              {item.label}
            </Button>
          ))}
          {mounted && theme && darkMode && (
            <Button type="secondary" onClick={toggleTheme}>
              <Image
                className="h-6"
                src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`}
                alt="Theme Icon"
                width={24}
                height={24}
              />
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
