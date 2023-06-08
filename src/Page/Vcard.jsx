import React from "react";
import { BsFillTelephoneFill, BsPersonWorkspace } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { AiFillPhone } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { ImLocation2 } from "react-icons/im";
import { BiSolidShoppingBag } from "react-icons/bi";
export default function Vcard() {
  return (
    <div className="block 2xl:flex justify-center">
      <div className="w-full">
        <div className="w-full bg-sky-400  flex justify-center">
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
            <p className="text-white font-medium text-center text-xl mt-3">
              Giám đốc
            </p>
            <div className="flex justify-between text-white gap-x-3 mt-14 mb-10">
              <button className="flex items-center gap-x-3 rounded-md hover:bg-sky-500 duration-150 py-3 px-4">
                <BsFillTelephoneFill className="text-xl" />
                <p className="text-base">PHONE</p>
              </button>
              <button className="flex items-center gap-x-3 rounded-md hover:bg-sky-500 duration-150 py-3 px-4">
                <MdEmail className="text-xl" />
                <p className="text-base">EMAIL</p>
              </button>
              <button className="flex items-center gap-x-3 rounded-md hover:bg-sky-500 duration-150 py-3 px-4">
                <TbWorld className="text-xl" />
                <p className="text-base">WEBSITE</p>
              </button>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center ">
          <div className="max-w-md w-full">
            <div className="flex items-center w-full mt-7  gap-x-2">
              <div className="w-24 flex justify-center">
                <AiFillPhone className="text-3xl text-gray-400" />
              </div>
              <div className="">
                <p className="text-sm font-medium text-gray-700">0983277941</p>
                <p className="text-sm text-gray-400 mt-2">Điện thoại</p>
              </div>
            </div>
            <div
              style={{ height: "1px" }}
              className="bg-gray-300 w-full mt-3"
            />
            <div className="flex items-center w-full mt-7  gap-x-2">
              <div className="w-24 flex justify-center">
                <HiOutlineMail className="text-3xl text-gray-400" />
              </div>
              <div className="">
                <p className="text-sm font-medium text-gray-700">
                  ctyfmp@gmail.com
                </p>
                <p className="text-sm text-gray-400 mt-2">Email</p>
              </div>
            </div>
            <div
              style={{ height: "1px" }}
              className="bg-gray-300 w-full mt-3"
            />
            <div className="flex items-center w-full mt-7  gap-x-2">
              <div className="w-24 flex justify-center">
                <ImLocation2 className="text-3xl text-gray-400" />
              </div>
              <div className="">
                <p className="text-sm font-medium text-gray-700">
                  1196 đường 3/2, phường 8, Quận 11, TP.HCM
                </p>
                <p className="text-sm text-blue-400 cursor-pointer hover:underline mt-2">
                  Bản đồ
                </p>
              </div>
            </div>
            <div
              style={{ height: "1px" }}
              className="bg-gray-300 w-full mt-3"
            />
            <div className="flex items-center w-full mt-7  gap-x-2">
              <div className="w-24 flex justify-center">
                <BsPersonWorkspace className="text-3xl text-gray-400" />
              </div>
              <div className="">
                <p className="text-sm font-medium text-gray-700">
                  Công ty Cổ Phần Flower Marketplace - FMP
                </p>
                <p className="text-sm text-gray-400 mt-2">Giám đốc</p>
              </div>
            </div>
            <div
              style={{ height: "1px" }}
              className="bg-gray-300 w-full mt-3"
            />
            <div className="flex justify-center my-5">
              <button className="py-3 px-4 rounded-lg text-white bg-orange-600 hover:bg-orange-700 font-medium">
                {" "}
                + Thêm liên hệ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
