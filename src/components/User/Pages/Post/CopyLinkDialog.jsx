import React from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Button,
} from '@mui/material';

import {
  Close,
  CopyAll,
} from '@mui/icons-material';

import { useDispatch } from 'react-redux';

import useCopyClipboard from 'react-use-clipboard';

import { addToast } from '../../../../redux/toastsActions';

import logo from '../../../../assets/logo.png';

export default function CopyLinkDialog({ open, handleClose }) {
  const dispatch = useDispatch();
  const [isCopied, setCopied] = useCopyClipboard(window.location.href);
  React.useEffect(() => {
    if (isCopied && open) {
      handleClose();
      dispatch(addToast({ message: 'Link Copied', variant: 'success' }));
    }
  }, [isCopied]);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className="flex flex-col"
      classes={{ paper: 'flex-grow w-10/12 md:mx-16 px-4' }}
    >
      <DialogTitle classes={{ root: 'text-xl flex justify-between items-center' }}>
        <img
          src={logo}
          alt="logo"
          className="w-32 md:w-44"
        />
        <IconButton onClick={() => handleClose()}><Close /></IconButton>
      </DialogTitle>
      <DialogContent className="flex flex-col items-center gap-3">
        <TextField
          value={window.location.href}
          className="w-full bg-gray-300"
        />
        <Button startIcon={<CopyAll />} variant="contained" onClick={setCopied}>Copy</Button>
      </DialogContent>
    </Dialog>
  );
}

CopyLinkDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
