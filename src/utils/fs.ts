import sharp from "sharp";
import { writeFile, unlink } from "fs/promises";
import path from "path";

const optImage = async (imageFile: Buffer): Promise<Buffer> => {
  const buffer = imageFile
  return await sharp(buffer)
    .resize({
      width: 400,
      height: 400,
      fit: "cover",
      position: "center",
      withoutEnlargement: true,
    })
    .webp({
      quality: 65,       
      effort: 6,          
      smartSubsample: true,
      nearLossless: true,
    })
    .toBuffer();
};


export const writeImageFile = async ({ id, imageFile }:{ id: string, imageFile: Buffer }) => {

  const image = await optImage(imageFile)
  // Generate a unique filename
  const publicPath = path.join(process.cwd(), "public");
  const fileName = `${Date.now()}-${id}.webp`;
  const filePath = path.join(publicPath, fileName);

  await writeFile(filePath, image)

  return `/public/${fileName}`
}



export const removeImageFile = async (filePath: string) => {
  try {
    // filePath comes like: "/public/1695748103123-abc123.webp"
    // Convert it into absolute path
    if(!filePath) return true
    const absolutePath = path.join(process.cwd(), filePath);

    // Attempt to delete
    await unlink(absolutePath);

    console.log(`✅ Image removed: ${absolutePath}`);
    return true
  } catch (error: any) {
    if (error.code === "ENOENT") {
      return false
    }
    throw error; // rethrow if it’s a different error
  }
};
