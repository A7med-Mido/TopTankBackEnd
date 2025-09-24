import sharp from "sharp";

export const optImage = async (imageFile: File) => {
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


