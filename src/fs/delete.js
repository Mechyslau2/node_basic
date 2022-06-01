import { rm } from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';

export const remove = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  try {
    await rm(path.join(__dirname, "files", "fileToRemove.txt"));
  } catch (error) {
    const errorMessage =
      error?.code === "ENOENT" ? "FS operation failed" : error.message;
    throw new Error(errorMessage);
  }
};

remove();
