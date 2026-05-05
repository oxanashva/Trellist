export const SHOW_MSG = 'show-msg'

export interface UserMsg {
  txt: string
  type: 'success' | 'error'
}

type Listener<T> = (data: T) => void
type ListenersMap = Record<string, Listener<unknown>[]>

function createEventEmitter() {
  const groupenersMap: ListenersMap = {}
  return {
    on<T>(evName: string, groupener: Listener<T>): () => void {
      const casted = groupener as Listener<unknown>
      groupenersMap[evName] = groupenersMap[evName]
        ? [...groupenersMap[evName], casted]
        : [casted]
      return () => {
        groupenersMap[evName] = groupenersMap[evName].filter((func) => func !== casted)
      }
    },
    emit<T>(evName: string, data: T): void {
      if (!groupenersMap[evName]) return
      groupenersMap[evName].forEach((groupener) => groupener(data))
    },
  }
}

export const eventBus = createEventEmitter()

export function showUserMsg(msg: UserMsg): void {
  eventBus.emit(SHOW_MSG, msg)
}

export function showSuccessMsg(txt: string): void {
  showUserMsg({ txt, type: 'success' })
}

export function showErrorMsg(txt: string): void {
  showUserMsg({ txt, type: 'error' })
}

declare global {
  interface Window {
    showUserMsg: typeof showUserMsg
  }
}

window.showUserMsg = showUserMsg
