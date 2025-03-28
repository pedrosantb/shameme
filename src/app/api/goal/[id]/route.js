import { NextResponse  } from "next/server";
import { currentUser, auth } from '@clerk/nextjs/server'

import { updateGoal } from "@/services/goal/updateGoal";
import { getGoal } from "@/services/goal/getGoal";

import { deleteGoal } from "@/services/goal/deleteGoal";

export async function GET(req, { params }) {

    const { id } = await params;

    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json('Unauthorized', { status: 401 })
    }

    try {
        const [response, status] = await getGoal(id);
        return NextResponse.json({ response }, {status: status});
        
    } catch (err) {
        return NextResponse.json({ error: err.message }, {status: 500});
    }
}

export async function PUT(req, { params }) {
    const { id } = await params;
    const body = await req.json();

    const { userId } = await auth();

    if (!userId) {
      return new NextResponse.json('Unauthorized', { status: 401 })
    }

    if (!body || Object.keys(body).length === 0) {
        return NextResponse.json({ error: 'Request body cannot be empty' }, { status: 400 });
    }

    try {
        const [response, status] = await updateGoal(id, body);
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
        const [response, status] = await deleteGoal(id);
        return NextResponse.json({ response }, {status: status});
        
    } catch (err) {
        return NextResponse.json({ error: err.message }, {status: 500});
    }
}