let EmailRegex = /\S+@\S+\.\S+/;
import { toast } from "react-hot-toast";

class FormHelper {
  IsEmpty(value) {
    return value.length === 0;
  }

  IsEmail(value) {
    return !EmailRegex.test(value);
  }

  IsPassword(value) {
    return value.length === 6;
  }

  ErrorToast(msg) {
    toast.error(msg, { position: "bottom-center" });
  }

  SuccessToast(msg) {
    toast.success(msg, { position: "bottom-center" });
  }
}

export const { IsEmpty, IsEmail, IsPassword, ErrorToast, SuccessToast } =
  new FormHelper();
