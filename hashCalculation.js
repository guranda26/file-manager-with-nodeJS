import crypto from "crypto";
import fs from "fs";
import path from "path";

const currentDir = process.cwd();

export async function calculateFileHash(filePath) {
  const fullPath = path.resolve(currentDir, filePath);
  const hash = crypto.createHash("sha256");
  const stream = fs.createReadStream(fullPath);

  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => {
      hash.update(chunk);
    });

    stream.on("end", () => {
      const fileHash = hash.digest("hex");
      console.log(`Hash for ${filePath}: ${fileHash}`);
      resolve(fileHash);
    });

    stream.on("error", (error) => {
      console.error(`Error reading file: ${error.message}`);
      reject(error);
    });
  });
}
