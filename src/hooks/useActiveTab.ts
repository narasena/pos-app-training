import { useState } from "react";

export default function useActiveTabs(tabs:string[]){
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const handleChangeTab = (tab: string) => {
    console.log(tab);
    setActiveTab(tab);
  };
  return {activeTab,handleChangeTab}
}