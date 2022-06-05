import { lstat, open } from "fs/promises";
import { fileURLToPath } from 'url';
import path from 'path';

export const calculateHash = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  try {
    await lstat(path.join(__dirname, "files","fileToCalculateHashFor.txt"));
  } catch (error) {
    const errorMessage =
      error?.code === "ENOENT" ? "FS operation failed" : error.message;
    throw new Error(errorMessage);
  }

  const { createHash } = await import("crypto");
  const hash = createHash("sha256");

  const hashFile = await open(path.join(__dirname,"files","fileToCalculateHashFor.txt"));
  const content = await hashFile.readFile("utf8");
  const update = await hash.update(content);
  const hexResult = await update.digest("hex");
  hashFile?.close();

  console.log(hexResult);
  return hexResult;
};

calculateHash();
