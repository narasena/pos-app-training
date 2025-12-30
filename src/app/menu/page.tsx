"use client";

import { Button } from "@/components/ui/button";
import { IconSearch } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

interface IOrderItem {
  imgUrl: string;
  dishName: string;
  price: number;
  stock: number;
  qty: number
}

export default function MenuPage() {
  const today = new Date();

  const tabs = [
    "Hot Dishes",
    "Cold Dishes",
    "Soup",
    "Grill",
    "Appetizer",
    "Desert",
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const handleChangeTab = (tab: string) => {
    console.log(tab);
    setActiveTab(tab);
  };

  const menus = [
    {
      type: "Hot Dishes",
      items: [
        {
          imgUrl:
            "https://mykoreankitchen.com/wp-content/uploads/2016/04/2.-Jjampong-500x375.jpg",
          dishName: "Spicy seasoned seafood noodles",
          price: 2.29,
          stock: 20,
        },
        {
          imgUrl:
            "https://www.cucinabyelena.com/wp-content/uploads/2025/01/Creamy-Mushroom-Pasta-Recipe-21.jpg",
          dishName: "Salted pasta with mushroom sauce",
          price: 2.69,
          stock: 11,
        },
        {
          imgUrl:
            "https://www.marionskitchen.com/wp-content/uploads/2019/12/Mushroom-Dumpling-Hot-Sour-Soup2.jpg",
          dishName: "Beef dumpling in hot and sour sauce",
          price: 2.99,
          stock: 16,
        },
      ],
    },
    {
      type: "Cold Dishes",
      items: [
        {
          imgUrl: "",
          dishName: "Cold spicy seasoned seafood noodles",
          price: 2.29,
          stock: 20,
        },
        {
          imgUrl: "",
          dishName: "Cold salted pasta with mushroom sauce",
          price: 2.69,
          stock: 11,
        },
        {
          imgUrl: "",
          dishName: "Cold beef dumpling in hot and sour sauce",
          price: 2.99,
          stock: 16,
        },
      ],
    },
  ];

  const [orderCart, setOrderCart] = useState<IOrderItem[]>([]);

  const orderType = ["Dine In", "To Go", "Delivery"];
  const [currentOrderType, setCurrentOrderType] = useState(orderType[0]);

  return (
    <div className="bg-darkbg1 rounded-2xl min-w-full min-h-full flex gap-2 overflow-hidden">
      <div className="p-4 flex-1">
        {/* header  */}
        <header className="flex justify-between items-center text-white">
          {/* resto name & date  */}
          <div>
            <h1 className="text-2xl font-semibold">Joger Resto</h1>
            <h3>
              {today.toLocaleString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "2-digit",
              })}
            </h3>
          </div>
          {/* search bar  */}
          <div className="centered h-10 bg-formbg rounded-md overflow-hidden">
            <div className="bg-darkbg2 size-full centered p-2">
              <IconSearch />
            </div>
            <input
              type="text"
              name=""
              id=""
              placeholder="Search food, coffee, and others..."
              className="ml-2 outline-none w-50 h-full text-sm"
            />
          </div>
        </header>

        {/* tabs  */}
        <div className="flex mt-4 text-white border-b border-white/50">
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => handleChangeTab(tab)}
              className={`px-3 pb-1 hover:bg-primary ${
                activeTab === tab
                  ? "text-primary border-b-2 border-primary font-semibold"
                  : ""
              }`}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* dishes cards  */}
        <div className="px-4 mt-4">
          <div className="flex items-center justify-between">
            <h1>Choose Dishes</h1>
            <select name="" id="">
              <option value="">Dine In</option>
              <option value="">Take Away</option>
            </select>
          </div>
          <div className="grid grid-cols-5 gap-5">
            {menus
              .find((menu) => menu.type === activeTab)
              ?.items.map((item, index) => (
                <div
                  key={index}
                  className="bg-formbg flex flex-col gap-1 items-center text-white"
                  onClick={() => {
                    setOrderCart((prevItems) => {
                      console.log("Previous Cart: ", prevItems);
                      const currentIndex = prevItems.findIndex(prev => prev.dishName === item.dishName)
                      if(currentIndex === -1){
                        item[qty] = 0
                      }
                       
                      
                      console.log("New Cart: ", ...prevItems, item);
                      return [...prevItems, item];
                    });
                  }}
                >
                  {item.imgUrl !== "" ? (
                    <Image
                      src={item.imgUrl}
                      alt={item.dishName}
                      width={132}
                      height={132}
                    />
                  ) : (
                    // fallback
                    <div className="size-33 rounded-full bg-primary"></div>
                  )}
                  <h3 className="centered">{item.dishName}</h3>
                  <p>{item.price}</p>
                  <p>{item.stock} Bowls available</p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="bg-darkbg2 w-100 min-h-full p-6 text-white flex flex-col gap-y-5">
        <h2 className="text-2xl font-semibold">Order #32412</h2>
        <div className="flex gap-2 items-center">
          {orderType.map((item, index) => (
            <Button
              variant={currentOrderType === item ? "default" : "ghost"}
              key={index}
              onClick={() => setCurrentOrderType(item)}
            >
              {item}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-12 gap-x-1 gap-y-3">
          <span className="col-span-8">Item</span>
          <span className="col-span-2">Qty</span>
          <span className="col-span-2">Price</span>
          <div className="col-span-12 border-b border-white/40 w-full"></div>
        </div>
      </div>
    </div>
  );
}
