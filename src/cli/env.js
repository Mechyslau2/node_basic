export const parseEnv = () => {
  const result = process.argv
    .filter((item) => item.match(/^RSS_.+/))
    .map(str => `${str}`)
    .join("; ");
  console.log(result);
};

parseEnv();
