"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const waitForElement_1 = __importDefault(require("./waitForElement"));
async function waitForAttributeChange(selector, attributeName, options = {}) {
    const { timeout = 2500, root = document, throwOnTimeout = false, } = options;
    const element = await (0, waitForElement_1.default)(selector, options);
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
                }
                else {
                    console.warn(`Attribute "${attributeName}" change not detected within ${timeout}ms for element "${selector}"`);
                    resolve(null);
                }
            }, timeout);
        }
    });
}
exports.default = waitForAttributeChange;
