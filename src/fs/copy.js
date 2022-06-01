import { readdir, stat, mkdir } from "fs/promises";
import { constants, copyFile } from "fs";
import { fileURLToPath } from 'url';
import path from "path";

export const copy = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  const setError = (error) => {
    if (error) {
      const errorMessage =
        error?.code === "EEXIST" || "ENOENT"
          ? "FS operation failed"
          : error.message;
      throw new Error(errorMessage);
    }
  };

  try {
    const folder = await stat(path.join(__dirname, "./files"));
    if (folder.isDirectory()) await mkdir(path.join(__dirname, "./files_copy"));
  } catch (error) {
    setError(error);
  }

  const folderPath = path.join(__dirname, "files");
  const files = await readdir(folderPath);

  files.forEach((file) => {
    copyFile(
      path.join(__dirname, "files", file),
      path.join(__dirname, "files_copy", file),
      constants.COPYFILE_EXCL,
      setError
    );
  });
};

copy();
