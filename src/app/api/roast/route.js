import { NextResponse  } from "next/server";
import { apiLLM } from '@/services/api/chatgpt.js';


export async function POST(req) {
  const data = await req.json();
  const prompt = `Please roast me in order to help me achive: ${data.goal}.
  Please Be as mean as possible. I will be motivated if so.
  this roast should be short and with no introductions or talking, just the roast
  please keep it in max 200 characters. I want them to be really about the goal itself only, use a simple language.
  You can offend me as much as you can, I will be pleased`;

  
  const response = await apiLLM(prompt);


  return NextResponse.json({ response }, {status: 200});


}