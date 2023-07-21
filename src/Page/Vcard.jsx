import React, { useEffect } from "react";
import {
  BsFacebook,
  BsFillTelephoneFill,
  BsPersonWorkspace,
} from "react-icons/bs";
import { AiFillPhone, AiOutlineUserAdd } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { HiOutlineMail, HiLocationMarker } from "react-icons/hi";
import { SiZalo } from "react-icons/si";
import { SaveCard } from "./VCardContent";
import { useState } from "react";
import { axiosClient, usePrivate } from "../service/service";
import { useParams } from "react-router-dom";
import { ErrorPopUp } from "../functions/notification-fuction";

export default function Vcard() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const getData = async () => {
    setLoading(true);
    try {
      await axiosClient.get("/v-card/" + id).then((res) => {
        if (res?.data?.success) {
          const zalo = res?.data?.data?.zalo
            ? JSON.parse(res?.data?.data?.zalo)
            : "";
          const facebook = res?.data?.data?.facebook
            ? JSON.parse(res?.data?.data?.facebook)
            : "";

          setData({
            ...res?.data?.data,
            zalo: {
              url: zalo?.url,
              name: zalo?.name,
            },
            facebook: {
              url: facebook?.url,
              name: facebook?.name,
            },
          });
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

  console.log(data);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-screen h-screen overflow-y-auto">
      <div className="relative 2xl:flex justify-center pb-10">
        <div className="w-full">
          <div className="w-full bg-[#122C6C]  flex justify-center">
            <div className="max-w-md">
              <div className="flex justify-center w-full mt-10">
                <img
                  className=" border-white border-8 h-28 w-28 rounded-full object-cover"
                  alt=""
                  src={data?.logo}
                />
              </div>
              <p className="text-white font-bold text-center text-3xl mt-5">
                {data?.nameUser}
              </p>
              <p className="text-white font-medium text-center text-xl mt-5">
                {data?.position}
              </p>
              <p className="text-sm font-medium text-gray-white text-white text-center mt-2">
                {data?.nameCompany}
              </p>

              <div className="flex py-3 justify-center my-5">
                <button
                  onClick={() => {
                    SaveCard(
                      data?.nameUser,
                      data?.nameCompany,
                      data?.position,
                      data?.email,
                      data?.phone,
                      data?.location
                    );
                  }}
                  className="py-3 px-20 flex items-center justify-center gap-2 rounded-lg text-white bg-[#f25b18] hover:bg-orange-700 font-medium"
                >
                  {" "}
                  <AiOutlineUserAdd className="text-xl" /> Thêm liên hệ
                </button>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center ">
            <div className="max-w-md mx-5 w-full ">
              <div className="flex items-center w-full mt-7 gap-x-2">
                <div className="w-24 flex justify-start pl-6">
                  <AiFillPhone className="text-3xl text-gray-500" />
                </div>
                <div className="flex flex-col justify-start w-full">
                  <a
                    href={"tel:" + data?.phone}
                    className="text-sm font-medium text-[#122C6C] cursor-pointer hover:underline"
                  >
                    {data?.phone}
                  </a>
                  <p className="text-sm text-gray-400 mt-2">Điện thoại</p>
                </div>
              </div>
              <div
                style={{ height: "1px" }}
                className="bg-gray-300 w-full mt-3"
              />

              {data?.zalo?.url && (
                <>
                  <div className="flex items-center w-full mt-7 gap-x-2">
                    <div className="w-24 flex justify-start pl-6">
                      <SiZalo className="text-3xl text-gray-500" />
                    </div>
                    <div className="flex flex-col justify-start w-full">
                      <a
                        href={data?.zalo?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-[#122C6C] cursor-pointer hover:underline"
                      >
                        {data?.zalo?.name || data?.nameUser}
                      </a>
                      <p className="text-sm text-gray-400 mt-2">Zalo</p>
                    </div>
                  </div>
                  <div
                    style={{ height: "1px" }}
                    className="bg-gray-300 w-full mt-3"
                  />
                </>
              )}

              {data?.facebook?.url && (
                <>
                  <div className="flex items-center w-full mt-7 gap-x-2">
                    <div className="w-24 flex justify-start pl-6">
                      <BsFacebook className="text-3xl text-gray-500" />
                    </div>
                    <div className="flex flex-col justify-start w-full">
                      <a
                        href={data?.facebook?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-[#122C6C] cursor-pointer hover:underline"
                      >
                        {data?.facebook?.name || data?.nameUser}
                      </a>
                      <p className="text-sm text-gray-400 mt-2">Facebook</p>
                    </div>
                  </div>
                  <div
                    style={{ height: "1px" }}
                    className="bg-gray-300 w-full mt-3"
                  />
                </>
              )}

              <div className="flex items-center w-full mt-7 gap-x-2">
                <div className="w-24 flex justify-start pl-6">
                  <HiOutlineMail className="text-3xl text-gray-500" />
                </div>
                <div className="flex flex-col justify-start w-full">
                  <a
                    href={"mailto: " + data?.email}
                    className="text-sm font-medium text-[#122C6C] cursor-pointer hover:underline"
                  >
                    {data?.email}
                  </a>
                  <p className="text-sm text-gray-400 mt-2">Email</p>
                </div>
              </div>
              <div
                style={{ height: "1px" }}
                className="bg-gray-300 w-full mt-3"
              />

              <div className="flex items-center w-full mt-7 gap-x-2">
                <div className="w-24 flex justify-start pl-6">
                  <HiLocationMarker className="text-3xl text-gray-500" />
                </div>
                <div className="flex flex-col justify-start w-full">
                  <a
                    href={
                      "https://www.google.com/maps/place/" +
                      data?.location?.replaceAll(" ", "+")
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[#122C6C] cursor-pointer hover:underline"
                  >
                    {data?.location}
                  </a>
                  <p className="text-sm text-gray-400 w-fit  mt-2">Vị trí</p>
                </div>
              </div>
              <div
                style={{ height: "1px" }}
                className="bg-gray-300 w-full mt-3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
