'use client';
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon, ComputerDesktopIcon   } from "@heroicons/react/24/outline";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    setDropdownOpen(false);
  };

  const getIcon = (themeName: string) => {
    switch (themeName) {
      case "system":
        return <ComputerDesktopIcon className="w-6 h-6" />;
      case "dark":
        return <MoonIcon className="w-6 h-6" />;
      case "light":
        return <SunIcon className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative sm:ml-14">
      <button
        className=" rounded-full justify-center p-2  shadow-lg shadow-neutral-400"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <span>{getIcon(theme || "system")}</span>
      </button>

      {dropdownOpen && (
        <ul className="absolute right-0 z-10 mt-2 p-2   rounded-full shadow-lg shadow-neutral-400 ">
          <li
            className={`cursor-pointer flex items-center justify-center w-full h-12`}
            onClick={() => handleThemeChange("light")}
          >
            <SunIcon className="w-6 h-6" />
          </li>

          <li
            className={`cursor-pointer flex items-center justify-center w-full h-12`}
            onClick={() => handleThemeChange("dark")}
          >
            <MoonIcon className="w-6 h-6" />
          </li>
          <li
            className={`cursor-pointer flex items-center justify-center w-full h-12`}
            onClick={() => handleThemeChange("system")}
          >
            <ComputerDesktopIcon className="w-6 h-6" />
          </li>
        </ul>
      )}
    </div>
  );
};

export default ThemeSwitch;