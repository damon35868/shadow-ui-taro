import { FC, ReactElement } from "react";
import "./index.scss";
interface ModalProps {
    status: boolean;
    setStatus: Function;
    onClose?: () => any;
    onCancel?: () => any;
    closeOnClickModal?: boolean;
    cRef?: any;
    hideClose?: boolean;
    hideBG?: boolean;
    arg?: any;
    children: ReactElement;
}
export declare const Modal: FC<ModalProps>;
export {};
