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
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://www.cmuccdc.org/api/ccdc/value/5046'
                );
                const apiData = response.data;
                setSensorData(apiData);
            } catch (error) {
               
            }
        };

        fetchData();

        const intervalId = setInterval(() => {
            fetchData();
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const aqiValue = sensorData.pm25;

    let imageSt;

    if (aqiValue >= 0 && aqiValue <= 15) {
        imageSt = 'dist/img/s1.png';
    } else if (aqiValue >= 16 && aqiValue <= 25) {
        imageSt = 'dist/img/s2.png';
    } else if (aqiValue >= 26 && aqiValue <= 37) {
        imageSt = 'dist/img/s3.png';
    } else if (aqiValue >= 38 && aqiValue <= 75) {
        imageSt = 'dist/img/s4.png';
    } else {
        imageSt = 'dist/img/s5.png';
    }

    let message, bgColor, textColor;

    if (aqiValue >= 0 && aqiValue <= 15) {
        message = "ดีมาก";
        bgColor = "bg-info";
        textColor = "white";
    } else if (aqiValue >= 16 && aqiValue <= 25) {
        message = "ดี";
        bgColor = "bg-success";
        textColor = "white";
    } else if (aqiValue >= 26 && aqiValue <= 37) {
        message = "ปานกลาง";
        bgColor = "bg-warning";
        textColor = "black";
    } else if (aqiValue >= 38 && aqiValue <= 75) {
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
                <div className="col-lg-7 col-5 mx-auto align-self-center">
                    <div className={`small-box ${aqiValue >= 0 && aqiValue <= 15 ? 'bg-info' :
                        (aqiValue >= 16 && aqiValue <= 25 ? 'bg-success' :
                            (aqiValue >= 26 && aqiValue <= 37 ? 'bg-warning' :
                                (aqiValue >= 38 && aqiValue <= 75 ? 'bg-orange' : 'bg-danger')))}`} style={{ borderRadius: '50px', border: 'none' }}>
                        <div className="inner">
                            <h1 style={{ textAlign: 'center', fontSize: '100px', color: 'black' }}>PM 2.5 : <span style={{ fontSize: '150px' }}>{aqiValue}</span>
                                <sup style={{ fontSize: '50px' }}>
                                    μg/m<sup style={{ fontSize: '40px' }}>3</sup>
                                </sup>
                            </h1>
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
                        <img src='./dist/img/1.png' style={{ width: '50%', height: 'auto', display: 'block', margin: '0 auto' }} alt="Image" />
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
