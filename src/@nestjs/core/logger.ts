import clc from "cli-color";
export class Logger {
  //   private static timeStart = new Date().getTime();
  static log(message: string, context: string = "") {
    const timestamp = new Date().toLocaleString();
    const pid = process.pid;

    console.log(
      `${clc.green("[Nest]")} ${clc.green(pid.toString())}  - ${clc.white(
        timestamp
      )}     ${clc.green("LOG")} ${clc.yellow("[" + context + "]")} ${clc.green(
        message
      )}`
    );
  }
}
