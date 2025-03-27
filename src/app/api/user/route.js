import { NextResponse  } from "next/server";
import { addUser } from "@/services/user/addUser";

export async function POST(req) {
    const { data } = await req.json();

    if (!data || Object.keys(data).length === 0) {
        return NextResponse.json({ error: 'Request body cannot be empty' }, { status: 400 });
    }

    const newUser = {
        email: data.email_addresses[0].email_address,
        username: data.username ? data.username : `${data.first_name} ${data.last_name}`,
        phone: data.phone_numbers[0] ? data.phone_numbers[0] : null
    }

    console.log(newUser);

    try {
        const [response, status] = await addUser(newUser);
        return NextResponse.json({ response }, {status: status});

    } catch (err) {
        return NextResponse.json({ error: err.message }, {status: 500});
    }
}
