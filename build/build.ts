import WebRun from "./web/run";

class Bin {
  constructor() {
    this.start();
  }

  start() {
    try {
      new WebRun({
        type: "build",
      });
    } catch (error) {
      console.log(error);
    }
  }
}

new Bin();
