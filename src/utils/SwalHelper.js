import 'regenerator-runtime/runtime';

import Swal from 'sweetalert2';

export default {
  success: async (message) => {
    Swal.fire({
      icon: 'success',
      title: message,
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: false,
    });
  },
  fail: async (message) => {
    await Swal.fire({
      icon: 'error',
      title: message,
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: false,
    });
  },
  error: async (title, message) => {
    await Swal.fire(title, message, 'error');
  },
};
