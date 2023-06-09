import React from "react";
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

export default function Vcard() {
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
                  src={require("../image/e3a20aaf-660d-4e10-892b-7ac2a5c9dff0.webp")}
                />
              </div>
              <p className="text-white font-bold text-center text-3xl mt-5">
                Trần Thị Hữu Ái
              </p>
              <p className="text-white font-medium text-center text-xl mt-5">
                Giám đốc
              </p>
              <p className="text-sm font-medium text-gray-white text-white text-center mt-2">
                Công ty Cổ Phần Flower Marketplace - FMP
              </p>

              <div className="flex py-3 justify-center my-5">
                <button
                  onClick={() => {
                    SaveCard();
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
                    href="tel:0983277941"
                    className="text-sm font-medium text-[#122C6C] cursor-pointer hover:underline"
                  >
                    0983277941
                  </a>
                  <p className="text-sm text-gray-400 mt-2">Điện thoại</p>
                </div>
              </div>
              <div
                style={{ height: "1px" }}
                className="bg-gray-300 w-full mt-3"
              />

              <div className="flex items-center w-full mt-7 gap-x-2">
                <div className="w-24 flex justify-start pl-6">
                  <SiZalo className="text-3xl text-gray-500" />
                </div>
                <div className="flex flex-col justify-start w-full">
                  <a
                    href="https://zalo.me/huuaicn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[#122C6C] cursor-pointer hover:underline"
                  >
                    Ái Trần - Vide
                  </a>
                  <p className="text-sm text-gray-400 mt-2">Zalo</p>
                </div>
              </div>
              <div
                style={{ height: "1px" }}
                className="bg-gray-300 w-full mt-3"
              />

              <div className="flex items-center w-full mt-7 gap-x-2">
                <div className="w-24 flex justify-start pl-6">
                  <BsFacebook className="text-3xl text-gray-500" />
                </div>
                <div className="flex flex-col justify-start w-full">
                  <a
                    href="https://www.facebook.com/ai.tran.986"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[#122C6C] cursor-pointer hover:underline"
                  >
                    AI Tran
                  </a>
                  <p className="text-sm text-gray-400 mt-2">Facebook</p>
                </div>
              </div>
              <div
                style={{ height: "1px" }}
                className="bg-gray-300 w-full mt-3"
              />

              <div className="flex items-center w-full mt-7 gap-x-2">
                <div className="w-24 flex justify-start pl-6">
                  <HiOutlineMail className="text-3xl text-gray-500" />
                </div>
                <div className="flex flex-col justify-start w-full">
                  <a
                    href="mailto: ctyfmp@gmail.com"
                    className="text-sm font-medium text-[#122C6C] cursor-pointer hover:underline"
                  >
                    ctyfmp@gmail.com
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
                    href="https://www.google.com/maps/place/1196+đường+3+tháng+2,+phường+8,+Quận+11,+TP.+Hồ+Chí+Minh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[#122C6C] cursor-pointer hover:underline"
                  >
                    1196 đường 3/2, phường 8, Quận 11, TP.HCM
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
