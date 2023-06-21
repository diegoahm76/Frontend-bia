/* eslint-disable @typescript-eslint/naming-convention */

import { toast } from "react-toastify";
import { control_success } from "../controlSuccess";

    // Tests that success toast is displayed with correct message and options
    it("test_success_toast_displayed", () => {
      const message = "Success message";
      const toastSpy = jest.spyOn(toast, 'success');
      control_success(message);
      expect(toastSpy).toHaveBeenCalledWith(message, {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
      });
  });