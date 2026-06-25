import type { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "~/server/cloudinary";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { image } = req.body;

    console.log("Image received:", !!image);

    const result = await cloudinary.uploader.upload(image, {
      folder: "marketplace",
    });

    console.log("Cloudinary result:", result.secure_url);

    return res.status(200).json({
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    return res.status(500).json({
      error: "Upload failed",
    });
  }
}