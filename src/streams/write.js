import { createWriteStream } from "fs";
import { fileURLToPath } from "url";
import path from "path";

export const write = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  try {
    const writeStream = createWriteStream(
      path.join(__dirname, "files", "fileToWrite.txt")
    );
    process.stdin.on("data", (data) => {
      writeStream.write(data);
    });

    process.stdin.on("error", (error) => {
      throw error;
    });
  } catch (error) {
    throw new Error(error);
  }
};

write();
