import { NextResponse  } from "next/server";
import { GetUserGoals } from "@/services/goal/getUserGoals";

export async function GET(req, { params }) {

    const { id } = params;

    try {
        const [response, status] = await GetUserGoals(id);
        return NextResponse.json({ response }, {status: status});
        
    } catch (err) {
        return NextResponse.json({ error: err.message }, {status: 500});
    }
}