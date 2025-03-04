import { NextResponse  } from "next/server";
import { currentUser, auth } from '@clerk/nextjs/server';

import { addGoal } from "@services/goal/addGoal";
import { getUserByEmail } from "@services/user/getUserByEmail";

export async function POST(req) {
    const body = await req.json();

    const { userId } = await auth();

    if (!userId) {
        return new NextResponse.json('Unauthorized', { status: 401 })
      }
    
    const userClerk = await currentUser();
    const primaryEmail = userClerk.emailAddresses.find(email => email.id === userClerk.primaryEmailAddressId)?.emailAddress;

    const [user] = await getUserByEmail(primaryEmail);


    if (!body || Object.keys(body).length === 0) {
        return NextResponse.json({ error: 'Request body cannot be empty' }, { status: 400 });
    }

    try {
        const [response, status] = await addGoal(user[0].id, body.title);
        return NextResponse.json({ response }, {status: status});        
    } catch (err) {
        
        return NextResponse.json({ error: err.message }, {status: 500});
    }
}