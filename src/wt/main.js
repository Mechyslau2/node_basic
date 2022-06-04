import { Worker } from "worker_threads";
import { cpus } from "os";
import { fileURLToPath } from "url";
import path from "path";

export const performCalculations = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  const INITIAL_VALUE = 10;
  const results = [];

  const workers = new Array(cpus().length).fill(0).map(
    (worker, ind) =>
      (worker = new Worker(path.join(__dirname, "worker.js"), {
        workerData: INITIAL_VALUE + ind,
      }))
  );

  const getWorkersResult = () =>
    new Array(workers.length).fill(0).map((item, workerInd) => {
      item = new Promise((res, rej) => {
        workers[workerInd].on("message", res);
        workers[workerInd].on("error", rej);
      });
      return item;
    });

  for await (let worker of getWorkersResult()) {
    results.push(worker);
  }

  console.log(results);
};

performCalculations();
