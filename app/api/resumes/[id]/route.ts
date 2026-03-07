import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Resume from "@/models/Resume";
import User from "@/models/User";

// GET a specific resume
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const dbUser = await User.findOne({ email: session.user.email });
        if (!dbUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const resume = await Resume.findOne({
            _id: id,
            userId: dbUser._id,
        });

        if (!resume) {
            return NextResponse.json({ message: "Resume not found" }, { status: 404 });
        }

        return NextResponse.json(resume);
    } catch (error) {
        console.error("GET Resume Error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

// PUT update a specific resume
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { _id, __v, ...updateData } = await req.json();

        await dbConnect();

        const dbUser = await User.findOne({ email: session.user.email });
        if (!dbUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const updatedResume = await Resume.findOneAndUpdate(
            { _id: id, userId: dbUser._id },
            { $set: updateData },
            { new: true, returnDocument: 'after' }
        );

        if (!updatedResume) {
            return NextResponse.json({ message: "Resume not found" }, { status: 404 });
        }

        return NextResponse.json(updatedResume);
    } catch (error) {
        console.error("PUT Resume Error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

// DELETE a specific resume
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const dbUser = await User.findOne({ email: session.user.email });
        if (!dbUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const deletedResume = await Resume.findOneAndDelete({
            _id: id,
            userId: dbUser._id,
        });

        if (!deletedResume) {
            return NextResponse.json({ message: "Resume not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Resume deleted successfully" });
    } catch (error) {
        console.error("DELETE Resume Error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
