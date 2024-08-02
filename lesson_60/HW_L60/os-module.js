import os from "os";

const getPlatform = () => {
  return os.platform();
}

const getArch = () => {
  return os.arch();
}

const getNumCPU = () => {
  return os.cpus().length;
}

const bytesToGigabytes = (byte) => {
  return (byte / 1024 ** 3).toFixed(2)
}

const getTotalMemInGb = () => {
  return bytesToGigabytes(os.totalmem());
}

const getFreeMemInGb = () => {
  return bytesToGigabytes(os.freemem());
}

export { getPlatform, getArch, getNumCPU, getTotalMemInGb, getFreeMemInGb };