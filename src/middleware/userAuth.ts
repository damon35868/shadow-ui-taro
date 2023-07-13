import { getItem, setItem } from "../common/utils";
import { LocalStorageKeys } from "../common/enums";

enum permissionsType {
  USER = 1,
  PHONE = 2
}

class UserAuth {
  public level = permissionsType.PHONE;
  public lastCb: Function | undefined;

  /**
   * @description: 查看授权
   * @return {*}
   */
  checkUserAuth(cb?: Function, errcb?: Function, lv?: permissionsType): boolean {
    cb && this.setLastCb(cb);
    const level = lv || this.level;
    const hasAuth = this.getUserPermissions(level);
    setItem("userAuth", !hasAuth);

    if (hasAuth) {
      if (this.lastCb) {
        this.lastCb();
        return true;
      }

      cb && cb();
      return true;
    }

    errcb && errcb();
    return false;
  }

  setLastCb(cb: Function) {
    this.lastCb = () => {
      cb();
      this.lastCb = undefined;
    };
    return true;
  }

  getUserPermissions(lv?: permissionsType) {
    const level = lv || this.level;

    switch (level) {
      // case permissionsType.USER: { return this.getUserPermission(); }
      case permissionsType.PHONE: {
        return this.getPhonePermission();
      }

      default:
        return false;
    }
  }

  // 暂时不需要校验用户信息权限
  // getUserPermission() {
  // },

  public getPhonePermission(): boolean {
    const userInfo = getItem(LocalStorageKeys.userInfo);
    const { mobilePhone } = userInfo || {};
    return !!mobilePhone;
  }
}

export default new UserAuth();
