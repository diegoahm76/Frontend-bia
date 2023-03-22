import { useState } from 'react';
import { type AuthHook } from '../interfaces/authModels';

export const use_rol = (): AuthHook => {
  const [is_captcha_valid, set_is_captcha_valid] = useState(false);
  const [open, set_open] = useState(false);

  return {
    set_is_captcha_valid,
    set_open,
    is_captcha_valid,
    open,
    // reintentos,
  };
};
