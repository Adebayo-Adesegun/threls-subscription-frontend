export default defineAppConfig({
  ui: {
    primary: 'orange',
    gray: 'cool',
    table: {
      wrapper: 'relative overflow-x-auto',
      base: 'min-w-full',
      divide: 'divide-y divide-gray-300 dark:divide-gray-700',
      thead: 'relative w-full border-y text-xs bg-gray-100 p-0',
      tr: {
        even: 'bg-grey dark:bg-gray-800'
      },
      tbody: ' overflow-x-auto'
    },
    checkbox: {
      slots: {
        root: 'relative flex items-start',
        base: 'shrink-0 flex items-center justify-center rounded-(--ui-radius) text-(--ui-bg) ring ring-inset ring-(--ui-border-accented) focus-visible:outline-2 focus-visible:outline-offset-2',
        container: 'flex items-center',
        wrapper: 'ms-2',
        icon: 'shrink-0 size-full',
        label: 'block font-medium text-(--ui-text)',
        description: 'text-(--ui-text-muted)'
      }
    },
}
})
