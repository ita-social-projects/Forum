/// <reference types="react" />
import type { CustomInputEvent, CustomInputEventHandler, Init, Tracking } from '../types';
interface UseInputParam<D> {
    init: Init;
    tracking: Tracking<D>;
    eventType?: string;
    eventHandler?: CustomInputEventHandler<CustomInputEvent<D>>;
}
export default function useInput<D = unknown>({ init, tracking, eventType, eventHandler, }: UseInputParam<D>): React.MutableRefObject<HTMLInputElement | null>;
export {};
