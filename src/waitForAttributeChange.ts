import waitForElement from './waitForElement';

interface WaitForAttributeChangeOptions {
  timeout?: number;
  root?: HTMLElement | Document;
  throwOnTimeout?: boolean;
}

export default async function waitForAttributeChange(
  selector: string,
  attributeName: string,
  options: WaitForAttributeChangeOptions = {}
): Promise<HTMLElement | null> {
    const {
      timeout = 2500,
      root = document,
      throwOnTimeout = false,
    } = options;
  
    const element = await waitForElement(selector, options);
  
    if (!element) {
      return null;
    }
  
    return new Promise((resolve, reject) => {
      const observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'attributes' && mutation.attributeName === attributeName) {
            observer.disconnect();
            resolve(element);
            return;
          }
        }
      });
  
      observer.observe(element, { attributes: true, attributeFilter: [attributeName] });
  
      if (timeout) {
        setTimeout(() => {
          observer.disconnect();
  
          if (throwOnTimeout) {
            reject(new Error(`Attribute "${attributeName}" change not detected within ${timeout}ms for element "${selector}"`));
          } else {
            console.warn(`Attribute "${attributeName}" change not detected within ${timeout}ms for element "${selector}"`);
            resolve(null);
          }
        }, timeout);
      }
    });
  }
  
