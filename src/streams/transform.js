import { Transform, pipeline } from 'stream';

export const transform = async () => {

    const transform = new Transform({
        transform(chunk, encoding = 'utf8', callback) {
         const reverseChunk = chunk.toString().trim().split('').reverse().join('');
          process.stdout.write(reverseChunk);
          callback();
        }
    });

    pipeline(
        process.stdin,
        transform,
        process.stdout,
        (error) => {
            if (error) throw new Error(error);
        }
    );
};

transform();
