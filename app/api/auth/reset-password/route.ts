import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import crypto from "crypto";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { token, password } = await req.json();

        if (!token || !password) {
            return NextResponse.json({ message: "Invalid request data" }, { status: 400 });
        }

        // 1. Hash the incoming token
        const resetTokenHash = crypto.createHash("sha256").update(token).digest("hex");

        // 2. Find User by hashed token and check expiry
        const user = await User.findOne({
            resetToken: resetTokenHash,
            resetTokenExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
        }

        // 3. Hash new password and Save
        const hashedPassword = await bcrypt.hash(password, 12);
        user.password = hashedPassword;

        // 4. Clear reset fields
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({ message: "Password reset successful" });
    } catch (error: any) {
        console.error("Reset Password API error:", error.message);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
