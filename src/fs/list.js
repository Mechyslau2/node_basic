import { readdir } from "fs/promises";
import { fileURLToPath } from 'url';
import path from "path";

export const list = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  try {
    const files = await readdir(path.join(__dirname, "files"));
    console.log(files);
  } catch (error) {
    const errorMessage =
      error?.code === "ENOENT" ? "FS operation failed" : error.message;
      throw new Error(errorMessage);
  }
};

list();
