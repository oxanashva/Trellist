import { eventBus } from '../services/event-bus.service'
import { useState, useEffect } from 'react'
// import { socketService, SOCKET_EVENT_REVIEW_ABOUT_YOU } from '../services/socket.service'
import Snackbar from '@mui/material/Snackbar'
import CloseIcon from '../assets/images/icons/close.svg?react'
import SuccessIcon from '../assets/images/icons/success.svg?react'
import ErrorIcon from '../assets/images/icons/error.svg?react'

export function UserMsg() {
  const [msg, setMsg] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = eventBus.on('show-msg', (msg) => {
      setMsg(msg)
      setOpen(true)
    })

    // socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, review => {
    // 	showSuccessMsg(`New review about me ${review.txt}`)
    // })

    return () => {
      unsubscribe()
      // socketService.off(SOCKET_EVENT_REVIEW_ABOUT_YOU)
    }
  }, [])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
    closeMsg()
  }

  function closeMsg() {
    setMsg(null)
  }

  const successMessage = (
    <div className="user-msg">
      <SuccessIcon className="success" width={20} height={20} fill="currentColor" />
      <span>{msg?.txt}</span>
    </div>
  )

  const errorMessage = (
    <div className="user-msg">
      <ErrorIcon className="error" width={20} height={20} fill="currentColor" />
      <span>{msg?.txt}</span>
    </div>
  )

  const action = (
    <button className="dynamic-btn icon-btn close-btn">
      <CloseIcon width={16} height={16} fill="currentColor" onClick={handleClose} />
    </button>
  )

  return (
    <>
      {msg && (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={open}
          sx={{
            '& .MuiSnackbarContent-root': {
              position: 'relative',
              width: 'calc(0.5rem * 50)',
              backgroundColor: '#ffffff',
              padding: '1rem',
              color: 'var(--text)',
              fontWeight: 600,
              borderRadius: '0.25rem',
              boxShadow: '0px 8px 12px #1E1F2126, 0px 0px 1px #1E1F21',
              zIndex: (theme) => theme.zIndex.modal + 1,
            },
            '& .MuiSnackbarContent-action': {
              marginRight: 0,
            },
          }}
          autoHideDuration={6000}
          onClose={handleClose}
          message={msg?.type === 'success' ? successMessage : errorMessage}
          action={action}
        />
      )}
    </>
  )
}
