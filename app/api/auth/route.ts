import { NextResponse } from "next/server";
import { hashPassword } from "@/app/_lib/authUtils";
import dbConnect from "@/app/_lib/dbConnect";
import User from "@/app/_models/User";

export async function GET() {
    await dbConnect()

    const users = await User.find({}).exec()

    return new Response(JSON.stringify(users), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export async function POST(req: NextResponse) {
    await dbConnect()

    const { email, password } = await req.json()

    const hashedPassword = await hashPassword(password)

    const user = new User({ 
        email: email,
        password: hashedPassword
    })
    await user.save()

    return new Response(JSON.stringify(user), {
        status: 201,
        headers: {
            'Content-Type': 'application/json',
        },
    })

}