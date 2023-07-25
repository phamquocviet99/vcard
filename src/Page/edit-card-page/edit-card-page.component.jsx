import { useState } from "react";
import Swal from "sweetalert2";
import ModalUpdateAvatar from "./add-image-modal/add-image-modal.component";
import { FaImages } from "react-icons/fa";
import {
  Autocomplete,
  CircularProgress,
  Dialog,
  TextField,
} from "@mui/material";
import { SiMaildotru, SiZalo } from "react-icons/si";
import { AiFillFacebook, AiFillPhone, AiOutlineUserAdd } from "react-icons/ai";
import { ImPhone } from "react-icons/im";
import { TextInput } from "../../component/TextInput/TextInput.component";
import { BsFacebook } from "react-icons/bs";
import { HiLocationMarker, HiOutlineMail } from "react-icons/hi";
import bgImage from "../../image/e3a20aaf-660d-4e10-892b-7ac2a5c9dff0.webp";
import logoImage from "../../image/logo.png";
import "./create-card.style.css";
import { locations } from "../../constant/location";
import { ErrorPopUp, NotifyPopUp } from "../../functions/notification-fuction";
import { validateEmptyString } from "../../functions/format-function";
import { QRCode } from "react-qrcode-logo";
import UploadFile from "../../functions/load-image-function";
import { usePrivate } from "../../service/service";
import { useNavigate, useParams } from "react-router-dom";
import { PagePath } from "../../constant/page";
import { useEffect } from "react";
import { EmailRegex, PhoneRegex } from "../../constant/regex";

const defaultValue = {
  avatar: bgImage,
  city: "Thành phố Hồ Chí Minh",
  district: "Quận 11",
  ward: "phường 8",
  address: "1196 đường 3/2",
  name: "Trần Thị Hữu Ái",
  position: "Giám đốc",
  company: "Công ty cổ phần Flower Marketplace - FMP",
  phone: "0983277941",
  email: "ctyfmp@gmail.com",
  zaloName: "Ái Trần - Vide",
  zaloUrl: "https://zalo.me/huuaicn",
  fbName: "AI Tran",
  fbUrl: "https://www.facebook.com/ai.tran.986",
};

export const EditCardPage = () => {
  const { id } = useParams();
  const [openAvatar, setOpenAvatar] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState("");
  const [nameCard, setNameCard] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEMail] = useState("");
  const [zaloUrl, setZaloUrl] = useState("");
  const [zaloName, setZaloName] = useState("");
  const [fbUrl, setFbUrl] = useState("");
  const [fbName, setFbName] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(false);
  const [demoData, setDemoData] = useState(defaultValue);
  const [QRValue, setQRValue] = useState("");
  const [successDialog, setSuccessDialog] = useState(false);
  const axiosPrivate = usePrivate();
  const navigate = useNavigate();

  const handleSelectAvatar = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      if (
        file.type === "image/tiff" ||
        file.type === "image/bmp" ||
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/webp" ||
        file.type === "image/jfif"
      ) {
        setPreviewAvatar(file);
        setOpenAvatar(true);
      } else {
        Swal.fire({
          title: "Thất bại",
          text: "Mời bạn chọn lại hình ảnh đúng định dạng",
          icon: "error",
          confirmButtonText: "OK",
        });
        e.target.value = null;
      }
    }
    e.target.value = null;
  };

  const convertUrl = (imageObject) => {
    try {
      return URL.createObjectURL(imageObject);
    } catch {
      return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    }
  };

  const checkValid = () => {
    if (validateEmptyString(nameCard)) {
      NotifyPopUp("Vui lòng nhập tên của Vcard!");
      return false;
    }
    if (validateEmptyString(name)) {
      NotifyPopUp("Vui lòng nhập tên của bạn!");
      return false;
    }
    if (validateEmptyString(company)) {
      NotifyPopUp("Vui lòng nhập tên công ty bạn đang làm việc!");
      return false;
    }
    if (validateEmptyString(position)) {
      NotifyPopUp("Vui lòng nhập tên chức vụ bạn trong công ty!");
      return false;
    }
    if (validateEmptyString(phone)) {
      NotifyPopUp("Vui lòng nhập số điện thoại của bạn!");
      return false;
    }
    if (!PhoneRegex?.test(phone)) {
      NotifyPopUp("Số điện thoại không hợp lệ!");
      return false;
    }
    if (validateEmptyString(email)) {
      NotifyPopUp("Vui lòng nhập email của bạn!");
      return false;
    }
    if (!EmailRegex?.test(email)) {
      NotifyPopUp("Email không hợp lệ!");
      return false;
    }
    if (
      validateEmptyString(city) ||
      validateEmptyString(district) ||
      validateEmptyString(ward) ||
      validateEmptyString(address)
    ) {
      NotifyPopUp("Vui lòng hoàn điền đầy đủ địa chỉ của bạn!");
      return false;
    }
    return true;
  };

  const submitData = () => {
    let data = {
      nameUser: name,
      nameCard: nameCard,
      nameCompany: company,
      email: email,
      position: position,
      phone: phone,
      location: address + ", " + ward + ", " + district + ", " + city,
    };

    if (!validateEmptyString(zaloUrl)) {
      data = {
        ...data,
        zalo: JSON.stringify({
          name: zaloName,
          url: zaloUrl,
        }),
      };
    }

    if (!validateEmptyString(fbUrl)) {
      data = {
        ...data,
        facebook: JSON.stringify({
          name: fbName,
          url: fbUrl,
        }),
      };
    }

    if (previewAvatar !== "") {
      data = {
        ...data,
        logo: previewAvatar,
      };
    }

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    submitCard(formData);
  };

  const submitCard = async (data) => {
    setLoading(true);

    try {
      await axiosPrivate.put("v-card/" + id, data).then((res) => {
        if (res?.data?.success) {
          axiosPrivate
            .put("v-card/" + res?.data?.data?.id, {
              ...res?.data?.data,
              QRcode: {
                url: window?.location?.href?.replace("edit-card", "v-card"),
              },
            })
            .then((updateRes) => {
              if (updateRes?.data?.success) {
                setQRValue(
                  window?.location?.href?.replace("edit-card", "v-card")
                );
                setSuccessDialog(true);
              } else {
                ErrorPopUp(updateRes?.data?.message);
              }
            });
        } else {
          ErrorPopUp(res?.data?.message);
        }
        setLoading(false);
      });
    } catch (err) {
      ErrorPopUp(err?.response?.data?.message);
      setLoading(false);
    }
  };

  const getData = async () => {
    setFirstLoading(true);
    try {
      await axiosPrivate.get("v-card/" + id).then((res) => {
        if (res?.data?.success) {
          const { data } = res?.data;
          setNameCard(data?.nameCard);
          setName(data?.nameUser);
          setPosition(data?.position);
          setCompany(data?.nameCompany);
          setEMail(data?.email);
          setPhone(data?.phone);

          const locationList = data?.location?.split(", ");
          const zalo = data?.zalo ? JSON.parse(data?.zalo) : "";
          const facebook = data?.facebook ? JSON.parse(data?.facebook) : "";

          if (
            locationList[0] &&
            locationList[1] &&
            locationList[2] &&
            locationList[3]
          ) {
            setAddress(locationList[0]);
            setWard(locationList[1]);
            setDistrict(locationList[2]);
            setCity(locationList[3]);
            setDemoData({
              ...data,
              avatar: data?.logo,
              address: locationList[0],
              ward: locationList[1],
              district: locationList[2],
              city: locationList[3],
              name: data?.nameUser,
              company: data?.nameCompany,
              zaloUrl: zalo?.url,
              fbUrl: facebook?.url,
              zaloName: zalo?.name,
              fbName: facebook?.name,
            });
          }

          if (zalo?.url) {
            setZaloUrl(zalo?.url);
          }
          if (zalo?.name) {
            setZaloName(zalo?.name);
          }
          if (facebook?.url) {
            setFbUrl(facebook?.url);
          }
          if (facebook?.name) {
            setFbName(facebook?.name);
          }
        } else {
          ErrorPopUp(res?.data?.message);
          navigate(PagePath.Dashboard, {
            replace: true,
          });
        }

        setFirstLoading(false);
      });
    } catch (err) {
      ErrorPopUp(err?.response?.data?.message);
      navigate(PagePath.Dashboard, {
        replace: true,
      });
      setFirstLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return firstLoading ? (
    <>
      <LoadingComponent />
    </>
  ) : (
    <>
      <ModalUpdateAvatar
        visible={openAvatar}
        onClose={() => setOpenAvatar(false)}
        setPreviewAvatar={(e) => setPreviewAvatar(e)}
        image={previewAvatar}
      />
      <Dialog onClose={() => {}} open={successDialog}>
        <div className="px-5 py-2 bg-white flex flex-col justify-center items-center">
          <p className="py-2 text-lg text-blue-600 font-semibold text-center">
            Bạn đã tạo thành công VCard
          </p>
          <QRCode
            id="VCard"
            logoImage={logoImage}
            logoPaddingStyle={"circle"}
            logoPadding={1}
            qrStyle={"square"}
            value={QRValue}
          />

          <button
            className="text-sm text-blue-500"
            onClick={() => {
              const canvas = document.getElementById("VCard");
              const pngUrl = canvas
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
              let downloadLink = document.createElement("a");
              downloadLink.href = pngUrl;
              downloadLink.download = `${name?.trim() || "QR"}.png`;
              document.body.appendChild(downloadLink);
              downloadLink.click();
              document.body.removeChild(downloadLink);
            }}
          >
            Tải mã QR
          </button>
          <br />
          <button
            className="px-5 py-2 bg-blue-600 text-white mt-5"
            onClick={() => {
              setSuccessDialog(false);
              navigate(PagePath.Dashboard, {
                replace: true,
              });
            }}
          >
            Xác nhận
          </button>
        </div>
      </Dialog>
      <div className="w-screen h-screen overflow-y-auto bg-gray-200 px-6">
        <div className="flex flex-col xl:flex-row gap-3">
          <div className="my-3 px-4 py-4 rounded bg-white self-center w-[100%] xl:w-2/3 h-fit">
            <p className="text-lg font-semibold text-black">Thông tin VCard</p>
            <div className="flex-1">
              <TextInput
                label={"Tên Vcard"}
                require={true}
                onChange={(e) => setNameCard(e)}
                value={nameCard}
              />
            </div>
            <p className="text-base font-semibold text-black">Hình đại diện</p>
            <div className="relative w-fit h-fit">
              <img
                alt=""
                src={
                  previewAvatar !== ""
                    ? convertUrl(previewAvatar)
                    : demoData?.avatar
                }
                className="w-40 h-40 rounded-full"
              />
              <div className="rounded-full absolute bottom-0 right-0 bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 image-upload w-10 h-10">
                <label htmlFor="file-input">
                  <FaImages className="text-2xl text-gray-600 cursor-pointer mt-2" />
                </label>
                <input
                  className="hidden"
                  onChange={(e) => handleSelectAvatar(e)}
                  accept="image/*"
                  id="file-input"
                  type="file"
                />
              </div>
            </div>

            <div className="py-2 mt-5">
              <p className="text-base font-semibold text-black">
                Thông tin của bạn
              </p>

              <div className="flex-1">
                <TextInput
                  label={"Họ và tên"}
                  require={true}
                  onChange={(e) => setName(e)}
                  value={name}
                />
              </div>
              <div className="flex-1">
                <TextInput
                  value={position}
                  label={"Chức vụ"}
                  require={true}
                  onChange={(e) => setPosition(e)}
                />
              </div>
              <div className="flex-1">
                <TextInput
                  value={company}
                  label={"Công ty"}
                  require={true}
                  onChange={(e) => setCompany(e)}
                />
              </div>
            </div>

            <div className="py-2 mt-5">
              <p className="text-base font-semibold text-black">
                Thông tin liên hệ
              </p>

              <p className="text-sm font-semibold text-black">Số điện thoại</p>
              <div className="flex gap-5">
                <div className="py-2">
                  <ImPhone className="text-4xl text-blue-500 p-1" />
                </div>

                <div className="flex-1">
                  <TextInput
                    value={phone}
                    label={"Số điện thoại"}
                    require={true}
                    onChange={(e) => setPhone(e)}
                  />
                  <br />
                </div>
              </div>

              <br />
              <p className="text-sm font-semibold text-black">Email</p>
              <div className="flex gap-5">
                <div className="py-2">
                  <SiMaildotru className="text-4xl text-blue-500 p-1" />
                </div>

                <div className="flex-1">
                  <TextInput
                    value={email}
                    label={"Email"}
                    require={true}
                    onChange={(e) => setEMail(e)}
                  />
                  <br />
                </div>
              </div>

              <br />
              <p className="text-sm font-semibold text-black">Mang xã hội</p>

              <div className="flex gap-5">
                <div className="py-2">
                  <SiZalo className="text-4xl text-blue-500 border-2 border-blue-500 rounded-lg p-1" />
                </div>

                <div className="flex-1">
                  <TextInput
                    value={zaloUrl}
                    label={"URL"}
                    onChange={(e) => setZaloUrl(e)}
                  />

                  <TextInput
                    value={zaloName}
                    label={"Tên hiển thị"}
                    onChange={(e) => setZaloName(e)}
                  />
                  <br />
                </div>
              </div>

              <div className="flex gap-5">
                <div className="py-2">
                  <AiFillFacebook className="text-4xl text-blue-500" />
                </div>

                <div className="flex-1">
                  <TextInput
                    value={fbUrl}
                    label={"URL"}
                    onChange={(e) => setFbUrl(e)}
                  />

                  <TextInput
                    value={fbName}
                    label={"Tên hiển thị"}
                    onChange={(e) => setFbName(e)}
                  />
                  <br />
                </div>
              </div>
            </div>

            <p className="text-sm font-semibold text-black my-4">Địa chỉ</p>

            <Autocomplete
              options={locations.map((option) => option.province)}
              onChange={(event, e) => {
                setCity(e);
                setDistrict("");
                setWard("");
              }}
              value={city}
              clearIcon={false}
              inputMode="none"
              renderInput={(params) => (
                <TextField {...params} label="Thành phố/Tỉnh *" />
              )}
              className="my-3"
            />

            <Autocomplete
              id="free-solo-demo"
              value={district}
              clearIcon={false}
              inputMode="none"
              options={
                locations
                  ?.find((e) => e?.province === city)
                  ?.districts?.map((option) => option?.district) || []
              }
              onChange={(event, e) => {
                setDistrict(e);
                setWard("");
              }}
              renderInput={(params) => (
                <TextField {...params} label="Quận/Huyện *" />
              )}
              className="my-3"
            />

            <Autocomplete
              id="free-solo-demo"
              value={ward}
              clearIcon={false}
              inputMode="none"
              options={
                locations
                  ?.find((e) => e?.province === city)
                  ?.districts?.find((e) => e?.district === district)
                  ?.wards?.map((option) => option?.ward) || []
              }
              onChange={(event, e) => {
                setWard(e);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Xã/Phường *" />
              )}
              className="my-3"
            />

            <TextInput
              value={address}
              label={"Địa chỉ"}
              require={true}
              onChange={(e) => setAddress(e)}
            />

            <div className="flex gap-5">
              <button
                className="w-40 h-10 bg-blue-600 text-white rounded"
                onClick={() => {
                  if (checkValid()) {
                    setDemoData({
                      avatar:
                        previewAvatar !== ""
                          ? convertUrl(previewAvatar)
                          : demoData?.avatar,
                      city: city,
                      district: district,
                      ward: ward,
                      address: address,
                      name: name,
                      position: position,
                      company: company,
                      phone: phone,
                      email: email,
                      zaloName: zaloName,
                      zaloUrl: zaloUrl,
                      fbName: fbName,
                      fbUrl: fbUrl,
                    });
                  }
                }}
              >
                Xem trước
              </button>

              <button
                disabled={loading}
                className="w-40 h-10 bg-blue-600 rounded text-white text-center"
                onClick={() => {
                  if (checkValid()) {
                    submitData();
                  }
                }}
              >
                {loading ? (
                  <CircularProgress className="text-sm p-2 text-white" />
                ) : (
                  " Sửa thông tin VCard"
                )}
              </button>
            </div>
          </div>

          <div
            id="phone"
            className="h-fit py-3 flex-1 bg-[#F7F7F7] flex justify-center items-center sticky top-0 mt-3 rounded"
          >
            <div className="w-[250px] h-[503px] overflow-auto bg-[url('image/phone-bg.png')] object-cover bg-cover flex justify-center items-center">
              <div className="w-[228px] h-[442px] ml-[2px] mt-[33px] rounded-b-[29px] overflow-x-hidden">
                <Demo props={demoData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Demo = ({ props }) => {
  console.log(props);
  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="relative justify-center pb-[16px]">
        <div className="w-full">
          <div className="w-full bg-[#122C6C]  flex justify-center">
            <div className="max-w-md">
              <div className="flex justify-center w-full mt-[16px]">
                <img
                  className=" border-white border-[8px] h-[100px] w-[100px] rounded-full object-cover"
                  alt=""
                  src={props?.avatar}
                />
              </div>
              <p className="text-white font-bold text-center text-[20px] mt-[10px]">
                {props?.name}
              </p>
              <p className="text-white font-medium text-center text-[14px] mt-[10px]">
                {props?.position}
              </p>
              <p className="text-[9px] font-medium text-gray-white text-white text-center mt-[2px]">
                {props?.company}
              </p>

              <div className="flex py-[2px] justify-center my-[13px]">
                <button className="py-[4px] px-[20px] flex items-center justify-center gap-[4px] rounded-lg text-white bg-[#f25b18] hover:bg-orange-700 font-medium text-[11px]">
                  <AiOutlineUserAdd className="text-[13px]" /> Thêm liên hệ
                </button>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center ">
            <div className="max-w-md mx-[10px] w-full ">
              <div className="flex items-center w-full mt-[14px] gap-x-[4px]">
                <div className="w-[60px] flex justify-start pl-[15px] mb-[15px]">
                  <AiFillPhone className="text-[20px] text-gray-500" />
                </div>
                <div className="flex flex-col justify-start w-full">
                  <a
                    href={"tel:" + props?.phone}
                    className="text-[10px] font-medium text-[#122C6C] cursor-pointer hover:underline"
                  >
                    {props?.phone}
                  </a>
                  <p className="text-[10px] text-gray-400 mt-[4px]">
                    Điện thoại
                  </p>
                </div>
              </div>
              <div
                style={{ height: "1px" }}
                className="bg-gray-300 w-full mt-[2px]"
              />

              {props?.zaloUrl && (
                <>
                  <div className="flex items-center w-full mt-[14px] gap-x-[4px]">
                    <div className="w-[60px] flex justify-start pl-[15px] mb-[15px]">
                      <SiZalo className="text-[20px] text-gray-500" />
                    </div>
                    <div className="flex flex-col justify-start w-full">
                      <a
                        href={props?.zaloUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-medium text-[#122C6C] cursor-pointer hover:underline"
                      >
                        {props?.zaloName || props?.name}
                      </a>
                      <p className="text-[10px] text-gray-400 mt-[4px]">Zalo</p>
                    </div>
                  </div>
                  <div
                    style={{ height: "1px" }}
                    className="bg-gray-300 w-full mt-[2px]"
                  />
                </>
              )}

              {props?.fbUrl && (
                <>
                  <div className="flex items-center w-full mt-[14px] gap-x-[4px]">
                    <div className="w-[60px] flex justify-start pl-[15px] mb-[15px]">
                      <BsFacebook className="text-[20px] text-gray-500" />
                    </div>
                    <div className="flex flex-col justify-start w-full">
                      <a
                        href={props?.fbUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-medium text-[#122C6C] cursor-pointer hover:underline"
                      >
                        {props?.fbName || props?.name}
                      </a>
                      <p className="text-[10px] text-gray-400 mt-[4px]">
                        Facebook
                      </p>
                    </div>
                  </div>
                  <div
                    style={{ height: "1px" }}
                    className="bg-gray-300 w-full mt-[2px]"
                  />
                </>
              )}

              <div className="flex items-center w-full mt-[14px] gap-x-[4px]">
                <div className="w-[60px] flex justify-start pl-[15px] mb-[15px]">
                  <HiOutlineMail className="text-[20px] text-gray-500" />
                </div>
                <div className="flex flex-col justify-start w-full">
                  <a
                    href={"mailto: " + props?.email}
                    className="text-[10px] font-medium text-[#122C6C] cursor-pointer hover:underline"
                  >
                    {props?.email}
                  </a>
                  <p className="text-[10px] text-gray-400 mt-[4px]">Email</p>
                </div>
              </div>
              <div
                style={{ height: "1px" }}
                className="bg-gray-300 w-full mt-[2px]"
              />

              <div className="flex items-center w-full mt-[14px] gap-x-[4px]">
                <div className="w-[60px] flex justify-start pl-[15px] mb-[15px]">
                  <HiLocationMarker className="text-[20px] text-gray-500" />
                </div>
                <div className="flex flex-col justify-start w-full">
                  <a
                    href="https://www.google.com/maps/place/1196+đường+3+tháng+2,+phường+8,+Quận+11,+TP.+Hồ+Chí+Minh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-medium text-[#122C6C] cursor-pointer hover:underline"
                  >
                    {props?.address}, {props?.ward}, {props?.district},{" "}
                    {props?.city}
                  </a>
                  <p className="text-[10px] text-gray-400 mt-[4px]">Vị trí</p>
                </div>
              </div>
              <div
                style={{ height: "1px" }}
                className="bg-gray-300 w-full mt-[2px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingComponent = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex flex-col items-center justify-center ">
        <CircularProgress className="text-sm p-2" />
        <p className="text-base text-gray-500"> Đang tải </p>
      </div>
    </div>
  );
};
