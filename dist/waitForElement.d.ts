interface WaitForElementOptions {
    timeout?: number;
    root?: HTMLElement | Document;
    attributes?: boolean;
    subtree?: boolean;
    childList?: boolean;
    attributeFilter?: string[];
    throwOnTimeout?: boolean;
    checkClientHeight?: boolean;
}
export default function waitForElement(elementOrSelector: HTMLElement | string, options?: WaitForElementOptions): Promise<HTMLElement | null>;
export {};
