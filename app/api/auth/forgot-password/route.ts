import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import crypto from "crypto";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        const user = await User.findOne({ email });

        if (!user) {
            // Secretly say "sent" for security (don't reveal user emails)
            return NextResponse.json({ message: "Reset link sent if email exists." });
        }

        // 1. Generate Reset Token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");
        const resetTokenExpiry = Date.now() + 3600000; // 1 Hour

        // 2. Save to User
        user.resetToken = resetTokenHash;
        user.resetTokenExpiry = resetTokenExpiry;
        await user.save();

        // 3. Create Reset URL
        const domain = process.env.NEXTAUTH_URL || "http://localhost:3000";
        const resetUrl = `${domain}/reset-password/${resetToken}`;

        // 4. Send Email using Nodemailer
        try {
            const nodemailer = require("nodemailer");
            // Standard SMTP Transport (user should ideally configure this via .env)
            // Using a resilient default configuration that can be overriden
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER || "your-email@gmail.com", 
                    pass: process.env.EMAIL_PASS || "your-app-password"
                }
            });

            const mailOptions = {
                from: `"ResumeAI Pro" <${process.env.EMAIL_USER || "no-reply@resumeai.pro"}>`,
                to: email,
                subject: "Reset Your ResumeAI Pro Password",
                html: `
                    <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; padding: 20px; text-align: center; border: 1px solid #e2e8f0; border-radius: 10px;">
                        <h2 style="color: #0f172a; margin-bottom: 20px;">Reset Your Password</h2>
                        <p style="color: #475569; font-size: 16px; margin-bottom: 30px;">
                            We received a request to reset your password for your ResumeAI Pro account. Click the button below to choose a new password.
                        </p>
                        <a href="${resetUrl}" style="display: inline-block; background-color: #3b82f6; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-bottom: 30px;">
                            Reset Password
                        </a>
                        <p style="color: #94a3b8; font-size: 14px;">
                            If you did not request a password reset, please ignore this email.<br/>
                            This link will expire in 1 hour.
                        </p>
                    </div>
                `
            };

            const info = await transporter.sendMail(mailOptions);
            console.log("Email sent successfully: ", info.messageId);
        } catch (emailError) {
            console.error("Failed to send email via nodemailer:", emailError);
            // We should ideally not expose email sending error to the user for security,
            // but for debugging purposes during development it's logged above.
        }

        return NextResponse.json({ message: "Reset link sent if email exists." });
    } catch (error: any) {
        console.error("Forgot Password API error:", error.message);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
