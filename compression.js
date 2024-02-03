import fs from "fs";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import path from "path";

export function compress(sourceFilePath, destinationFilePath) {
  const source = path.resolve(sourceFilePath);
  const destination = path.resolve(destinationFilePath);

  const readStream = fs.createReadStream(source);
  const writeStream = fs.createWriteStream(destination);
  const brotliCompressStream = createBrotliCompress();

  readStream
    .pipe(brotliCompressStream)
    .pipe(writeStream)
    .on("finish", () => {
      console.log(`File successfully compressed: ${destination}`);
    })
    .on("error", (error) => {
      console.error(`Compression error: ${error}`);
    });
}

export function decompress(sourceFilePath, destinationFilePath) {
  const source = path.resolve(sourceFilePath);
  const destination = path.resolve(destinationFilePath);

  const readStream = fs.createReadStream(source);
  const writeStream = fs.createWriteStream(destination);
  const brotliDecompressStream = createBrotliDecompress();

  readStream
    .pipe(brotliDecompressStream)
    .pipe(writeStream)
    .on("finish", () => {
      console.log(`File successfully decompressed: ${destination}`);
    })
    .on("error", (error) => {
      console.error(`Decompression error: ${error}`);
    });
}
