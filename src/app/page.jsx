'use client'

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

import AddRoast from "@components/AddRoast";
import Hero from "@components/Hero";
import Card from "@components/Card"; 
import Bubble from "@components/Bubble"; 

import { getAllRoastsService } from "@services/api/roast";

export default function Home() {
  const [roastList, setRoastList] = useState([]);
  const [reload, setReload] = useState(1);
  const { isLoaded, user } = useUser();

  
  useEffect(() => {
    if (!isLoaded || !user) return;

    const fetchRoasts = async () => {
      try {
        const response = await getAllRoastsService();
        console.log('Fetched roasts:', response);


        setRoastList(response);
        console.log(roastList);

      } catch (err) {
        console.error("Error fetching roasts:", err.message);
      }
    };

    fetchRoasts();
  }, [isLoaded, user, reload]);


  return (
<div className="w-full h-screen flex flex-col items-center my-12">
  <div className="w-full h-1/4 flex flex-col items-center">
    <Hero className="mx-10 h-full" />
  </div>

  <div className="w-2/3 flex p-4 flex-grow">
    {roastList.length > 0 ? 
      <Bubble roast={roastList.slice(-1)[0]} />
      : (
        <p>No roasts yet</p>
      )}
  </div>

  <div className="w-full flex items-center justify-center p-6">
    <AddRoast reload={reload} setReload={setReload} />
  </div>
</div>
  );
}
