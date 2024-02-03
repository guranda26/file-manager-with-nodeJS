import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let currentDir = process.cwd();

export async function listDirectoryContents() {
  try {
    const files = await fs.readdir(currentDir, { withFileTypes: true });
    const dirs = files
      .filter((file) => file.isDirectory())
      .map((dir) => dir.name)
      .sort();
    const nonDirs = files
      .filter((file) => !file.isDirectory())
      .map((file) => file.name)
      .sort();

    console.log("Directories:");
    dirs.forEach((dir) => console.log(`[Dir] ${dir}`));
    console.log("Files:");
    nonDirs.forEach((file) => console.log(`[File] ${file}`));
  } catch (error) {
    console.error("Failed to read directory contents:", error);
  }
}
export async function goUp() {
  const parentDir = path.resolve(currentDir, "..");
  const rootDir = path.parse(currentDir).root;

  if (currentDir !== rootDir) {
    currentDir = parentDir;
    console.log(`Moved up to ${currentDir}`);
  } else {
    console.log("You are already at the root directory.");
  }
}

export async function changeDirectory(targetPath) {
  const newPath = path.resolve(currentDir, targetPath);
  try {
    const stats = await fs.stat(newPath);
    if (!stats.isDirectory()) {
      console.error(`${targetPath} is not a directory.`);
      return;
    }
    currentDir = newPath;
    console.log(`Now in ${newPath}`);
  } catch (error) {
    console.error(`Failed to change directory: ${error.message}`);
  }
}

export function getCurrentDirectory() {
  return currentDir;
}
