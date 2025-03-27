'use client'

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

import AddRoast from "@components/AddRoast";
import Hero from "@components/Hero";
import Bubble from "@components/Bubble"; 

import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'; 

import { getAllRoastsService } from "@services/api/roast";

export default function Home() {
  const [roastList, setRoastList] = useState([]);
  const [reload, setReload] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);  // Track the current roast index
  const { isLoaded, user } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;

    const fetchRoasts = async () => {
      try {
        const response = await getAllRoastsService();
        console.log('Fetched roasts:', response);

        setRoastList(response);

        // Set the current index to the last item after fetching
        setCurrentIndex(response.length - 1);

      } catch (err) {
        console.error("Error fetching roasts:", err.message);
      }
    };

    fetchRoasts();
  }, [isLoaded, user, reload]);

  // Navigate to the previous roast
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  // Navigate to the next roast
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < roastList.length - 1 ? prevIndex + 1 : prevIndex));
  };

  return (
    <div className="w-full h-screen flex flex-col items-center my-12">
      <div className="w-full h-1/4 flex flex-col items-center">
        <Hero className="mx-10 h-full" />
      </div>

      <div className="w-2/3 flex items-center justify-around p-6">
        {currentIndex > 0 && (
          <button onClick={handlePrevious} className="px-8 py-2 mr-4 flex flex-grow gap-2 items-center text-xl">
            <FaArrowCircleLeft /> Previous
          </button>
        )}

        {currentIndex < roastList.length - 1 && (
          <button onClick={handleNext} className="x-8 py-2 mr-4 flex flex-grow gap-2 items-center text-xl justify-end">
            Next <FaArrowCircleRight />
          </button>
        )
        
        }
      </div>


      <div className="w-2/3 flex p-4  h-content">
        {roastList.length > 0 ? (
          <Bubble roast={roastList[currentIndex]} /> // Display the roast based on currentIndex
        ) : (
          <Bubble roast={ {
            message: 'Tell me your next goal. I promise I wont hold back in shaming you into fulfilling your true potential. I might be cruel but its for your own benefit!',
            goal: 'change your life'
          } }  />
        )}
      </div>

      <div className="w-full flex items-center justify-center p-6">
        <AddRoast reload={reload} setReload={setReload} />
      </div>
    </div>
  );
}
