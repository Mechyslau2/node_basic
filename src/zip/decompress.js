import { createReadStream, createWriteStream } from "fs";
import { lstat, rm } from "fs/promises";
import { pipeline } from "stream";
import { fileURLToPath } from "url";
import path from "path";
import zlib from "zlib";

export const decompress = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  try {
    await lstat(path.join(__dirname, "files", "archive.gz"));
  } catch (error) {
    if (error.code === "ENOENT") throw new Error("The zippedFile is not found");
  }

  try {
    const unZippedFile = await lstat(
      path.join(__dirname, "files", "fileToCompress.txt")
    );
    if (unZippedFile.isFile()) {
      throw new Error("The fileToCompress.txt is already exists");
    }
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  const readStream = createReadStream(
    path.join(__dirname, "files", "archive.gz")
  );
  const upZip = zlib.createUnzip();
  const writeStream = createWriteStream(
    path.join(__dirname, "files", "fileToCompress.txt")
  );

  const deleteGzipFile = async () => {
    try {
      await rm(path.join(__dirname, "files", "archive.gz"));
    } catch (error) {
      throw new Error(error.code);
    }
  };

  writeStream.on("finish", () => {
    deleteGzipFile();
  });

  pipeline(readStream, upZip, writeStream, (error) => {
    if (error) throw new Error(`Error: ${error}`);
  });
};

decompress();
