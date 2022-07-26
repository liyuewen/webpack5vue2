/**
 * 正则
 */
export default class Regular {

  /**
   * 只能输入英文和数字
   */
  static engNum = /[^\w]/g

  /**
   * 只能输入整数数字
   */
  static intNum = /[^0-9,]*/g

  /**
   * 输入带小数
   */
  static floatNum = /[^\d\.]/g

  /**
   * 只允许输入数字和 - 
   */
  static fixedTel = /[^\d\-]/g

  /**
   * 判断是否是纯字母
   */
  static letter = /^[a-z]*$/i

  /**
   * 判断是否是纯数字
   */
  static number = /^[0-9]*$/i

  /**
   * 验证手机
   */
  static phone = /^[1][0-9]{10}$/

  /**
   * 验证电话号
   */
  static tel = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/

  /**
   * 验证身份证
   */
  static idCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/

}
