import { ADD_TOAST, REMOVE_TOAST } from './toastsActionsTypes';

let ID = 0;

const defaultOptions = {
  severity: 'success',
  open: true,
  message: '',
};

function createToast(options = defaultOptions) {
  ID += 1;
  return {
    ...defaultOptions,
    ...options,
    id: ID,
  };
}

export function addToast(options) {
  return {
    payload: createToast(options),
    type: ADD_TOAST,
  };
}

export function removeToast(id) {
  return {
    payload: id,
    type: REMOVE_TOAST,
  };
}
