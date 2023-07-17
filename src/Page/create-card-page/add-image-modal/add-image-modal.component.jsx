import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import AvatarEditor from "react-avatar-editor";
import { IoAddSharp, IoRemoveOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import { convertBase64ToFile } from "../../../functions/format-function";
import { resizeFile } from "../../../functions/resize-function";

export default function ModalUpdateAvatar({
  visible,
  onClose,
  image,
  setPreviewAvatar,
}) {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [scale, setScale] = useState(1);
  const editorRef = useRef(null);
  useEffect(() => {
    if (visible) {
      setLoading(false);
      return () => {
        setScale(1);
        setLoading(false);
        setDisabled(false);
      };
    }
  }, [visible]);
  if (!visible) return null;
  function handleClose(e) {
    if (e.target.id === "background-add-card") onClose();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setDisabled(true);
    try {
      const canvas = editorRef.current.getImage();
      const imageA = canvas.toDataURL();
      const file = convertBase64ToFile(imageA);
      const uploadImage = await resizeFile(file);
      const formData = new FormData();
      formData.append("file", uploadImage);
      setPreviewAvatar(uploadImage);
      setLoading(false);
      setDisabled(false);
      onClose();
    } catch (error) {
      setLoading(false);
      setDisabled(false);
      Swal.fire({
        title: "Thất bại trong quá trình cập nhật ảnh",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }
  function ImageEditor() {
    try {
      return (
        <AvatarEditor
          ref={editorRef}
          image={
            URL.createObjectURL(image) ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          width={250}
          height={250}
          border={10}
          borderRadius={200}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={scale}
          rotate={0}
        />
      );
    } catch (error) {
      return (
        <AvatarEditor
          ref={editorRef}
          image={
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          width={250}
          height={250}
          border={10}
          borderRadius={200}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={scale}
          rotate={0}
        />
      );
    }
  }
  return (
    <div
      id="background-add-card"
      onClick={handleClose}
      className="fixed z-50 inset-0 bg-black bg-opacity-25 flex justify-center items-center backdrop-blur-sm"
    >
      <form
        onSubmit={handleSubmit}
        className=" bg-white rounded-md overflow-y-scroll h-3/4 md:overflow-y-hidden md:h-auto  w-11/12 md:w-3/5 xl:w-1/3"
      >
        <div className="flex justify-between items-center bg-blue-500 text-white shadow-md">
          <p className="text-center text-xl mb-0 whitespace-nowrap font-medium ml-5">
            CẬP NHẬT ẢNH ĐẠI DIỆN
          </p>

          <button
            onClick={onClose}
            className="   h-9 w-9 flex justify-center items-center m-2 focus:ring-0"
          >
            <i className="fa-solid fa-xmark text-2xl "></i>
          </button>
        </div>
        <div className="line-y"></div>
        <div className="pl-4 pr-4 pb-4 text-gray-600 mt-5 font-medium w-full">
          <div className="flex justify-center w-full "> {ImageEditor()}</div>
          <div className="flex justify-center w-full px-10 mt-5 gap-x-2 ">
            <button
              type="button"
              disabled={scale <= 1}
              onClick={() => setScale(scale - 0.05)}
              className={`rounded-full hover:bg-gray-100 p-1 ${
                scale <= 1
                  ? "cursor-not-allowed text-gray-300"
                  : "text-gray-600"
              }`}
            >
              <IoRemoveOutline className="text-xl" />
            </button>
            <input
              className="w-full cursor-pointer "
              type="range"
              min={1}
              max={3}
              step={0.05}
              value={scale}
              onChange={(e) => setScale(e.target.value)}
            />
            <button
              type="button"
              disabled={scale >= 3}
              onClick={() => setScale(scale + 0.05)}
              className={`rounded-full hover:bg-gray-100 p-1 ${
                scale >= 3
                  ? "cursor-not-allowed text-gray-300"
                  : "text-gray-600"
              }`}
            >
              <IoAddSharp className="text-xl" />
            </button>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              title="Trở về trang trước"
              onClick={onClose}
              className="ml-2 shadow-md bg-gray-400 hover:bg-gray-400 text-white font-base py-2 px-3 rounded "
            >
              Hủy
            </button>
            {loading ? (
              <button
                type="button"
                disabled
                className={` ml-2 flex items-center shadow-md  text-white font-base py-2 px-3  rounded bg-blue-500  ${
                  !loading
                    ? "hover:bg-blue-600"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                Lưu
              </button>
            ) : (
              <button
                disabled={disabled}
                type="submit"
                title="Cập nhật ảnh đại diện"
                className=" ml-2 shadow-md  text-white font-base py-2 px-3  rounded bg-blue-500 hover:bg-blue-600"
              >
                Lưu
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
