import { open } from "fs/promises";
import { fileURLToPath } from 'url';
import path from "path";

export const read = async () => {
    let readableFile = null;
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

  try {
      readableFile = await open(path.join(__dirname, 'files', 'fileToRead.txt'));
      const readableFileContent = await readableFile.readFile('utf8');
      console.log(readableFileContent);
  } catch (error) {
    const errorMessage =
      error?.code === "ENOENT" ? "FS operation failed" : error.message;
    throw new Error(errorMessage);
  } finally {
      await readableFile?.close();
  }
};

read();
