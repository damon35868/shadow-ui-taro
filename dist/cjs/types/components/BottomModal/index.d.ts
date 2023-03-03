import { FC, ReactElement } from "react";
import "./index.scss";
interface BottomModalProps {
    status: boolean;
    setStatus?: (state: boolean) => any;
    onClose?: () => any;
    closeOnClickModal?: boolean;
    children: ReactElement;
    rounded?: boolean;
}
export declare const BottomModal: FC<BottomModalProps>;
export {};
