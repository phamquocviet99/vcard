import React from "react";
import { BsFillTelephoneFill, BsPersonWorkspace } from "react-icons/bs";
import { AiFillPhone, AiOutlineUserAdd } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { HiOutlineMail, HiLocationMarker } from "react-icons/hi";
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
              <div className="flex justify-center flex-wrap items-center text-white w-fit mt-14 mx-5 mb-10">
                <a
                  href="tel:0983277941"
                  className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  <BsFillTelephoneFill className="text-base" />
                  <p className="text-base">Call</p>
                </a>
                <a
                  href="mailto: ctyfmp@gmail.com"
                  className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  <MdEmail className="text-xl" />
                  <p className="text-base">Email</p>
                </a>
                <a
                  href="https://www.google.com/maps/place/1196+đường+3+tháng+2,+phường+8,+Quận+11,+TP.+Hồ+Chí+Minh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  <HiLocationMarker className="text-xl" />
                  <p className="text-base">Location</p>
                </a>
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
                  <p className="text-sm font-medium text-gray-800">
                    0983277941
                  </p>
                  <p className="text-sm text-gray-400 mt-2">Điện thoại</p>
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
                  <p className="text-sm font-medium text-gray-800">
                    ctyfmp@gmail.com
                  </p>
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
                  <p className="text-sm font-medium text-gray-800">
                    1196 đường 3/2, phường 8, Quận 11, TP.HCM
                  </p>
                  <a
                    href="https://www.google.com/maps/place/1196+đường+3+tháng+2,+phường+8,+Quận+11,+TP.+Hồ+Chí+Minh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 cursor-pointer w-fit hover:underline mt-2"
                  >
                    Bản đồ
                  </a>
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
      <div className="absolute lg:flex lg:relative bottom-1 right-4 lg:justify-center my-5">
        <button
          onClick={() => SaveCard()}
          className="py-3 px-4 flex items-center justify-center gap-2 rounded-lg text-white bg-[#f25b18] hover:bg-orange-700 font-medium"
        >
          {" "}
          <AiOutlineUserAdd className="text-xl" /> Thêm liên hệ
        </button>
      </div>
    </div>
  );
}
