import { NextResponse  } from "next/server";
import { UpdateUser } from "@/services/user/updateUser";
import { GetUser } from "@/services/user/getUser";

export async function GET(req, { params }) {

    const { id } = params;

    try {
        const [response, status] = await GetUser(id);
        return NextResponse.json({ response }, {status: status});
        
    } catch (err) {
        return NextResponse.json({ error: err.message }, {status: 500});
    }
}

export async function PUT(req, { params }) {
    const { id } = params;
    const body = await req.json();

    console.log(id, body);

    if (!body || Object.keys(body).length === 0) {
        return NextResponse.json({ error: 'Request body cannot be empty' }, { status: 400 });
    }

    try {
        const [response, status] = await UpdateUser(id, body);
        return NextResponse.json({ response }, {status: status});

    } catch (err) {
        return NextResponse.json({ error: err.message }, {status: 500});
    }
}