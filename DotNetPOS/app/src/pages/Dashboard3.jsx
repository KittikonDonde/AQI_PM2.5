import React, { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; // Import the styles
import axios from 'axios';
import Swal from 'sweetalert2';

function Dashboard3() {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [sensorData, setSensorData] = useState({
        V0: 0,
        V1: 0,
        V2: 0,
        V3: 0,
    });
    const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime = { hour: 'numeric', minute: 'numeric', second: 'numeric' };

    const formattedDate = currentDateTime.toLocaleDateString('th-TH', optionsDate);
    const formattedTime = currentDateTime.toLocaleTimeString('th-TH', optionsTime);


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
        message = "ดีมาก";
        bgColor = "bg-info";
        textColor = "white";
    } else if (aqiValue >= 26 && aqiValue <= 50) {
        message = "ดี";
        bgColor = "bg-success";
        textColor = "black";
    } else if (aqiValue >= 51 && aqiValue <= 100) {
        message = "ปานกลาง";
        bgColor = "bg-warning";
        textColor = "black";
    } else if (aqiValue >= 101 && aqiValue <= 200) {
        message = "เริ่มมีผลกระทบต่อสุขภาพ";
        bgColor = "bg-orange";
        textColor = "black";
    } else {
        message = "มีผลกระทบต่อสุขภาพ";
        bgColor = "bg-danger";
        textColor = "black";
    }
    const aqiValue1 = aqiMultiplier * sensorData.V3
    let imageSt;

    if (aqiValue1 >= 0 && aqiValue1 <= 25) {
        imageSt = 'dist/img/s1.png';
    } else if (aqiValue1 >= 26 && aqiValue1 <= 50) {
        imageSt = 'dist/img/s2.png';
    } else if (aqiValue1 >= 51 && aqiValue1 <= 100) {
        imageSt = 'dist/img/s3.png';
    } else if (aqiValue1 >= 101) {
        imageSt = 'dist/img/s4.png';
    } else {
        imageSt = 'dist/img/s5.png';
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
        <div className="card-body mt-4" style={{ backgroundColor: '#EBE6DF' }}>
            <div className="inner">
                <h5 style={{ fontSize: '130px', textAlign: 'center' }}>  สถานการณ์ฝุ่นละอองขนาดเล็ก </h5>
                <h5 style={{ fontSize: '65px', textAlign: 'center' }}><ion-icon name="location"></ion-icon>  จุดตรวจวัดอาคารผู้ป่วยนอกโรงพยาบาลแม่สอด </h5>
                <h5 style={{ fontSize: '65px', textAlign: 'center' }}> {formattedDate.toLocaleString()} เวลา {formattedTime}  </h5>
            </div>
            <div class="row content-center" >
                <div className="col-lg-4 col-5 mx-auto">
                    <div className={`small-box rounded ${aqiValue >= 0 && aqiValue <= 25 ? 'bg-info' :
                        (aqiValue >= 26 && aqiValue <= 50 ? 'bg-success' :
                            (calculatedValue >= 51 && calculatedValue <= 100 ? 'bg-warning' :
                                (calculatedValue >= 101 && calculatedValue <= 200 ? 'bg-orange' : 'bg-danger')))}`}>
                        <div className="inner">
                            <h5 style={{ fontSize: '40px', textAlign: 'center', color: 'black' }}>AQI</h5>
                            <h1 style={{ textAlign: 'center', fontSize: '150px', color: 'black' }}>
                                {Math.floor(calculatedValue)}
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-5 mx-auto">
                    <div className={`small-box ${sensorData.V3 >= 0 && sensorData.V3 <= 15 ? 'bg-info' :
                        (sensorData.V3 >= 16 && sensorData.V3 <= 25 ? 'bg-success' :
                            (sensorData.V3 >= 26 && sensorData.V3 <= 37 ? 'bg-warning' :
                                (sensorData.V3 >= 38 && sensorData.V3 <= 75 ? 'bg-orange' : 'bg-danger')))}`}>
                        <div className="inner">
                            <h5 style={{ fontSize: '40px', textAlign: 'center', color: 'black' }}>PM 2.5</h5>

                            <h1 style={{ textAlign: 'center', fontSize: '150px', color: 'black' }}>
                                {sensorData.V3}
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

export default Dashboard3;
