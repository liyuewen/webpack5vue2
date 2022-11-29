import ApiUrl from "./common";
import AuthAxiosDao from "./common/request";

export default class TestDao {

  public static getInfo(params: any) {
    return AuthAxiosDao().request({
      method: "POST",
      url: ApiUrl.test.info,
      data: params
    })
  }
}