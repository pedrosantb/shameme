import { NextResponse  } from "next/server";
import { addUser } from "@/services/user/addUser";

export async function POST(req) {
    const body = await req.json();

    if (!body || Object.keys(body).length === 0) {
        return NextResponse.json({ error: 'Request body cannot be empty' }, { status: 400 });
    }

    try {
        const [response, status] = await addUser(body);
        return NextResponse.json({ response }, {status: status});

    } catch (err) {
        return NextResponse.json({ error: err.message }, {status: 500});
    }
}
