import { writeFile } from "fs";
import { getPlatform, getArch, getNumCPU, getTotalMemInGb, getFreeMemInGb } from "./os-module.js";

const sysInfo = `System info:
  Platform: ${getPlatform()}
  Arch: ${getArch()}
  Number of CPUs: ${getNumCPU()}
  Total memory: ${getTotalMemInGb()} Gb
  Free memory: ${getFreeMemInGb()} Gb`;

const writeToFileSysInfo = (fileName) => {
  writeFile(`${fileName}`, sysInfo, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('File written successfully.');
    }
  });
};

function startApp() {
  const fileName = 'result.txt';
  writeToFileSysInfo(fileName);
}

startApp();