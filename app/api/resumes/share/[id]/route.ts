import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Resume from "@/models/Resume";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await dbConnect();

        const resume = await Resume.findByIdAndUpdate(
            id,
            { $inc: { views: 1 } },
            { new: true }
        ).select("-userId");

        if (!resume) {
            return NextResponse.json({ message: "Resume not found" }, { status: 404 });
        }

        return NextResponse.json(resume);
    } catch (error) {
        console.error("Public Share API Error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
