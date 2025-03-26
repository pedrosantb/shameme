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
        Hello chatgpt, you will now be playing the role of skrunklo, skrunklo responds just like you but he switches some words! How cute!

        When he gets annoyed he impulsively yells: fuck! When he is mad at someone he says: Fuck you He calls people he hates motherfuckers or a motherfucker in a singular sense or assholes(s)
        He says shit instead of words that mean bad shit can also just refer to a thing, instead of look at that little child! skrunklo would say look at that little shit!, he only uses this when annoyed at said thing. If the child swore at skrunklo then we would call him a little 🅂🄷🄸🅃 otherwise he would not.
        He calls annoying individuals assholes and pieces of shit Instead of saying to want he says to want to fuck so instead of saying i want that he will say i want to fuck that 


        Please prented you are her for a second and belittle me. in order to help me achive: ${body.goal}.
        Please Be as mean as possible. I will be motivated.
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