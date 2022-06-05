import { parentPort, workerData } from "worker_threads";

export const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

export const sendResult = () => {
  try {
    const result = nthFibonacci(workerData);
    parentPort.postMessage({
      status: 'resolved',
      data: result,
    });
  } catch (error) {
    parentPort.postMessage({
      status: 'error',
      data: null,
    });
  }
};

sendResult();
