import process from "process";
import readline from "readline";
import { cwd, chdir } from "process";
import { homedir } from "os";
import { handleCommand } from "./commandHandler.js";
import { rn } from "./fileOperations.js";

const args = process.argv.slice(2);
const usernameArg = args.find((arg) => arg.startsWith("--username="));
const username = usernameArg ? usernameArg.split("=")[1] : "Unknown User";

if (!username) {
  console.error(
    "Error: Username not provided. Please start the program with --username=your_username."
  );
  process.exit(1);
}

console.log(`Welcome to the File Manager, ${username}!`);

try {
  const homeDirectory = homedir();
  chdir(homeDirectory);
  console.log(`Successfully changed working directory to: ${cwd()}`);
} catch (error) {
  console.error(`Failed to change working directory. Error: ${error.message}`);
  process.exit(1);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
console.log('Simple File Explorer. Type "exit" to quit.');

rl.setPrompt("Enter command> ");
rl.prompt();

rl.on("line", async (line) => {
  const input = line.trim();

  if (input === ".exit") {
    rl.close();
  } else {
    await handleCommand(input);
    console.log(`You are currently in ${cwd()}`);
    rl.prompt();
  }
}).on("close", () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
});
