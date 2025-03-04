import { NextResponse  } from "next/server";
import { currentUser, auth } from '@clerk/nextjs/server'

import { getUserGoals } from "@services/goal/getUserGoals";
import { getUserByEmail } from "@services/user/getUserByEmail"


export async function GET(req) {

    const { userId } = await auth();

    if (!userId) {
      return new NextResponse.json('Unauthorized', { status: 401 })
    }
  
    const userClerk = await currentUser();
    const primaryEmail = userClerk.emailAddresses.find(email => email.id === userClerk.primaryEmailAddressId)?.emailAddress;

    const [user] = await getUserByEmail(primaryEmail);

    try {
        const [response, status] = await getUserGoals(user[0].id);
        return NextResponse.json({ response }, {status: status});
        
    } catch (err) {
        return NextResponse.json({ error: err.message }, {status: 500});
    }
}