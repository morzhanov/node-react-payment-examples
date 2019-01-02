import UiStore from './uiStore'
import RouterStore from './routerStore'

export function createStores(history) {
  const uiStore = UiStore.create({}, {})
  const routerStore = new RouterStore(history)
  return {
    uiStore,
    routerStore
  }
}
