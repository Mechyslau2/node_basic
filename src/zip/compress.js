import { createReadStream, createWriteStream } from "fs";
import { rm, lstat } from "fs/promises";
import { pipeline } from "stream";
import { fileURLToPath } from "url";
import path from "path";
import zlib from "zlib";

export const compress = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  try {
    const file = await lstat(path.join(__dirname, "files", "archive.gz"));
    if (file.isFile()) {
      throw new Error("The archive is already created");
    }
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  try {
    await lstat(path.join(__dirname, "files", "fileToCompress.txt"));
  } catch (error) {
    if (error.code === "ENOENT")
      throw new Error("The fileToCompress is not found");
  }

  const readStream = createReadStream(
    path.join(__dirname, "files", "fileToCompress.txt")
  );
  const zip = zlib.createGzip();
  const writeStream = createWriteStream(
    path.join(__dirname, "files", "archive.gz")
  );

  const deleteOriginFile = async () => {
    try {
      await rm(path.join(__dirname, "files", "fileToCompress.txt"));
    } catch (error) {
      throw new Error(error.code);
    }
  };

  writeStream.on("finish", () => {
    deleteOriginFile();
  });

  pipeline(readStream, zip, writeStream, (error) => {
    if (error) throw new Error(error);
  });
};

compress();
