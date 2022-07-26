/**
 * 异常处理类
 */
export default class HandleError {

  public message!: string;

  constructor(message?: string) {
    this.message = message || "";
    HandleError.error(message)
  }

  public static deadly(message?: string) {
    throw new Error(`[${new Date()}]: 致命错误: ${message || ""}`);
  }

  public static error(message?: string) {
    console.error(new Error(`[${new Date()}]: 错误: ${message || ""}`));
  }

  public static warning(message?: string) {
    console.warn(new Error(`[${new Date()}]: 警告\n 发生在:${window.location.href} \n 错误信息: ${message || ""}`))
  }

  public static log(message?: string) {
    console.log(message)
  }

}