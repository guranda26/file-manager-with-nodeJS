import fs from "fs";
import path from "path";
import { promises as fsPromises } from "fs";
let currentDir = process.cwd();

export function cat(filePath) {
  return new Promise((resolve, reject) => {
    const fullPath = path.resolve(currentDir, filePath);
    const stream = fs.createReadStream(fullPath, { encoding: "utf8" });

    stream.on("data", (chunk) => {
      console.log(chunk);
    });

    stream.on("error", (error) => {
      console.error(`Error reading file: ${error.message}`);
      reject(error);
    });

    stream.on("end", () => {
      resolve();
    });
  });
}

export async function add(fileName) {
  const fullPath = path.resolve(currentDir, fileName);
  try {
    const fileHandle = await fsPromises.open(fullPath, "w");
    await fileHandle.close();
    console.log(`${fileName} has been created.`);
  } catch (error) {
    console.error(`Failed to create file: ${error.message}`);
  }
}

async function rn(oldPath, newPath) {
  try {
    const oldFullPath = path.resolve(currentDir, oldPath);
    const newFullPath = path.resolve(currentDir, newPath);
    await fs.rename(oldFullPath, newFullPath);
    console.log(`${oldPath} has been renamed to ${newPath}`);
  } catch (error) {
    console.error(`Failed to rename file: ${error.message}`);
  }
}

export function cp(source, destination) {
  return new Promise((resolve, reject) => {
    const sourcePath = path.resolve(currentDir, source);
    const destinationPath = path.resolve(currentDir, destination);

    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destinationPath);

    readStream.on("error", reject);
    writeStream.on("error", reject);
    readStream.pipe(writeStream).on("finish", () => {
      console.log(`${source} has been copied to ${destination}`);
      resolve();
    });
  });
}

export async function mv(source, destination) {
  const sourcePath = path.resolve(currentDir, source);
  const destinationPath = path.resolve(currentDir, destination);

  const readStream = fs.createReadStream(sourcePath);
  const writeStream = fs.createWriteStream(destinationPath);

  readStream.on("error", (error) =>
    console.error(`Read error: ${error.message}`)
  );
  writeStream.on("error", (error) =>
    console.error(`Write error: ${error.message}`)
  );

  readStream.pipe(writeStream).on("finish", async () => {
    try {
      await fs.promises.unlink(sourcePath);
      console.log(`${source} has been moved to ${destination}`);
    } catch (error) {
      console.error(`Failed to delete the original file: ${error.message}`);
    }
  });
}

export async function rm(filePath) {
  const fullPath = path.resolve(currentDir, filePath);

  try {
    await fs.unlink(fullPath);
    console.log(`${filePath} has been deleted.`);
  } catch (error) {
    console.error(`Failed to delete file: ${error.message}`);
  }
}
