import React, { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; // Import the styles
import axios from 'axios';
import Swal from 'sweetalert2';

function Dashboard1() {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [sensorData, setSensorData] = useState({
        V0: 0,
        V1: 0,
        V2: 0,
        V3: 0,
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://sgp1.blynk.cloud/external/api/get?token=WqT2oas06zhixR20aK7W1N6fT5N_Sbbe&V0&V1&V2&V3'
                );
                const apiData = response.data;
                setSensorData(apiData);
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
                });
            }
        };

        fetchData();

        const intervalId = setInterval(() => {
            fetchData();
            setCurrentDateTime(new Date()); // Update the current date and time
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    let imageUrl;

    if (1.65 * sensorData.V3 >= 0 && 1.65 * sensorData.V3 <= 25) {
        imageUrl = 'dist/img/1.png';
    } else if (1.95 * sensorData.V3 >= 26 && 1.95 * sensorData.V3 <= 50) {
        imageUrl = 'dist/img/2.png';
    } else if (2.45 * sensorData.V3 >= 51 && 2.45 * sensorData.V3 <= 100) {
        imageUrl = 'dist/img/3.png';
    } else if (2.6 * sensorData.V3 >= 101) {
        imageUrl = 'dist/img/41.png';
    } else {
        imageUrl = 'dist/img/5.png';
    }

    let imageSt;

    if (1.65 * sensorData.V3 >= 0 && 1.65 * sensorData.V3 <= 25) {
        imageSt = 'dist/img/s1.png';
    } else if (1.95 * sensorData.V3 >= 26 && 1.95 * sensorData.V3 <= 50) {
        imageSt = 'dist/img/s2.png';
    } else if (2.45 * sensorData.V3 >= 51 && 2.45 * sensorData.V3 <= 100) {
        imageSt = 'dist/img/s3.png';
    } else if (2.6 * sensorData.V3 >= 101) {
        imageSt = 'dist/img/s4.png';
    } else {
        imageSt = 'dist/img/s5.png';
    }

    let aqiMultiplier;

    if (sensorData.V3 >= 0 && sensorData.V3 <= 15) {
        aqiMultiplier = 1.65;
    } else if (sensorData.V3 >= 16 && sensorData.V3 <= 25) {
        aqiMultiplier = 1.95;
    } else if (sensorData.V3 >= 26 && sensorData.V3 <= 37) {
        aqiMultiplier = 2.45;
    } else if (sensorData.V3 >= 38 && sensorData.V3 <= 75) {
        aqiMultiplier = 2.6;
    } else {
        aqiMultiplier = 2.6; // Default value if none of the conditions match
    }

    const aqiValue = aqiMultiplier * sensorData.V3;

    let message, bgColor, textColor;

    if (aqiValue >= 0 && aqiValue <= 25) {
        message = "คุณภาพอากาศ ดีมาก";
        bgColor = "bg-info";
        textColor = "white";
    } else if (aqiValue >= 26 && aqiValue <= 50) {
        message = "คุณภาพอากาศ ดี";
        bgColor = "bg-success";
        textColor = "white";
    } else if (aqiValue >= 51 && aqiValue <= 100) {
        message = "คุณภาพอากาศ ปานกลาง";
        bgColor = "bg-warning";
        textColor = "black";
    } else if (aqiValue >= 101 && aqiValue <= 200) {
        message = "คุณภาพอากาศ เริ่มมีผลกระทบต่อสุขภาพ";
        bgColor = "bg-orange";
        textColor = "white";
    } else {
        message = "คุณภาพอากาศ มีผลกระทบต่อสุขภาพ";
        bgColor = "bg-danger";
        textColor = "white";
    }
    const calculateStrokeColor = () => {
        let progressMultiplier;

        if (sensorData.V3 >= 0 && sensorData.V3 <= 15) {
            progressMultiplier = 1.65;
        } else if (sensorData.V3 >= 16 && sensorData.V3 <= 25) {
            progressMultiplier = 1.95;
        } else if (sensorData.V3 >= 26 && sensorData.V3 <= 37) {
            progressMultiplier = 2.45;
        } else if (sensorData.V3 >= 38 && sensorData.V3 <= 75) {
            progressMultiplier = 2.65;
        } else {
            progressMultiplier = 2.6; // Default value if none of the conditions match
        }

        const progressValue = progressMultiplier * sensorData.V3;

        if (progressValue >= 0 && progressValue <= 25) {
            return '#02b1f4';
        } else if (progressValue > 26 && progressValue <= 50) {
            return '#00bf62';
        } else if (progressValue > 51 && progressValue <= 100) {
            return '#f3d400';
        } else if (progressValue > 101 && progressValue <= 200) {
            return '#ff914c';
        } else {
            return '#e33824';
        }
    };

    const sensorValue = sensorData.V3;

    let multiplier;

    if (sensorValue >= 0 && sensorValue <= 15) {
        multiplier = 1.65;
    } else if (sensorValue >= 16 && sensorValue <= 25) {
        multiplier = 1.95;
    } else if (sensorValue >= 26 && sensorValue <= 37) {
        multiplier = 2.4;
    } else if (sensorValue >= 38 && sensorValue <= 75) {
        multiplier = 2.6;
    } else {
        multiplier = 2.6;
    }

    const calculatedValue = multiplier * sensorValue;
    return (
        <>
            <div className="card-body mt-3" style={{ backgroundColor: '#EBE6DF' }}>
                <div className="row justify-content-center">
                    <div className="inner">
                        <h5 style={{ fontSize: '80px', textAlign: 'center' }}>  สถานการณ์ฝุ่นละออง </h5>
                        <h5 style={{ fontSize: '40px', textAlign: 'center' }}><ion-icon name="location"></ion-icon>  จุดตรวจวัดอาคารผู้ป่วยนอกโรงพยาบาลแม่สอด </h5>
                        <h5 style={{ fontSize: '40px', textAlign: 'center' }}> วันที่ {currentDateTime.toLocaleString()} </h5>
                    </div>

                    <div class="col-lg-3 col-6 justify-content-center" >
                        <h5 style={{ fontSize: '70px', textAlign: 'center' }}>PM 2.5</h5>
                        <div className={`small-box ${sensorData.V3 >= 0 && sensorData.V3 <= 15 ? 'bg-info' :
                            (sensorData.V3 >= 16 && sensorData.V3 <= 25 ? 'bg-success' :
                                (sensorData.V3 >= 26 && sensorData.V3 <= 37 ? 'bg-warning' :
                                    (sensorData.V3 >= 28 && sensorData.V3 <= 75 ? 'bg-orange' : 'bg-danger')))}`}>
                            <div className="inner">
                                <h1 style={{ textAlign: 'center', fontSize: '100px' }}>
                                    {sensorData.V3}
                                    <sup style={{ fontSize: '20px' }}>
                                        μg/m<sup style={{ fontSize: '15px' }}>3</sup>
                                    </sup>
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-6 justify-content-center">
                        <h5 style={{ fontSize: '70px', textAlign: 'center' }}>PM 10</h5>
                        <div className={`small-box ${sensorData.V2 >= 0 && sensorData.V2 <= 50 ? 'bg-info' :
                            (sensorData.V2 >= 51 && sensorData.V3 <= 80 ? 'bg-success' :
                                (sensorData.V2 >= 81 && sensorData.V2 <= 120 ? 'bg-warning' :
                                    (sensorData.V2 >= 121 && sensorData.V2 <= 180 ? 'bg-orange' : 'bg-danger')))}`}>
                            <div class="inner">
                                <h1 style={{ textAlign: 'center', fontSize: '100px' }}>
                                    {sensorData.V2}
                                    <sup style={{ fontSize: '20px' }}>
                                        μg/m<sup style={{ fontSize: '15px' }}>3</sup>
                                    </sup>
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card-header">
                            <div className="App" style={{ width: '40%', height: '40%', margin: 'auto' }}>
                                <div style={{ position: 'relative' }}>
                                    <CircularProgressbar
                                        value={2 * sensorData.V3}
                                        maxValue={200}
                                        strokeWidth={13}
                                        styles={{
                                            root: { width: '100%', height: '100%' },
                                            path: {
                                                stroke: calculateStrokeColor(), // เรียกใช้ฟังก์ชันเพื่อคำนวณสี
                                                strokeLinecap: 'butt',
                                                transition: 'stroke-dashoffset 0.5s ease 0s',
                                            },
                                            trail: {
                                                stroke: '#d3d3d3',
                                                strokeLinecap: 'square',
                                            },
                                            text: {
                                                fill: '#000',
                                                fontSize: '20px',
                                                dominantBaseline: 'middle',
                                                textAnchor: 'middle',
                                            },
                                        }}
                                    />

                                    <img
                                        src={imageSt}
                                        alt="Logo"
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            width: '200px', // ปรับขนาดโลโก้ตามที่ต้องการ
                                            height: '200px', // ปรับขนาดโลโก้ตามที่ต้องการ
                                        }}
                                    />
                                </div>
                                <h1 style={{ fontSize: '90px', textAlign: 'center' }}>
                                    {parseFloat(calculatedValue.toFixed(2))}
                                </h1>
                                <h1 style={{ fontSize: '30px', textAlign: 'center' }}>
                                    AQI
                                </h1>
                                <div style={{ width: 'fit-content', margin: 'auto' }}>
                                    <div className={`small-box ${bgColor}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <div className="inner">
                                            <h5 style={{ fontSize: '40px', color: textColor, textAlign: 'center' }}>{message}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <img src={imageUrl} style={{ maxWidth: '100%', height: 'auto' }} alt="Image" />
                        <div className="row justify-content-center">
                            <div class="col-lg-5 col-6" >
                                <div className="inner">
                                    <img src={'dist/img/7.png'} style={{ width: '35%', height: 'auto', display: 'block', margin: '0 auto' }} alt="Image" className="mx-auto" />
                                </div>
                                <div className="inner text-center">
                                    <p style={{ fontSize: '45px', textAlign: 'center' }}>คลินิกมลพิษ</p>
                                </div>
                            </div>
                        </div>
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

export default Dashboard1;
