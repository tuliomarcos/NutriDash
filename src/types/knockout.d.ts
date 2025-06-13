import * as ko from 'knockout'

declare global {
  interface Window {
    ko: typeof ko
  }
  const ko: typeof ko
}
