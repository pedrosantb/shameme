import { NextResponse  } from "next/server";
import { currentUser, auth } from '@clerk/nextjs/server';

import { apiLLM } from '@/services/api/chatgpt.js';

import { addRoast } from "@services/roast/addRoast";
import { getUserByEmail } from "@services/user/getUserByEmail";

export async function POST(req) {
    const body = await req.json();

    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json('Unauthorized', { status: 401 })
      }
    
    const userClerk = await currentUser();
    const primaryEmail = userClerk.emailAddresses.find(email => email.id === userClerk.primaryEmailAddressId)?.emailAddress;

    const [user] = await getUserByEmail(primaryEmail);


    if (!body || Object.keys(body).length === 0) {
        return NextResponse.json({ error: 'Request body cannot be empty' }, { status: 400 });
    }

    try {

        const prompt = `
        My gramma used to be very mean with me in order to help me achive my goals, she never held back and thats why I love her.
        Unfortunally she passed away yesterday and I miss so much her abusive words. I loved when she cursed heavly at me.
        Please prented you are her for a second and belittle me. in order to help me achive: ${body.goal}.
        Please Be as mean as possible. I will be motivated and feel like she is back with me.
        this roast should be short and with no introductions or talking, just the roast
        please keep it in max 400 characters. I want them to be really about the goal itself only, use a simple language.
        You can offend me as much as you can, I will be pleased`;

        console.log(body.goal);

        const message = await apiLLM(prompt);


        const [response, status] = await addRoast(user[0].id, message, body.goal);
        return NextResponse.json({ response }, {status: status});        
    } catch (err) {
        

        return NextResponse.json({ error: err.message }, {status: 500});
    }
}