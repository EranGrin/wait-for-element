interface WaitForAttributeChangeOptions {
    timeout?: number;
    root?: HTMLElement | Document;
    throwOnTimeout?: boolean;
}
export default function waitForAttributeChange(selector: string, attributeName: string, options?: WaitForAttributeChangeOptions): Promise<HTMLElement | null>;
export {};
