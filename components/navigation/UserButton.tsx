"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { LogOutIcon, Moon, Settings, Sun, TruckIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Switch } from "../ui/switch";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const UserButton = ({ user }: Session) => {
  const { setTheme, theme } = useTheme();
  const [checked, setChecked] = useState<boolean>(theme ? true : false);
  const router = useRouter();

  if (!user) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer font-semibold bg-secondary">
          {user?.image && <AvatarImage src={user?.image} />}
          {!user.image && (
            <AvatarFallback className="bg-primary/25">
              {user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 font-medium px-2">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1 items-center justify-center bg-primary/10 py-3 rounded-sm">
            <Avatar className="cursor-pointer font-semibold bg-secondary w-12 h-12 text-2xl">
              {user?.image && <AvatarImage src={user?.image} />}
              {!user.image && (
                <AvatarFallback className="cursor-pointer bg-secondary text-2xl w-12 h-12">
                  {user.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <p>{user?.name}</p>
            <p className="text-xm opacity-75">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="group py-3 cursor-pointer transition-all duration-500"
          onClick={() => router.push("/dashboard/orders")}
        >
          <TruckIcon
            className="mr-2 group-hover:translate-x-1 transition-all ease-in-out"
            size={20}
          />
          My Orders
        </DropdownMenuItem>
        <DropdownMenuItem
          className="group py-3 cursor-pointer transition-all duration-500"
          onClick={() => router.push("/dashboard/settings")}
        >
          <Settings className="mr-2 group-hover:animate-spin" size={20} />
          Settings
        </DropdownMenuItem>
        {theme && (
          <DropdownMenuItem className="py-3 cursor-pointer transition-all duration-500">
            <div
              className="flex items-center group justify-between w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center group">
                <div className="relative flex mr-2">
                  {theme === "light" ? (
                    <Sun
                      size={20}
                      className="text-yellow-500 mr-2 group-hover:animate-spin"
                    />
                  ) : (
                    <Moon
                      size={20}
                      className="text-blue-400 mr-2 group-hover:rotate-12 transition-all duration-500"
                    />
                  )}

                  <p className="text-yellow-500 dark:text-blue-400">
                    {theme[0].toUpperCase() + theme?.slice(1)} Mode
                  </p>
                </div>
              </div>

              <Switch
                className="scale-90 bg-red-600"
                checked={checked}
                onCheckedChange={(e) => {
                  setChecked((prev) => !prev);
                  if (e) setTheme("dark");
                  if (!e) setTheme("light");
                }}
              />
            </div>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="py-3 cursor-pointer transition-all duration-500 hover:scale-105 focus:bg-destructive/20"
          onClick={() => signOut()}
        >
          <LogOutIcon className="mr-2" size={20} />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
