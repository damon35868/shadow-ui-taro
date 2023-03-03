import React from 'react';
import { LineLoading } from './Line';
import { CircleLoading } from './Circle';
export const Loading = ({ circle, children }) => {
    return circle ? <CircleLoading>{children}</CircleLoading> : <LineLoading />;
};
