import fsPromises, { lstat } from "fs/promises";
import { fileURLToPath } from 'url';
import path from "path";

export const rename = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  try {
    const targetFile = await lstat(
      path.join("./files", "properFilename.md")
    );
    if (targetFile.isFile()) {
      throw new Error("FS operation failed");
    }
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  try {
    await lstat(path.join(__dirname, "files", "wrongFilename.txt"));
    fsPromises.rename(
      path.join(__dirname, "files", "wrongFilename.txt"),
      path.join(__dirname, "files", "properFilename.md")
    );
  } catch (error) {
    const errorMessage =
      error?.code === "ENOENT" ? "FS operation failed" : error.message;
    throw new Error(errorMessage);
  }
};

rename();
