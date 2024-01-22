import React, { useState, useEffect } from 'react';
import 'react-circular-progressbar/dist/styles.css'; // Import the styles
import axios from 'axios';
import Swal from 'sweetalert2';

function Dashboard2() {
    const currentDateTime = new Date();
    const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime = { hour: 'numeric', minute: 'numeric', second: 'numeric' };

    const formattedDate = currentDateTime.toLocaleDateString('th-TH', optionsDate);
    const formattedTime = currentDateTime.toLocaleTimeString('th-TH', optionsTime);


    const [sensorData, setSensorData] = useState({
        pm25: 0,
        pm25_th_aqi: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://www.cmuccdc.org/api/ccdc/value/5046'
                );
                const apiData = response.data;
                setSensorData(apiData);
            } catch {

            }
        };

        fetchData();

        const intervalId = setInterval(() => {
            fetchData();
            //  setCurrentDateTime(new Date()); // Update the current date and time
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);



    let imageSt;

    if (sensorData.pm25_th_aqi >= 0 && sensorData.pm25_th_aqi <= 50) {
        imageSt = 'dist/img/s1.png';
    } else if (sensorData.pm25_th_aqi >= 51 && sensorData.pm25_th_aqi <= 80) {
        imageSt = 'dist/img/s2.png';
    } else if (sensorData.pm25_th_aqi >= 81 && sensorData.pm25_th_aqi <= 120) {
        imageSt = 'dist/img/s3.png';
    } else if (sensorData.pm25_th_aqi >= 121 && sensorData.pm25_th_aqi <= 180) {
        imageSt = 'dist/img/s4.png';
    } else {
        imageSt = 'dist/img/s5.png';
    }

    const aqiValue = sensorData.pm25_th_aqi;

    let message, bgColor, textColor;

    if (aqiValue >= 0 && aqiValue <= 50) {
        message = "ดีมาก";
        bgColor = "bg-info";
        textColor = "white";
    } else if (aqiValue >= 51 && aqiValue <= 80) {
        message = "ดี";
        bgColor = "bg-success";
        textColor = "white";
    } else if (aqiValue >= 81 && aqiValue <= 120) {
        message = "ปานกลาง";
        bgColor = "bg-warning";
        textColor = "black";
    } else if (aqiValue >= 121 && aqiValue <= 180) {
        message = "เริ่มมีผลกระทบต่อสุขภาพ";
        bgColor = "bg-orange";
        textColor = "white";
    } else {
        message = "มีผลกระทบต่อสุขภาพ";
        bgColor = "bg-danger";
        textColor = "white";
    }
    return (
        <>
            <div className="card-body mt-4" style={{ backgroundColor: '#EBE6DF' }}>
                <div className="inner">
                    <h5 style={{ fontSize: '130px', textAlign: 'center' }}>  สถานการณ์ฝุ่นละอองขนาดเล็ก </h5>
                    <h5 style={{ fontSize: '65px', textAlign: 'center' }}><ion-icon name="location"></ion-icon>  จุดตรวจวัด (อาคารผู้ป่วยนอก) โรงพยาบาลแม่สอด </h5>
                    <h5 style={{ fontSize: '65px', textAlign: 'center' }}> {formattedDate.toLocaleString()} เวลา {formattedTime}  </h5>
                </div>
                <div class="row content-center" >
                    <div className="col-lg-4 col-5 mx-auto">
                        <div className={`small-box rounded ${sensorData.pm25_th_aqi >= 0 && sensorData.pm25_th_aqi <= 50 ? 'bg-info' :
                            (sensorData.pm25_th_aqi >= 51 && sensorData.pm25_th_aqi <= 80 ? 'bg-success' :
                                (sensorData.pm25_th_aqi >= 81 && sensorData.pm25_th_aqi <= 120 ? 'bg-warning' :
                                    (sensorData.pm25_th_aqi >= 121 && sensorData.pm25_th_aqi <= 180 ? 'bg-orange' : 'bg-danger')))}`}>
                            <div className="inner">
                                <h5 style={{ fontSize: '40px', textAlign: 'center', color: 'black' }}>AQI</h5>
                                <h1 style={{ textAlign: 'center', fontSize: '150px', color: 'black' }}>
                                    {sensorData.pm25_th_aqi}
                                </h1>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-5 mx-auto">
                        <div className={`small-box ${sensorData.pm25 >= 0 && sensorData.pm25 <= 15 ? 'bg-info' :
                            (sensorData.pm25 >= 16 && sensorData.pm25 <= 25 ? 'bg-success' :
                                (sensorData.pm25 >= 26 && sensorData.pm25 <= 37 ? 'bg-warning' :
                                    (sensorData.pm25 >= 38 && sensorData.pm25 <= 75 ? 'bg-orange' : 'bg-danger')))}`}>
                            <div className="inner">
                                <h5 style={{ fontSize: '40px', textAlign: 'center', color: 'black' }}>PM 2.5</h5>

                                <h1 style={{ textAlign: 'center', fontSize: '150px', color: 'black' }}>
                                    {sensorData.pm25}
                                    <sup style={{ fontSize: '30px' }}>
                                        μg/m<sup style={{ fontSize: '20px' }}>3</sup>
                                    </sup>
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center" >
                    <div className="col-lg-4 col-5 mt-auto">
                        <img src={imageSt} style={{ width: '60%', height: 'auto', display: 'block', margin: '0 auto' }} alt="Image" />
                    </div>
                    <div className="col-lg-5 col-5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="inner">
                            <h5 style={{ fontSize: '70px', color: 'black', textAlign: 'center' }}>คุณภาพอากาศ</h5>
                            <h5 style={{ fontSize: '70px', color: 'black', textAlign: 'center' }}>{message}</h5>
                        </div>
                    </div>
                    <div className="col-lg-2 col-5 mt-auto">
                        <img src='./dist/img/1.png' style={{ width: '40%', height: 'auto', display: 'block', margin: '0 auto' }} alt="Image" />
                        <h5 style={{ fontSize: '25px', color: 'black', textAlign: 'center' }}>แหล่งอ้างอิงข้อมูล</h5>
                    </div>
                </div>
            </div>
            <footer className="main-footer">
                <strong>Copyright &copy; <a>MAESOT HOSPITAL</a>.</strong>
                All rights reserved. Developed By.KITTIKON
                <div className="float-right d-none d-sm-inline-block">
                    <b>Version</b> 1.0.0
                </div>
            </footer>
        </>
    );
}

export default Dashboard2;
