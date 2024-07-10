import type { InputAttributes } from '../types';
interface SyntheticChangeError {
    cause?: {
        __attributes?: Partial<InputAttributes>;
    };
}
declare class SyntheticChangeError extends Error {
    constructor(message: string, cause?: SyntheticChangeError['cause']);
}
export default SyntheticChangeError;
