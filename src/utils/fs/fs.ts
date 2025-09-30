import { optImage } from "./optImage.fs";
import { writeFile, unlink } from "fs/promises";
import path from "path";



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

    return true
  } catch (error: any) {
    if (error.code === "ENOENT") {
      return false
    }
    throw error; // rethrow if it’s a different error
  }
};
