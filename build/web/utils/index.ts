export default class WebUtils {
  static getIPAdress() {
    const interfaces = require("os").networkInterfaces();
    let ipStr = ""
    for (const devName in interfaces) {
      const iface = interfaces[devName];
      for (let i = 0; i < iface.length; i++) {
        let alias = iface[i];
        if (
          alias.family === "IPv4" &&
          alias.address !== "127.0.0.1" &&
          !alias.internal
        ) {
          ipStr = alias.address
        }
      }
    }
    return ipStr
  }
}
