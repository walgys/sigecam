import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Button, Container, DialogContent } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    padding: '5%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: '2% 0% 2% 0%',
    },
  },

  title: {
    textAlign: 'center',
  },
  buttons: {
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'space-around',
  },
});

const DialogModal = (props) => {
  const classes = useStyles();
  const {
    onClose,
    onAdd,
    title,
    open,
    children,
    cancelText = 'Cancelar',
    acceptText = 'Agregar',
    showButtons = true,
  } = props;

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      maxWidth={'false'}
    >
      <DialogTitle id="simple-dialog-title" className={classes.title}>
        {title}
      </DialogTitle>
      <DialogContent className={classes.root}>
        {children}
        {showButtons && (
          <Container className={classes.buttons}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={onClose}
            >
              {cancelText}
            </Button>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={onAdd}
            >
              {acceptText}
            </Button>
          </Container>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogModal;
