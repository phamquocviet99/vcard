import Resizer from "react-image-file-resizer";
import { v4 as uuidv4 } from "uuid";

export const resizeFile = (file) =>
  new Promise((resolve) => {
    const height = file.height;
    const width = file.width;
    const fileName = file.name + uuidv4();
    Resizer.imageFileResizer(
      file,
      height,
      width,
      "JPEG",
      80,
      0,
      (uri) => {
        resolve(new File([uri], `${fileName}.jpeg`, { type: "image/jpeg" }));
      },
      "file"
    );
  });
