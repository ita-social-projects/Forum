/// <reference types="react" />
import type { MaskProps } from './types';
import type { InputComponent, InputComponentProps } from '@react-input/core';
export type InputMaskProps<C extends React.ComponentType | undefined = undefined> = MaskProps & InputComponentProps<C>;
declare const InputMask: InputComponent<MaskProps>;
export default InputMask;
