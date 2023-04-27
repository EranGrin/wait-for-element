"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function waitForElement(elementOrSelector, options = {}) {
    const { timeout = 2500, root = document, attributes = true, subtree = true, childList = true, attributeFilter, throwOnTimeout = false, checkClientHeight = false, } = options;
    const isElement = elementOrSelector instanceof Element;
    const element = isElement ? elementOrSelector : root.querySelector(elementOrSelector);
    return new Promise((resolve, reject) => {
        if (element !== null) {
            resolve(element);
            return;
        }
        const observer = new MutationObserver((mutationsList, observer) => {
            const node = isElement ? elementOrSelector : root.querySelector(elementOrSelector);
            if (node !== null && (!checkClientHeight || node.clientHeight > 0)) {
                observer.disconnect();
                resolve(node);
            }
        });
        observer.observe(root, { attributes, subtree, childList, attributeFilter });
        if (timeout) {
            setTimeout(() => {
                observer.disconnect();
                if (throwOnTimeout) {
                    reject(new Error(`Element "${elementOrSelector}" not found or not rendered within ${timeout}ms`));
                }
                else {
                    console.warn(`Element "${elementOrSelector}" not found or not rendered within ${timeout}ms`);
                    resolve(null);
                }
            }, timeout);
        }
    });
}
exports.default = waitForElement;
