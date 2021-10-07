import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Dashboard",

    path: "/",
    role: "Admin",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text", //classname
  },
  {
    title: "Absensi Karyawan",
    path: "/absensi",
    role: "User",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text", //classname
  },

  {
    title: "User",
    path: "/user",
    role: "Admin",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text", //classname
  },
];