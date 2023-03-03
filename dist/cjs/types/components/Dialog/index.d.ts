import { FC, ReactElement } from "react";
import "./index.scss";
interface DialogProps {
    status: boolean;
    content: {
        title: string;
        desc: string | ReactElement;
        btnText: string;
    };
    onCancel?: () => any;
    setStatus: (state: boolean) => any;
    onClose?: () => any;
    onClick?: (close: any) => any;
}
export declare const Dialog: FC<DialogProps>;
export {};
