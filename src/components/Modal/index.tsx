import React, { FC, ReactElement, useEffect, useImperativeHandle, useState } from "react";
import classNames from "classnames";
import "./index.scss";
import { Text, View } from "@tarojs/components";

interface ModalProps {
  status: boolean;
  setStatus: Function;
  onClose?: () => any;
  onCancel?: () => any;
  closeOnClickModal?: boolean;
  cRef?: any;
  hideBG?: boolean;
  arg?: any;
  children: ReactElement;
}

export const Modal: FC<ModalProps> = ({ status, setStatus, closeOnClickModal = true, onClose, onCancel, children, cRef, hideBG, arg }) => {
  const [contentStatus, setContentStatus] = useState(false);

  useEffect(() => setContentStatus(status), [status]);
  const close = () => {
    setContentStatus(false);
    setTimeout(() => setStatus(arg || false), 150);
  };

  useImperativeHandle(cRef, () => ({ close }));

  return (
    <View
      catchMove
      className={classNames("sd_modal", { show: status })}
      onClick={() => {
        if (!closeOnClickModal) return;
        close();
        onClose && onClose();
        onCancel && onCancel();
      }}
    >
      <View
        onClick={e => e.stopPropagation()}
        className={classNames(`sd_modal-scale-${contentStatus ? "in" : "out"}`, {
          bg: !hideBG
        })}
      >
        {children}
      </View>
    </View>
  );
};
