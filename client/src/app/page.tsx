"use client";
import MainStock from "@/component/MainStock";
import { AppSelector } from "@/lib/redux/store";



export default function Home() {

  return (
    <main className=" text-black p-10">
      <div className="w-full h-full p-10">
       
            {" "}
            <MainStock />
        
      </div>
    </main>
  );
}
