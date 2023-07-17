import Resizer from "react-image-file-resizer";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import { storage } from "../firebase.config";

const UploadFile = {
  uploadSingleFile: async (file, url) => {
    if (!file) return;

    const fileName = file.name + uuidv4();
    const storageRef = ref(storage, `images/${url}/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        Swal.fire({
          title: "Thất bại",
          text: error,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    );
    await uploadTask;
    let downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    let imageData = { name: fileName, url: downloadURL };
    return imageData;
  },
  uploadMultiFile: async (images, url) => {
    if (!images) return;
    const listFiles = [];
    for (const file of images) {
      const image = await resizeFile(file);

      const fileName = image.name + uuidv4();
      const storageRef = ref(storage, `${url}/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => console.log(error)
      );
      await uploadTask;
      let downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      let imageData = { name: fileName, url: downloadURL };

      listFiles.push(imageData);
    }
    return listFiles;
  },
  updateSingleFile: async (file, url) => {
    if (!file) return;
    const storageRef = ref(storage, `images/${url}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => console.log(error)
    );
    try {
      await uploadTask;
      return true;
    } catch (error) {
      return false;
    }

    // let downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    // // let imageData = { name: fileName, url: downloadURL };
    // return true;
  },
  deleteFile: async (url, callbackFunction) => {
    try {
      const imageRef = ref(storage, `images/${url}`);

      await deleteObject(imageRef);

      console.log("File deleted successfully.");
      callbackFunction();
    } catch (error) {
      console.log(`Error deleting file: ${error}`);
    }
  },
};

export const resizeFile = (file) =>
  new Promise((resolve) => {
    const height = file.height;
    const width = file.width;
    Resizer.imageFileResizer(
      file,
      height,
      width,
      "JPEG",
      80,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });

export const ErrorHandle = (content) => {
  return Swal.fire({
    title: "Thát bại",
    text: "Đã xảy ra lỗi, ERR: " + content || "",
    icon: "error",
    confirmButtonText: "Xác nhận",
  });
};

export const SuccessHandle = (content) => {
  return Swal.fire({
    title: "Thành công",
    text: content,
    icon: "success",
    confirmButtonText: "Xác nhận",
  });
};

export const ConfirmHandle = (title, onConfirm) => {
  return Swal.fire({
    text: title || "",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Xác nhận",
    cancelButtonText: "Hủy bỏ",
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm && onConfirm();
    }
  });
};

export default UploadFile;
