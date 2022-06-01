import { open } from "fs/promises";
import { fileURLToPath } from 'url';
import path from "path";

export const create = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const filePath = path.resolve(__dirname, "files", "fresh.txt");
  let file = null;

  try {
    file = await open(filePath, "wx");
    file.appendFile("I am fresh and young");
  } catch (error) {
    const errorMessage =
      error?.code === "EEXIST" ? "FS operation failed" : error.message;
    throw new Error(errorMessage);
  } finally {
    await file?.close();
  }
};

create();
