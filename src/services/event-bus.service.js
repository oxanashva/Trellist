export const SHOW_MSG = 'show-msg'

function createEventEmitter() {
    const groupenersMap = {}
    return {
        on(evName, groupener) {
            groupenersMap[evName] = (groupenersMap[evName]) ? [...groupenersMap[evName], groupener] : [groupener]
            return () => {
                groupenersMap[evName] = groupenersMap[evName].filter(func => func !== groupener)
            }
        },
        emit(evName, data) {
            if (!groupenersMap[evName]) return
            groupenersMap[evName].forEach(groupener => groupener(data))
        }
    }
}

export const eventBus = createEventEmitter()

export function showUserMsg(msg) {
    eventBus.emit(SHOW_MSG, msg)
}

export function showSuccessMsg(txt) {
    showUserMsg({ txt, type: 'success' })
}
export function showErrorMsg(txt) {
    showUserMsg({ txt, type: 'error' })
}

window.showUserMsg = showUserMsg