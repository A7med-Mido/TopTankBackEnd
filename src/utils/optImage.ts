import sharp from "sharp";
import { writeFile } from "fs/promises";
import path from "path";

const optImage = async (imageFile: File) => {
  const buffer = Buffer.from(await imageFile.arrayBuffer());
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
    .withMetadata({ orientation: undefined })
    .toBuffer();
};


export const writeImageFile = async (id: string) => {

  const publicPath = path.join(process.cwd(), "public");


  // Generate a unique filename
  const fileName = `${Date.now()}-${id}.webp`;
  const filePath = path.join(publicPath, fileName);

    
}