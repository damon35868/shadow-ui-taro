import React, { FC, memo, useState } from "react";
import { usePageScroll } from "@tarojs/taro";
import classNames from "classnames";
import "./index.scss";
import { routerBack, useSystemSize } from "../../common";
import { Text, View } from "@tarojs/components";
import "../../assets/iconfont/iconfont.css";

interface NavBarProps {
  title?: string | null;
  style?: any;
  iconStyle?: any;
  scrollShow?: boolean;
  onBack?: () => any;
  showBack?: boolean;
}

export const NavBar: FC<NavBarProps> = memo(({ title = "", scrollShow, onBack, showBack = true, iconStyle = {} }) => {
  const [top, setTop] = useState(0);
  const isScroll = top >= 110;
  const { customNavHeight, statusBarHeight } = useSystemSize();

  usePageScroll(({ scrollTop }) => {
    setTop(scrollTop);
  });

  return (
    <View
      className={classNames("sd_nav-bar", { bg: isScroll })}
      style={{
        height: customNavHeight + "PX",
        paddingTop: statusBarHeight + "PX"
      }}
    >
      <View className='sd_nav-bar-content' style={{ height: customNavHeight - statusBarHeight + "PX" }}>
        {showBack && (
          <View
            className='sd_nav-bar-back-parent'
            onClick={() => {
              if (onBack) return onBack();
              routerBack();
            }}
          >
            <View className='sd_nav-bar-back-icon iconfont icon-a-fanhui2x' style={{ transform: "translateY(-50%)", ...iconStyle }} />
          </View>
        )}

        {(isScroll || !scrollShow) && <Text className='sd_nav-bar-title'>{title}</Text>}
      </View>
    </View>
  );
});
