export const convertBase64ToFile = (base64String) => {
  const parts = base64String.split(";base64,");
  const contentType = parts[0].split(":")[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uint8Array = new Uint8Array(rawLength);
  for (let i = 0; i < rawLength; ++i) {
    uint8Array[i] = raw.charCodeAt(i);
  }
  return new File([uint8Array], "image", { type: contentType });
};

export const validateEmptyString = (val) => {
  return val?.trim() === "";
};
