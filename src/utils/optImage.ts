import sharp from "sharp";

export const optImage = async (imageFile: Buffer): Promise<Buffer> => {
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
