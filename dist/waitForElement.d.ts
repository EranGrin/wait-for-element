interface WaitForElementOptions {
    timeout?: number;
    root?: HTMLElement | Document;
    attributes?: boolean;
    subtree?: boolean;
    childList?: boolean;
    throwOnTimeout?: boolean;
    checkClientHeight?: boolean;
}
export default function waitForElement(elementOrSelector: HTMLElement | string, options?: WaitForElementOptions): Promise<HTMLElement | null>;
export {};
