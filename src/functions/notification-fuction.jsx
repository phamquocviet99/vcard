import Swal from "sweetalert2";

export const NotifyPopUp = (title = "", content = "") => {
  return Swal.fire({
    title: title,
    text: content,
    icon: "info",
    confirmButtonText: "Xác nhận",
  });
};

export const ErrorPopUp = (content = "") => {
  return Swal.fire({
    title: "Xảy ra lỗi",
    text: content,
    icon: "error",
    confirmButtonText: "Xác nhận",
  });
};
