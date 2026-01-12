'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function FormPage() {
  const [userName, setUserName] = useState("")
  return (
    <div>
      <form>
        <div className="p-3 bg-primary text-white max-w-32">
          <Input
            id="username"
            type="text"
            placeholder="username"
            className="w-full"
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input id="password" type="password" className="w-full" />
        </div>
        <Button type="submit" onClick={()=>console.log(userName)}>Submit</Button>
      </form>
    </div>
  );
}
