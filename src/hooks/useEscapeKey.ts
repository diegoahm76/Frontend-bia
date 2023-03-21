import { useCallback, useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
const KEY_NAME_ESC = 'Escape';
// eslint-disable-next-line @typescript-eslint/naming-convention
const KEY_EVENT_TYPE = 'keyup';

export function useEscapeKey(handleClose: any): void {
  const handle_esc_key = useCallback(
    (event: any) => {
      if (event.key === KEY_NAME_ESC) {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    document.addEventListener(KEY_EVENT_TYPE, handle_esc_key, false);

    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handle_esc_key, false);
    };
  }, [handle_esc_key]);
}
