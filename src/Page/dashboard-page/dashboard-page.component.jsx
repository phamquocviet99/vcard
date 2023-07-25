import { CircularProgress, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { FcAddImage, FcRemoveImage } from "react-icons/fc";

import { useNavigate } from "react-router-dom";
import { PagePath } from "../../constant/page";
import {
  ConfirmHandle,
  ErrorPopUp,
  NotifyPopUp,
} from "../../functions/notification-fuction";
import { usePrivate } from "../../service/service";
import mylogoImage from "../../image/logo.png";
import { QRCode } from "react-qrcode-logo";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBin7Line } from "react-icons/ri";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

export const DashBoardPage = () => {
  const axiosPrivate = usePrivate();
  const [cardList, setCardList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [QRWidth, setQRWidth] = useState(
    window.innerWidth < 1250 ? (window.innerWidth < 950 ? 80 : 120) : 150
  );

  window.onresize = function (event) {
    if (event?.target?.innerWidth < 1250) {
      if (event?.target?.innerWidth < 950) {
        setQRWidth(80);
      } else {
        setQRWidth(120);
      }
    } else {
      setQRWidth(150);
    }
  };
  const navigate = useNavigate();

  const deleteData = async (id) => {
    setLoading(true);
    try {
      await axiosPrivate.delete("v-card/" + id).then((res) => {
        if (res?.data?.success) {
          getData();
          NotifyPopUp("Bạn đã xóa thành công VCard");
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
    setLoading(true);
    try {
      await axiosPrivate.get("v-card").then((res) => {
        if (res?.data?.success) {
          const { data } = res?.data;
          setCardList(data);
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="w-screen h-screen overflow-y-auto">
        <div className="w-full flex flex-col px-4 py-3 bg-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-semibold text-blue-600">
              Thông tin VCard
            </p>
            <p
              className="text-sm text-gray-500 underline cursor-pointer"
              onClick={() => {
                ConfirmHandle("Bạn muốn đăng xuất?", () => {
                  localStorage.removeItem("token");
                  navigate(PagePath.Authenticate, {
                    replace: true,
                  });
                });
              }}
            >
              Đăng xuất
            </p>
          </div>
          <p className="text-lg font-semibold text-black">Tạo VCard mới</p>
          <div
            className="w-[12vw] h-[15vw] bg-white flex justify-center items-center cursor-pointer rounded"
            onClick={() => navigate(PagePath.CreateCard)}
          >
            <FcAddImage className="text-4xl" />
          </div>
        </div>

        <div className="w-full px-4 py-3">
          <p className="text-lg font-semibold text-black">VCard đã tạo</p>

          {loading ? (
            <LoadingComponent />
          ) : (
            <div className="w-full flex flex-wrap">
              {cardList?.length === 0 && (
                <div className="w-full flex-col justify-center items-center">
                  <FcRemoveImage className="text-[3vw]" />
                  <p>Hiện tại bạn chưa có VCard nào</p>
                </div>
              )}
              {cardList?.map((e) => (
                <RecentCard
                  props={e}
                  size={QRWidth}
                  deleteData={() => deleteData(e?.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const RecentCard = ({ props, size, deleteData }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event?.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    event?.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <div
      className="relative w-[14vw] min-w-[110px] mx-2 my-2 border-gray-300 border-2 rounded cursor-pointer px-1 flex flex-col pb-4"
      onClick={() => navigate(PagePath.EditCard + "/" + props?.id)}
    >
      <div className="w-full h-[15vw] min-h-[115px] bg-white flex justify-center items-center">
        <QRCode
          logoImage={mylogoImage}
          logoPaddingStyle={"circle"}
          logoPadding={1}
          qrStyle={"square"}
          value={props?.QRcode?.url || ""}
          size={size}
        />
      </div>

      <p className="w-full text-sm font-semibold text-black line-clamp-2 text-center">
        {props?.nameCard}
      </p>

      <div className="absolute right-0 bottom-0">
        <div
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          className="p-1 rounded-full bg-white"
          onClick={handleClick}
        >
          <HiOutlineDotsHorizontal className="text-xl" />
        </div>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={(e) => {
              e?.stopPropagation();
              navigate(PagePath.EditCard + "/" + props?.id);
            }}
          >
            Chỉnh sửa
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e?.stopPropagation();
              handleClose();
              ConfirmHandle("Bạn có muốn xóa VCard?", deleteData);
            }}
          >
            Xóa
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

const LoadingComponent = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col items-center">
        <CircularProgress className="text-sm p-2" />
        <p className="text-base text-gray-500"> Đang tải </p>
      </div>
    </div>
  );
};
