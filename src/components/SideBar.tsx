'use client'

import { IconBuildingStore, IconBurger, IconDashboard, IconLogout, IconSettingsFilled } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { IUser } from "@/@types/user.type";

export default function SideBar() {
  const [user, setUser] = useState<IUser|null>(null)
  const handleFetchUserCredential = async () => {
    fetch(`https://dummyjson.com/users/16`).then(res => res.json()).then(setUser)
  }
  useEffect(()=>{
    handleFetchUserCredential()
  },[])
  const sideBarNavs = {
    header: {
      icon: <IconBuildingStore />,
      title: "Kasir App",
      subTitle: "Kelola Penjualanmu",
    },
    navigations: [
      {
        icon: <IconDashboard />,
        title: "Dashboard",
        url: "/"
      },
      {
        icon: <IconBurger />,
        title: "Menu",
        url: "/menu"
      },
      {
        icon: <IconSettingsFilled />,
        title: "Settings",
        url: "/settings"
      },
    ],
    footer: {}
  }

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const handleSidebarOpen = () => {
    setSidebarOpen(!sidebarOpen)
  }
  return (
    <div
      className={`sm:w-[${
        sidebarOpen ? "300" : "60"
      }px] h-screen bg-darkbg2 p-4 flex flex-col justify-between`}
    >
      <div>
        {/* header  */}
        <button
          onClick={handleSidebarOpen}
          className="centered gap-3 w-full font-semibold text-2xl bg-accent1 hover:bg-accent1/70 py-2 rounded-md"
        >
          <div className="*:size-10">{sideBarNavs.header.icon}</div>
          {sidebarOpen && <div>{sideBarNavs.header.title}</div>}
        </button>
        {/* nav  */}
        <div className="my-3 py-4 flex flex-col gap-y-5">
          {sideBarNavs.navigations.map((nav, index) => (
            <Link
              key={index}
              href={nav.url}
              className="flex gap-x-2 py-1.5 hover:bg-primary rounded-md px-3 hover:font-bold hover:text-white"
            >
              {nav.icon}
              {sidebarOpen && <span>{nav.title}</span>}
            </Link>
          ))}
        </div>
      </div>
      {/* footer */}
      <div className="flex justify-between text-white bg-darkbg1 border-darkline rounded-lg border p-1.5">
        {sidebarOpen && (
          <div className="flex text-sm font-medium gap-2">
            <Avatar>
              <AvatarImage src={user?.image} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p>{user && user.firstName+" "+user.lastName}</p>
              <span className="font-light text-xs text-grayfont">
                {user && user.email}
              </span>
            </div>
          </div>
        )}
        <button>
          <IconLogout />
        </button>
      </div>
    </div>
  );
}