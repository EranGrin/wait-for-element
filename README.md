

# element-waiter

A utility package to wait for DOM elements and attribute changes, with support for various JavaScript frameworks and TypeScript.

## Installation

```bash
npm install element-waiter
```

Or

```bash
yarn add element-waiter
```

## Usage

### waitForElement

```typescript
import { waitForElement } from 'element-waiter';

waitForElement(elementOrSelector, options)
  .then((element) => {
    if (element) {
      // Do something with the element
    }
  })
  .catch((error) => {
    // Handle the error
  });
```

#### Options

- `timeout`: Maximum time (in ms) to wait for the element. Default: `2500`.
- `root`: Root element for querySelector. Default: `document`.
- `attributes`: Set to `true` to observe changes to the attribute values. Default: `true`.
- `subtree`: Set to `true` to observe changes to the element's descendants. Default: `true`.
- `childList`: Set to `true` to observe changes to the element's children. Default: `true`.
- `throwOnTimeout`: Set to `true` to throw an error if the element is not found within the timeout. Default: `false`.
- `checkClientHeight`: Set to true to wait for the element's clientHeight to be greater than 0, which can be useful to determine if the element is fully rendered rather than just existing in the DOM. Default: false.
### waitForAttributeChange

```typescript
import { waitForAttributeChange } from 'element-waiter';

waitForAttributeChange(selector, attributeName, options)
  .then((element) => {
    if (element) {
      // Do something with the element
    }
  })
  .catch((error) => {
    // Handle the error
  });
```
This function first checks if the element exists before waiting for the specified attribute to change.

#### Options

- `timeout`: Maximum time (in ms) to wait for the attribute change. Default: `2500`.
- `root`: Root element for querySelector. Default: `document`.
- `throwOnTimeout`: Set to `true` to throw an error if the attribute change is not detected within the timeout. Default: `false`.


## Framework Support

Sure, I'll provide example implementations for both Vue and React.

### Vue

Here's an example of using `element-waiter` in a Vue component:

```vue
<template>
  <div>
    <div v-if="showElement" ref="elementRef">I am the target element</div>
    <button @click="toggleElement">Toggle Element</button>
  </div>
</template>

<script>
import { waitForElement } from 'element-waiter';

export default {
  data() {
    return {
      showElement: false,
    };
  },
  methods: {
    async toggleElement() {
      this.showElement = !this.showElement;

      if (this.showElement) {
        try {
          const element = await waitForElement(this.$refs.elementRef, {
            checkClientHeight: true,
          });
          console.log('Element is rendered:', element);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    },
  },
};
</script>
```

### React

Here's an example of using `element-waiter` in a React component:

```jsx
import React, { useRef, useState } from 'react';
import { waitForElement } from 'element-waiter';

function App() {
  const [showElement, setShowElement] = useState(false);
  const elementRef = useRef(null);

  const toggleElement = async () => {
    setShowElement(!showElement);

    if (!showElement) {
      try {
        const element = await waitForElement(elementRef.current, {
          checkClientHeight: true,
        });
        console.log('Element is rendered:', element);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div>
      {showElement && <div ref={elementRef}>I am the target element</div>}
      <button onClick={toggleElement}>Toggle Element</button>
    </div>
  );
}

export default App;
```

In both examples, we have a simple component with a button that toggles the visibility of a target element. When the element is shown, we use `waitForElement` to wait for the element to be rendered.


## License

MIT

