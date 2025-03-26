import { NextResponse  } from "next/server";
import { updateUser } from "@/services/user/updateUser";
import { ByEmail } from "@/services/user/getUserByEmail";

import { currentUser, auth } from '@clerk/nextjs/server'

export async function GET(req, { params }) {

    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json('Unauthorized', { status: 401 })
    }

    const primaryEmail = userClerk.emailAddresses.find(email => email.id === userClerk.primaryEmailAddressId)?.emailAddress;

    try {
        const [response, status] = await getUserByEmail(primaryEmail);
        return NextResponse.json({ response }, {status: status});
        
    } catch (err) {
        return NextResponse.json({ error: err.message }, {status: 500});
    }
}


// Needs to add verification
export async function PUT(req, { params }) {
    const { id } = params;
    const body = await req.json();


    if (!body || Object.keys(body).length === 0) {
        return NextResponse.json({ error: 'Request body cannot be empty' }, { status: 400 });
    }

    try {
        const [response, status] = await updateUser(id, body);
        return NextResponse.json({ response }, {status: status});

    } catch (err) {
        return NextResponse.json({ error: err.message }, {status: 500});
    }
}