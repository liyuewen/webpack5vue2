import TestDao from "@/dao/auth/test";
import TestServer from "../testServer";

export default class TestServerImpl implements TestServer {

  static async getInfo(params: any) {
    TestDao.getInfo(params)
  };

}