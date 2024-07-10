/// <reference types="react" />
export default function useConnectedInputRef(ref: React.MutableRefObject<HTMLInputElement | null>, forwardedRef: React.ForwardedRef<HTMLInputElement>): (element: HTMLInputElement | null) => void;
