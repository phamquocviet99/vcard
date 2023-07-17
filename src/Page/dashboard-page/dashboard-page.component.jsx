import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { FcAddImage, FcRemoveImage } from "react-icons/fc";

import { useNavigate } from "react-router-dom";
import { PagePath } from "../../constant/page";
import { ErrorPopUp } from "../../functions/notification-fuction";
import { usePrivate } from "../../service/service";
import mylogoImage from "../../image/logo.png";
import { QRCode } from "react-qrcode-logo";

export const DashBoardPage = () => {
  const axiosPrivate = usePrivate();
  const [cardList, setCardList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [QRWidth, setQRWidth] = useState(150);

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
      ErrorPopUp(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="w-screen h-screen overflow-y-auto">
        <div
          className="w-full px-4 py-3 bg-gray-200 cursor-pointer"
          onClick={() => navigate(PagePath.CreateCard)}
        >
          <p className="text-lg font-semibold text-black">Tạo VCard mới</p>
          <div className="w-[12vw] h-[15vw] bg-white flex justify-center items-center cursor-pointer rounded">
            <FcAddImage className="text-[3vw]" />
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
                <RecentCard props={e} size={QRWidth} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const RecentCard = ({ props, size }) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-[14vw] min-w-[110px] mx-2 my-2 border-gray-300 border-2 rounded cursor-pointer px-1"
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
      <p className="w-full text-sm font-semibold text-black pt-2 line-clamp-2 text-center">
        {props?.nameCard}
      </p>
    </div>
  );
};

const LoadingComponent = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="flex-col items-center">
        <CircularProgress className="text-sm p-2" />
        <p className="text-base text-gray-500"> Đang tải </p>
      </div>
    </div>
  );
};
