'use client'

import { IconSearch } from "@tabler/icons-react"
import { useState } from "react"

export default function MenuPage() {
    const today = new Date()

    const tabs = ["Hot Dishes", "Cold Dishes", "Soup", "Grill", "Appetizer", "Desert"]
    const [activeTab, setActiveTab] = useState(tabs[0])
    const handleChangeTab = (tab:string) => {
        console.log(tab)
        setActiveTab(tab)
    }

    return (
        <div className="bg-darkbg1 rounded-2xl p-4 min-w-full min-h-full">
            {/* header  */}
            <header className="flex justify-between items-center text-white">
                {/* resto name & date  */}
                <div>
                    <h1 className="text-2xl font-semibold">Joger Resto</h1>
                    <h3>{today.toLocaleString('en-US', {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "2-digit"
                    })}</h3>
                </div>
                {/* search bar  */}
                <div className="centered h-10 bg-formbg rounded-md overflow-hidden">
                    <div className="bg-darkbg2 size-full centered p-2">
                        <IconSearch />
                    </div>
                    <input
                        type="text"
                        name="" id=""
                        placeholder="Search food, coffee, and others..."
                        className="ml-2 outline-none w-50 h-full text-sm" />
                </div>
            </header>

            {/* tabs  */}
            <div className="flex mt-4 text-white border-b border-white/50">
                {tabs.map((tab, index) => (
                    <div key={index} onClick={()=>handleChangeTab(tab)} className={`px-3 pb-1 hover:bg-primary ${activeTab===tab ? "text-primary border-b-2 border-primary font-semibold" : ""}`}>{tab}</div>
                ))}
            </div>
        </div>
    )
}