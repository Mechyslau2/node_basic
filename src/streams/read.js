import { createReadStream } from "fs";
import { fileURLToPath } from "url";
import path from "path";

export const read = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  try {
    const content = createReadStream(
      path.join(__dirname, "files", "fileToRead.txt"),
      { encoding: "utf8" }
    );
    content.on("data", (data) => {
      process.stdout.write(data);
    });

    content.on("error", (error) => {
      throw error;
    });
  } catch (error) {
    throw new Error(error);
  }
};

read();
