interface WaitForElementOptions {
  timeout?: number;
  root?: HTMLElement | Document;
  attributes?: boolean;
  subtree?: boolean;
  childList?: boolean;
  throwOnTimeout?: boolean;
  checkClientHeight?: boolean;
}

export default function waitForElement(
  elementOrSelector: HTMLElement | string,
  options: WaitForElementOptions = {}
): Promise<HTMLElement | null> {
  const {
    timeout = 2500,
    root = document,
    attributes = true,
    subtree = true,
    childList = true,
    throwOnTimeout = false,
    checkClientHeight = false,
  } = options;

  const isElement = elementOrSelector instanceof Element;
  const element: HTMLElement | null = isElement ? elementOrSelector as HTMLElement : root.querySelector(elementOrSelector);

  return new Promise((resolve, reject) => {
    if (element !== null) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver((mutationsList, observer) => {
      const node: HTMLElement | null = isElement ? (elementOrSelector as HTMLElement) : root.querySelector(elementOrSelector);

      if (node !== null && (!checkClientHeight || node.clientHeight > 0)) {
        observer.disconnect();
        resolve(node);
      }
    });

    observer.observe(root, { attributes, subtree, childList });

    if (timeout) {
      setTimeout(() => {
        observer.disconnect();

        if (throwOnTimeout) {
          reject(new Error(`Element "${elementOrSelector}" not found or not rendered within ${timeout}ms`));
        } else {
          console.warn(`Element "${elementOrSelector}" not found or not rendered within ${timeout}ms`);
          resolve(null);
        }
      }, timeout);
    }
  });
}

