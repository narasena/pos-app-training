"use client";

import { useState } from "react";

interface ITabsProps {
  titles: string[];
  activeTab: string;
  handleChangeTab: (tab: string) => void;
}

export default function Tabs(props: ITabsProps) {
  
  
  return (
    <div className="flex mt-4 text-white border-b border-white/50">
      {props.titles.map((tab, index) => (
        <div
          key={index}
          onClick={()=>props.handleChangeTab}
          className={`px-3 pb-1 hover:bg-primary cursor-pointer ${
            props.activeTab === tab
              ? "text-primary border-b-2 border-primary font-semibold"
              : ""
          }`}
        >
          {tab}
        </div>
      ))}
    </div>
  );
}
