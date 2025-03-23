import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

const RemoveItemDialog = ({open, content, handleClose, handleRemove}) => {
  return (
    <Dialog
        open={open}
        onClose={()=>{}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Remove photo
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure of removing photo: {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>No</Button>
          <Button onClick={handleRemove}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default RemoveItemDialog