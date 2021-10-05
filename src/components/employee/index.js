import React, { useState, useEffect } from 'react'
import Attendance from './Attendance';
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import geolib, { convertDistance } from 'geolib'
import { getDistance } from 'geolib';
import ChangeOffice from './ChangeOffice';
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";
import Swal from "sweetalert2";
import Navbar from '../navsidebar';
import AllAttendance from './AllAttendance';

import { useDispatch, useSelector } from "react-redux";
import { Attendence } from "../../redux/Actions/user.actions";


export default function Employee() {

   const dispatch = useDispatch();
   const history = useHistory();
   const [error, setError] = useState(null);


   let [loading, setLoading] = useState(true);
   let [color, setColor] = useState("#23C8D4");
   const [done, setDone] = useState(true);
   const override = css`
   display: block;
   margin: 0 auto;
   border-color: red;
   `;



   const linkAPI = "https://arcane-badlands-64583.herokuapp.com/attandence/add"

   function CheckLocation() {
      setDone(false);

      navigator.geolocation.getCurrentPosition(postition => {
         // Search Long, Lang
         const my_coords = { latitude: postition.coords.latitude, longitude: postition.coords.longitude }
         const kantor_coords = { latitude: -6.990638, longitude: 110.423667 }
         // const kantor_coords = { latitude: -7.376397, longitude: 110.440711 }

         // 1000 buat akurasi
         let distance = getDistance(my_coords, kantor_coords, 1)
         console.log(distance);

         // Convert to KM
         let convert = convertDistance(distance, 'km');
         console.log(convert)

         if (convert > 5) {
            // alert('Jarak anda terlalu jauh, Maks 5 KM')
            Swal.fire({
               icon: 'error',
               title: 'Gagal',
               text: 'Jarak anda terlalu jauh, Maks 5 KM'
            })
            setDone(true);
         } else {
            Location(convert)
         }
      })

   }


   function Location(details) {

      if ('geolocation' in navigator) {
         console.log('avail');
         console.log(details)
         navigator.geolocation.getCurrentPosition(postition => {
            console.log(postition.coords.latitude)
            console.log(postition.coords.longitude)

            const loc = { location: [postition.coords.latitude, postition.coords.longitude], distance: details, attendance: 1 };
            console.log(localStorage.token)

            // const token = JSON.parse(localStorage)

            let config = {
               headers: {
                  'Authorization': 'Bearer ' + localStorage.token
               }
            }

            axios.post(linkAPI, loc, config)
               .then(res => {
                  setDone(true)
                  Swal.fire({
                     icon: 'success',
                     title: 'Berhasil',
                     text: 'Anda Berhasil Absen'
                  })
               })
               .catch(error => {
                  console.log(error);
                  setDone(true);
               })
         })
      } else {
         console.log('not avail');
      }
   }

   function Change(details) {
      alert(details.address);

   }


   return (
      <>
         {!done ? (
            <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
               <HashLoader color={color} loading={loading} css={override} size={100} />
            </div>
         ) : (
            <>
               <Navbar />
               <Attendance Attendance={CheckLocation} />
               <AllAttendance />
            </>
         )}
      </>
   )
}
