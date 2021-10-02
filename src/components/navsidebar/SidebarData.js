import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
   {
      title: "Absensi Karyawan",
      path: "/absensi",
      icon: <IoIcons.IoIosPaper />,
      cName: "nav-text", //classname
   },
   {
      title: "Dashboard",
      path: "/",
      icon: <AiIcons.AiFillHome />,
      cName: "nav-text", //classname
   },
   {
      title: "User",
      path: "/user",
      icon: <IoIcons.IoMdPeople />,
      cName: "nav-text", //classname
   },
];