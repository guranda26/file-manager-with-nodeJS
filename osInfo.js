import os from "os";
import osName from "os-name";

async function printEOL() {
  return Promise.resolve(console.log(JSON.stringify(os.EOL)));
}

async function printCPUsInfo() {
  return new Promise((resolve) => {
    const cpus = os.cpus();
    console.log(`Total CPUs: ${cpus.length}`);
    cpus.forEach((cpu, index) => {
      console.log(
        `CPU ${index + 1}: Model - ${cpu.model}, Clock Rate - ${
          cpu.speed / 1000
        } GHz`
      );
    });
    resolve();
  });
}

async function printHomeDir() {
  return Promise.resolve(console.log(os.homedir()));
}

async function printSystemUsername() {
  return Promise.resolve(console.log(os.userInfo().username));
}

async function printCPUArchitecture() {
  return Promise.resolve(console.log(os.arch()));
}
