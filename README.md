# ark-plastic

A headless, accessible UI component library for the [Plastic](https://github.com/plastic-js/plastic) JSX runtime.

Built on [Zag.js](https://zagjs.com/) — state-machine-driven, framework-agnostic UI primitives.

## Philosophy

- **Headless** — zero styles, full control over markup and design
- **Accessible** — WAI-ARIA compliant by default via Zag.js machines
- **Reactive** — state lives in Zag machines, exposed as Plastic signals and computed values that update the DOM automatically
- **Framework-native** — built for Plastic, not adapted or wrapped from another framework
- **API-compatible** — component props, part names, and callback signatures mirror the official [Ark UI](https://ark-ui.com/) API so knowledge transfers directly
- **Browser-only** — no SSR support; all rendering targets a live `document`

## How it works

Each component is backed by a Zag.js finite-state machine that manages all interactive state: open/closed, selected values, focus, keyboard navigation, and ARIA attributes. `@plastic-js/ark` connects those machines to the Plastic reactive runtime through two thin layers:

1. **`useMachine`** — creates a Plastic-managed service instance and starts the machine lifecycle.
2. **`createComputed`** — wraps `connect(service, normalizeProps)` so that any JSX expression reading machine state is tracked as a reactive dependency and re-renders automatically.

The result is that `api().open`, `api().getTriggerProps()`, etc. behave like ordinary Plastic signals — no manual subscriptions, no reconciliation, no imperative DOM updates.

## Install

```bash
npm install @plastic-js/ark
```

## Requirements

- **Plastic JSX runtime** — the peer runtime that `@plastic-js/ark` targets. In your JSX transform configuration, point the runtime at `@plastic-js/plastic/jsx-runtime`.
- Node 22+ / a modern bundler that supports ES modules (`"type": "module"`).

## Usage

### Compound components

Every component exposes its parts as nested sub-components under a shared namespace:

```jsx
import { Dialog } from "@plastic-js/ark"

function MyDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>Open</Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Hello</Dialog.Title>
          <Dialog.Description>World</Dialog.Description>
          <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
```

You can also import parts by their full flat name:

```jsx
import { DialogRoot, DialogTrigger, DialogContent } from "@plastic-js/ark"
```

Or use the deep-import path for more precise tree-shaking:

```jsx
import { Root, Trigger, Content } from "@plastic-js/ark/dialog"
```

### Controlled usage

Pass a signal-based value to keep state under your control. The component's internal machine only fires the `onXxx` callback — it does not update its own state unless you push a new value back in:

```jsx
import { createSignal } from "@plastic-js/plastic"
import { Dialog } from "@plastic-js/ark"

function App() {
  const [open, setOpen] = createSignal(false)

  return (
    <Dialog.Root open={open()} onOpenChange={({ open: next }) => setOpen(next)}>
      <Dialog.Trigger>Open</Dialog.Trigger>
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
```

### Uncontrolled usage with a default value

Use `defaultValue` / `defaultOpen` / `defaultChecked` to set an initial state while letting the machine own all subsequent transitions:

```jsx
<Accordion.Root defaultValue={["item-1"]}>
  …
</Accordion.Root>
```

### Headless hook usage

For full control, call the `useXxx` hook directly and wire machine props onto your own markup:

```jsx
import { useDialog } from "@plastic-js/ark/dialog"
import { ark } from "@plastic-js/ark/factory"

function CustomDialog(props) {
  const api = useDialog(props)

  return (
    <ark.div {...api().getRootProps()}>
      <ark.button {...api().getTriggerProps()}>Open</ark.button>
      <ark.div {...api().getBackdropProps()} />
      <ark.div {...api().getPositionerProps()}>
        <ark.div {...api().getContentProps()}>
          {props.children}
        </ark.div>
      </ark.div>
    </ark.div>
  )
}
```

Each `useXxx` hook accepts the same props as the corresponding `Root` component and returns a reactive accessor (`api`) whose value is the full Zag `connect(...)` API.

## The `asChild` pattern

Every part component accepts an `asChild` render prop. Pass it a function that receives a props accessor and returns a single custom element. The machine-provided ARIA attributes, event handlers, and `data-*` attributes are merged onto your element — no extra wrappers:

```jsx
import { Dialog } from "@plastic-js/ark"

function MyButton(props) {
  return <button class="btn" {...props} />
}

function App() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild={(propsFn) => <MyButton {...propsFn()} />}>
        Open
      </Dialog.Trigger>
    </Dialog.Root>
  )
}
```

`propsFn` accepts optional extra props and merges them with the base props: event handlers are composed (both fire), class names are joined, and refs are merged.

## Anatomy

Every rendered element carries two HTML attributes:

- `data-scope` — identifies the component (e.g. `"dialog"`).
- `data-part` — identifies the structural role within that component (e.g. `"content"`).

Together they provide stable CSS selectors without any class-name management:

```css
[data-scope="dialog"][data-part="content"] { background: white; }
[data-scope="dialog"][data-part="content"][data-state="open"] { animation: fadeIn 200ms ease; }
```

Each component exports a named anatomy object. Use it to generate selectors or inspect part names programmatically:

```js
import { accordionAnatomy } from "@plastic-js/ark/accordion"

accordionAnatomy.keys()
// → ["root", "item", "itemTrigger", "itemContent", "itemIndicator"]

const parts = accordionAnatomy.build()
parts.itemTrigger.attrs
// → { "data-scope": "accordion", "data-part": "item-trigger" }

parts.itemTrigger.selector
// → '[data-scope="accordion"][data-part="item-trigger"]'
```

See [anatomy.md](anatomy.md) for the complete per-component part reference.

## The `ark` factory

`ark` is a JSX element factory that converts any HTML tag into a component with `asChild` support and smart prop merging. Use it when building custom headless primitives on top of Plastic:

```jsx
import { ark } from "@plastic-js/ark/factory"

// Plain <div> — all standard HTML attributes pass through
<ark.div class="wrapper" data-custom="value" />

// Any tag is supported
<ark.button type="button" />
<ark.input placeholder="Search…" />
```

`ark.*` elements forward `ref`, merge event handlers, join class names, and delegate to a child element when `asChild` is present — identical behaviour to the built-in part components.

## Portal

`Portal` is a thin wrapper around the Plastic primitive `portal()`. It teleports its children to `document.body` (or a custom `container` accessor) at mount time.

```jsx
import { Portal } from "@plastic-js/ark"

<Portal>
  <div class="floating-overlay">…</div>
</Portal>

// Custom mount target
<Portal container={() => document.getElementById("modal-root")}>
  …
</Portal>
```

Several overlay components (`Dialog`, `Drawer`, `Popover`, `Menu`, `Tooltip`, `Toast`) wrap their positioner subtree in a `Portal` by default. Pass `portalled={false}` on the `Root` to opt out:

```jsx
<Dialog.Root portalled={false}>
  …
</Dialog.Root>
```

## Imperative API

Some components expose an imperative API for programmatic control without mounting a persistent component tree. The canonical example is `Toast`.

### Toast

Call `createToaster()` once at the app root. It returns a `toaster` object whose methods (`create`, `dismiss`, `update`) can be called from anywhere — event handlers, async callbacks, or other components:

```jsx
import { createToaster, Toast } from "@plastic-js/ark"

const toaster = createToaster({ placement: "bottom-end", max: 5 })

// Trigger from anywhere
function handleSave() {
  toaster.create({ title: "Saved", description: "Your changes were saved.", type: "success" })
}

// Render the toast region once in your app tree
function App() {
  return (
    <>
      <button onClick={handleSave}>Save</button>

      <Toast.Toaster toaster={toaster}>
        {(toast) => (
          <Toast.Root key={toast.id}>
            <Toast.Title>{toast.title}</Toast.Title>
            <Toast.Description>{toast.description}</Toast.Description>
            <Toast.CloseTrigger>✕</Toast.CloseTrigger>
          </Toast.Root>
        )}
      </Toast.Toaster>
    </>
  )
}
```

`createToaster` accepts the same options as the Zag toast machine context. The `toaster` object is plain — no Plastic reactivity required to hold a reference to it.

## Providers

Wrap your app (or a subtree) with these providers to configure library-wide behaviour.

### EnvironmentProvider

Controls which `document` and `window` the components read from. Required for Shadow DOM, iframes, and multi-document setups. Providers can be nested — each level inherits any getter the inner provider does not override:

```jsx
import { EnvironmentProvider } from "@plastic-js/ark/environment"

// Pass a custom document directly
<EnvironmentProvider value={{ document: iframeEl.contentDocument }}>
  <App />
</EnvironmentProvider>

// Or provide a getter function
<EnvironmentProvider value={{ getDocument: () => shadowRoot.ownerDocument }}>
  <App />
</EnvironmentProvider>
```

When mounted without an explicit `value`, `EnvironmentProvider` still renders a hidden `<span>` sentinel so `getRootNode()` reflects the actual DOM root of the subtree — critical for Shadow DOM usage.

### LocaleProvider

Sets the locale (`BCP 47` language tag) and text direction (`ltr` / `rtl`) for all components in the subtree. When no locale is provided, the library tracks the browser's locale reactively — no re-mount required when the user changes the OS language:

```jsx
import { LocaleProvider } from "@plastic-js/ark/locale"

<LocaleProvider locale="ar-EG">
  <App />   {/* components render RTL automatically */}
</LocaleProvider>
```

The `useLocaleContext` hook, plus three utility hooks, are also available for component authors:

```js
import { useCollator, useFilter, useDateFormatter } from "@plastic-js/ark/locale"

// Returns a reactive Intl.Collator for the active locale
const collator = useCollator()

// Returns a reactive locale-aware string filter (startsWith / contains / endsWith)
const filter = useFilter({ sensitivity: "base" })

// Returns a reactive Intl.DateTimeFormat
const fmt = useDateFormatter({ dateStyle: "medium" })
```

### InteractionProvider

Configures pointer interaction behaviour (touch vs. mouse heuristics) for the component tree. Wrap the root of your app once; components beneath it adapt accordingly:

```jsx
import { InteractionProvider } from "@plastic-js/ark/interaction"

<InteractionProvider>
  <App />
</InteractionProvider>
```

## Components

| Category | Components |
|---|---|
| **Navigation** | Accordion, Tabs, Pagination, Tree View, Tour, Steps |
| **Overlays** | Dialog, Drawer, Popover, Hover Card, Tooltip, Menu, Toast |
| **Forms** | Checkbox, Radio Group, Switch, Select, Combobox, Listbox, Tags Input, Number Input, Slider, Rating Group, Date Input, Date Picker, Color Picker, Signature Pad, File Upload, Field, Fieldset, Toggle, Toggle Group |
| **Layout** | Splitter, Collapsible, Carousel |
| **Utilities** | Portal, Presence, Focus Trap, Progress, Avatar, Clipboard |
| **Providers** | Environment, Locale, Interaction |

## Stale event handler pitfall

Machine `connect(...)` calls return a **snapshot** object. If you destructure an event handler once and bind it to a long-lived DOM node, it can go stale after the machine transitions to a new state.

```js
// ✗ stale — onClick captured from a single snapshot
const { onClick } = api().getTriggerProps()
<button onClick={onClick} />

// ✓ safe — handler resolved fresh on every invocation
<button onClick={(...args) => api().getTriggerProps().onClick?.(...args)} />
```

For compound components (`<Dialog.Trigger>` etc.) this is handled automatically. When using `useXxx` hooks directly, always wrap machine-derived handlers in a lazy thunk.

## Generating new components

A code-generation script scaffolds a complete component skeleton from a Zag package name:

```bash
npm run generate:component -- --name my-component
npm run generate:component -- --name my-component --parts root,trigger,content
```

The script creates:

| File | Purpose |
|---|---|
| `src/components/<name>/<name>.anatomy.js` | Anatomy definition |
| `src/components/<name>/<name>-context.js` | Context provider + hook |
| `src/components/<name>/use-<name>.js` | `useXxx` hook stub |
| `src/components/<name>/<name>-<part>.jsx` | One file per anatomy part |
| `src/components/<name>/index.js` | Namespace barrel export |
| `src/components/<name>/tests/<name>.test.js` | Smoke-test template |
| `src/components/<name>/showcases/<Name>Showcase.jsx` | Showcase template |

After generation, wire `useMachine` and `createComputed` inside `use-<name>.js` to connect the Zag machine.

## Testing

```bash
npm test
```

Tests run with [Vitest](https://vitest.dev/) in a jsdom environment. The suite uses `@testing-library/user-event` for realistic pointer and keyboard sequences and a `ComponentUnderTest` fixture pattern — one `tests/basic.jsx` per component that accepts all root props via spread.

```js
// tests/basic.jsx
import { Tabs } from '../index.js'

export const ComponentUnderTest = (props) => (
  <Tabs.Root {...props}>
    <Tabs.List>
      <Tabs.Trigger value="a">A</Tabs.Trigger>
      <Tabs.Trigger value="b">B</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="a">Content A</Tabs.Content>
    <Tabs.Content value="b">Content B</Tabs.Content>
  </Tabs.Root>
)
```

## Gotchas: Listbox / Select / Combobox value shape

These three selection components do NOT share a consistent `value` / `onValueChange` shape. Reading `value[0]` blindly on single-select can give you the first character of a string (e.g. `'mango'[0] === 'm'`) — guard with `Array.isArray` before indexing.

| Component | Single-select callback value | Multi-select callback value | Unknown value (not in items) |
| --- | --- | --- | --- |
| `Listbox` | **string** (e.g. `'mango'`) | array (e.g. `['mango']`) | silently ignored — nothing selected |
| `Select`  | array (e.g. `['mango']`) | array | silently unchecked, BUT `Select.ValueText` **falls back to the raw string** (`'car'` shows literally as `car`) |
| `Combobox`| array (e.g. `['mango']`) | array | silently ignored |

Implications:

- **Listbox single-select**: when building a label from `value()`, always `Array.isArray(v) ? v[0] : v` first.
- **Select**: do not trust `Select.ValueText` to be empty for invalid values — validate the value against the collection up-front, or render your own label via a computed.
- All three: passing an unknown value will not throw, so typos in `defaultValue` fail silently.

Tests pinning this behavior live in `src/components/{listbox,select,combobox}/tests/`.

## License

MIT
