import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// 1. Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
        }

        // 2. Convert File to Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // 3. Upload to Cloudinary using a Promise wrapper
        const uploadResponse = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "resume-ai-photos", // Organizes photos in a folder
                    resource_type: "auto",
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );

            uploadStream.end(buffer);
        });

        const result = uploadResponse as any;
        console.log(`[Cloudinary] Upload success: ${result.secure_url}`);

        // 4. Return the permanent Secure URL
        return NextResponse.json({ url: result.secure_url });

    } catch (error: any) {
        console.error("Cloudinary Upload Error:", error.message);
        return NextResponse.json(
            { message: "Failed to upload to Cloudinary. Check your API Keys." },
            { status: 500 }
        );
    }
}
