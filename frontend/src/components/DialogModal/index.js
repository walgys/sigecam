import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

const useStyles = makeStyles({});

const DialogModal = (props) => {
  const classes = useStyles();
  const { onClose, title, open, children } = props;

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
      {children}
      <button onClick={onClose}>Close</button>
    </Dialog>
  );
};

export default DialogModal;
