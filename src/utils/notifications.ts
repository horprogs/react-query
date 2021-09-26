import { toast } from 'react-toastify';

export const pushNotification = (msg: string, type: 'error' = 'error') => {
  toast.error(msg, {
    position: 'bottom-left',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
