"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconGardenCartFilled, IconSearch, IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

interface IOrderItem {
  imgUrl: string;
  dishName: string;
  price: number;
  stock: number;
}

interface ICartItem extends IOrderItem {
  qty: number;
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

  const [orderCart, setOrderCart] = useState<ICartItem[]>([]);

    const cartSubTotal = orderCart.reduce((sum, curr) => sum + (curr.price * curr.qty), 0)

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
                  className="bg-formbg flex flex-col gap-1 items-center text-white hover:ring-1 hover:ring-blue-700 cursor-pointer"
                  onClick={() => {
                    setOrderCart((prevItems) => {
                      console.log("Previous Cart: ", prevItems);
                      const currentIndex = prevItems.findIndex(
                        (prev) => prev.dishName === item.dishName
                      );

                      if (currentIndex === -1) {
                        const newItem: ICartItem = { ...item, qty: 1 };
                        return [...prevItems, newItem];
                      }

                      console.log("New Cart: ", ...prevItems, item);
                      return prevItems.map((cartItem, index) =>
                        index === currentIndex
                          ? { ...cartItem, qty: cartItem.qty + 1 }
                          : cartItem
                      );
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
      {/* order sheet  */}
      <div className="bg-darkbg2 w-100 min-h-full p-6 text-white flex flex-col gap-y-5">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Order #32412</h2>

          <div className="flex items-center">
            <IconGardenCartFilled />
            <p className="p-1 size-6 centered bg-primary text-white text-xs rounded-full">
              {orderCart.length}
            </p>
          </div>
        </div>
        <div>
          <Input
            type="text"
            className="w-full"
            placeholder="Nama Pelanggan..."
          />
        </div>
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
          {currentOrderType === "Dine In" && (
            <Input type="text" placeholder="No. Meja" />
          )}
        </div>
        <div className="grid grid-cols-12 gap-x-1 gap-y-3">
          <span className="col-span-8">Item</span>
          <span className="col-span-2">Qty</span>
          <span className="col-span-2">Price</span>
          <div className="col-span-12 border-b border-white/40 w-full"></div>
          {orderCart.map((cartItem, index) => (
            <div key={index} className="contents">
              {/* <div className=""> */}
              <div className="col-span-8 flex items-center">
                <Image
                  src={cartItem.imgUrl}
                  alt={cartItem.dishName}
                  width={60}
                  height={60}
                  className="mr-3"
                />
                <div className="flex flex-col">
                  <p>{cartItem.dishName}</p>
                  <p>{cartItem.price}</p>
                </div>
              </div>
              <div className="col-span-2 w-full centered p-4 bg-formbg rounded-md border border-gray-300/40">
                {cartItem.qty}
              </div>
              <div className="col-span-2 centered p-4">
                {cartItem.qty * cartItem.price}
              </div>
              {/* </div> */}
              <div className="col-span-10 flex items-center">
                <Input type="text" placeholder="Order Note..." />
              </div>
              <div className="col-span-2 centered">
                <IconTrash className="p-0.5 size-10 text-red-400 hover:text-red-500" />
              </div>
            </div>
          ))}
          <p className="col-span-10">Discount: </p>
          <p className="col-span-2">0</p>
          <p className="col-span-10">Subtotal: </p>
          <p className="col-span-2">
            {cartSubTotal.toLocaleString("us-US", { maximumFractionDigits: 2 })}
          </p>
        </div>
        <Button className="bg-primary text-white">Continue To Payment</Button>
      </div>
    </div>
  );
}
