/// <reference types="react" />
import type { MaskProps } from './types';
export default function useMask({ mask, replacement, showMask, separate, track, modify, onMask, }?: MaskProps): React.MutableRefObject<HTMLInputElement | null>;
