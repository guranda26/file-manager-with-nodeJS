import path from "path";
import { promises as fs } from "fs";
import {
  listDirectoryContents,
  changeDirectory,
  goUp,
  getCurrentDirectory,
} from "./navigation.js";
import { cat, add, rn, cp } from "./fileOperations.js";
import {
  printEOL,
  printCPUsInfo,
  printHomeDir,
  printSystemUsername,
  printCPUArchitecture,
} from "./osInfo.js";
import { calculateFileHash } from "./hashCalculation.js";
import { compress, decompress } from "./compression.js";

export async function handleCommand(input) {
  const [command, ...args] = input.split(" ");

  try {
    switch (command) {
      case "ls":
      case "list":
        await listDirectoryContents();
        break;
      case "cd":
        if (args.length === 0)
          throw new Error("Invalid input: Missing directory path");
        await changeDirectory(args[0]);
        break;
      case "up":
        await goUp();
        break;
      case "cat":
        if (args.length === 0)
          throw new Error("Invalid input: Missing file path");
        await cat(args[0]);
        break;
      case "add":
        if (args.length === 0)
          throw new Error("Invalid input: Missing file name");
        await add(args[0]);
        break;
      case "rn":
        if (args.length < 2) {
          console.error("Usage: rn <oldPath> <newPath>");
          return;
        }
        await rn(args[0], args[1]);
        break;
      case "cp":
        if (args.length < 2)
          throw new Error("Invalid input: Missing required arguments");
        await cp(args[0], args[1]); // Assuming cp is an async function
        break;
      case "os":
        // OS commands
        if (args[0] === "--EOL") {
          await printEOL();
        } else if (args[0] === "--cpus") {
          await printCPUsInfo();
        } else if (args[0] === "--homedir") {
          await printHomeDir();
        } else if (args[0] === "--username") {
          await printSystemUsername();
        } else if (args[0] === "--architecture") {
          await printCPUArchitecture();
        } else {
          console.log("Unknown os command");
        }
        break;
      case "hash":
        if (args.length === 0) {
          console.error(
            "Invalid input: Missing file path for hash calculation."
          );
        } else {
          try {
            await calculateFileHash(args[0]);
          } catch (error) {
            console.error(error.message);
          }
        }
        break;
      case "compress":
        if (args.length < 2) {
          console.error(
            "Usage: compress <sourceFilePath> <destinationFilePath>"
          );
          return;
        }
        await compress(args[0], args[1]);
        break;

      case "decompress":
        if (args.length < 2) {
          console.error(
            "Usage: decompress <sourceFilePath> <destinationFilePath>"
          );
          return;
        }
        await decompress(args[0], args[1]);
        break;

      default:
        throw new Error("Invalid input: Unknown command");
    }
  } catch (error) {
    console.error(
      error.message.includes("Invalid input")
        ? error.message
        : "Operation failed"
    );
  }
}
