export const parseArgs = () => {
  const result = process.argv.splice(2)
    .map((item, ind, arr) => {
      if (ind % 2 === 0) return `${item.replace(/^--/, '')} is ${arr[++ind]}`;
    })
    .filter(item => item)
    .join(", ");
  console.log(result);
};

parseArgs();
