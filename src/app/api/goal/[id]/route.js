import { NextResponse  } from "next/server";
import { currentUser, auth } from '@clerk/nextjs/server'

import { UpdateGoal } from "@/services/goal/updateGoal";
import { GetGoal } from "@/services/goal/getGoal";
import { AddGoal } from "@/services/goal/addGoal";
import { DeleteGoal } from "@/services/goal/deleteGoal";

export async function GET(req, { params }) {

    const { id } = params;

    const { userId } = await auth();

    if (!userId) {
      return new NextResponse.json('Unauthorized', { status: 401 })
    }

    try {
        const [response, status] = await GetGoal(id);
        return NextResponse.json({ response }, {status: status});
        
    } catch (err) {
        return NextResponse.json({ error: err.message }, {status: 500});
    }
}

export async function PUT(req, { params }) {
    const { id } = params;
    const body = await req.json();

    const { userId } = await auth();

    if (!userId) {
      return new NextResponse.json('Unauthorized', { status: 401 })
    }

    if (!body || Object.keys(body).length === 0) {
        return NextResponse.json({ error: 'Request body cannot be empty' }, { status: 400 });
    }

    try {
        const [response, status] = await UpdateGoal(id, body);
        return NextResponse.json({ response }, {status: status});

    } catch (err) {
        return NextResponse.json({ error: err.message }, {status: 500});
    }
}

export async function POST(req) {
    const body = await req.json();

    const { userId } = await auth();

    if (!userId) {
        return new NextResponse.json('Unauthorized', { status: 401 })
      }
    
    const userClerk = await currentUser();
    const primaryEmail = userClerk.emailAddresses.find(email => email.id === userClerk.primaryEmailAddressId)?.emailAddress;

    const [user] = await GetUserByEmail(primaryEmail);

    if (!body || Object.keys(body).length === 0) {
        return NextResponse.json({ error: 'Request body cannot be empty' }, { status: 400 });
    }

    try {
        const [response, status] = await AddGoal(user[0].id, body);
        return NextResponse.json({ response }, {status: status});

    } catch (err) {
        return NextResponse.json({ error: err.message }, {status: 500});
    }
}

export async function DELETE(req, { params }){
    const { id } = params;

    const { userId } = await auth();
    
    if (!userId) {
        return new NextResponse.json('Unauthorized', { status: 401 })
      }

    try {
        const [response, status] = await DeleteGoal(id);
        return NextResponse.json({ response }, {status: status});
        
    } catch (err) {
        return NextResponse.json({ error: err.message }, {status: 500});
    }
}