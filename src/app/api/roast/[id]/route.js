import { NextResponse  } from "next/server";
import { currentUser, auth } from '@clerk/nextjs/server'


import { deleteRoast } from "@/services/roast/deleteRoast";


export async function DELETE(req, { params }){
    const { id } = params;

    const { userId } = await auth();
    
    if (!userId) {
        return new NextResponse.json('Unauthorized', { status: 401 })
      }

    try {
        const [response, status] = await deleteRoast(id);
        return NextResponse.json({ response }, {status: status});
        
    } catch (err) {
        return NextResponse.json({ error: err.message }, {status: 500});
    }
}