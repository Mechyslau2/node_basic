import { spawn } from "child_process";
import { fileURLToPath } from "url";
import path from "path";

export const spawnChildProcess = async (args) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  const child = spawn("node", [
    path.join(__dirname, "files", "script.js"),
    ...args,
  ]);

  process.stdin.on("data", (data) => {
    child.stdin.write(data);
  });

  child.stdout.on("data", (data) => {
    process.stdout.write(`Received a string from the child: ${data} \n ${data}`);
  });
};

spawnChildProcess(process.argv.slice(2));
