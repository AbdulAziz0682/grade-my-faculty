/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { removeToast } from '../redux/toastsActions';

import Toast from './Toast';

export default function Toasts() {
  const dispatch = useDispatch();
  const toasts = useSelector((state) => state.toasts);
  return (
    <ul style={{ display: 'flex', flexDirection: 'flex-column', gap: '1.5rem' }}>
      {toasts.map((toast) => {
        const { id } = toast;
        return (
          <Toast {...toast} key={id} onDismissClick={() => dispatch(removeToast(id))} />
        );
      })}
    </ul>
  );
}

Toasts.propTypes = {
  actions: PropTypes.shape({
    removeToast: PropTypes.func.isRequired,
  }).isRequired,
};
