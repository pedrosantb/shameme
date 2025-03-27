'use client';

import React from "react";

const Hero = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-white p-6 relative gap-2">
      <h1 className="text-6xl md:text-6xl font-extrabold tracking-wide">
        Welcome to <span className="text-red-500">ShameMe</span>!
      </h1>
      <p className="text-lg md:text-3xl mt-2 text-gray-300 text-center">
        Your personal AI roastmaster. Get shamed into achieving your goals! 😈
      </p>
    </div>
  );
};

export default Hero;
