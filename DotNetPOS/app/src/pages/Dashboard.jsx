import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import Swal from 'sweetalert2';
import axios from 'axios';

ChartJs.register(
    Tooltip,
    Title,
    ArcElement,
    Legend
);

const initialData = {
    datasets: [
        {
            data: [0, 0, 0, 0],
            backgroundColor: ['red', 'darkorange', 'brown', 'yellowgreen'],
        },
    ],
    labels: ['PM 2.5', 'PM 10', 'PM 1', 'WEATHER'],
};

function Dashboard() {
    const [data, setData] = useState(initialData);
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

                const formattedData = {
                    datasets: [
                        {
                            data: [apiData.V3, apiData.V2, apiData.V1, 200 - apiData.V3 - apiData.V2 - apiData.V1],
                            backgroundColor: ['red', 'darkorange', 'brown', 'darkseagreen'],
                        },
                    ],
                    labels: ['PM 2.5', 'PM 10', 'PM 1', 'WEATHER'],
                };

                setData(formattedData);
                setSensorData(apiData); // ตั้งชื่อตามที่ได้จาก API
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
                });
            }
        };

        fetchData();

        // Set interval to fetch data every 1 minute
        const intervalId = setInterval(fetchData, 500);

        // Clean up interval when component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <div className="card-body mt-3" style={{ backgroundColor: '#f5f1ec' }}>
                <div class="row " >
                    <div class="col-lg-3 col-6">
                        <div class="small-box bg-success">
                            <div class="inner">
                                <h5>อุณหภูมิ</h5>
                                <h1 style={{ textAlign: 'center' }}>{sensorData.V0} <sup style={{ fontSize: '15px' }}>°C</sup></h1>
                                <p>test</p>
                            </div>
                            <div class="icon">
                                <i><ion-icon name="thermometer" style={{ fontSize: '100px' }}></ion-icon></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-6">
                        <div class="small-box bg-info">
                            <div class="inner">
                                <h5>PM 1  </h5>
                                <h1 style={{ textAlign: 'center' }}>{sensorData.V1} <sup style={{ fontSize: '15px' }}>μg/m<sup style={{ fontSize: '8px' }}>3</sup></sup></h1>
                                <p>test</p>
                                <sup style={{ fontSize: '20px' }}></sup>
                            </div>
                            <div class="icon">
                                <i><ion-icon name="stats-chart" style={{ fontSize: '100px' }}></ion-icon></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-6" >
                        <div className="small-box bg-danger">
                            <div className="inner">
                                <h5>PM 2.5  </h5>
                                <h1 style={{ textAlign: 'center' }}>{sensorData.V3} <sup style={{ fontSize: '15px' }}>μg/m<sup style={{ fontSize: '8px' }}>3</sup></sup></h1>
                                <p>test</p>
                            </div>
                            <div className="icon move-up">
                            <i ><ion-icon name="alert-circle" style={{ fontSize: '100px' }}></ion-icon></i>
                            </div>
                        </div>
                    </div>
                </div>
                    <div class="col-lg-3 col-6">
                        <div class="small-box bg-warning">
                            <div class="inner">
                                <h5>PM 10  </h5>
                                <h1 style={{ textAlign: 'center' }}>{sensorData.V2} <sup style={{ fontSize: '15px' }}>μg/m<sup style={{ fontSize: '8px' }}>3</sup></sup></h1>
                                <p>tset</p>
                            </div>
                            <div class="icon">
                            <i><ion-icon name="warning" style={{ fontSize: '100px' }}></ion-icon></i>
                            </div>
                        </div>
                    </div>
                   
            </div>
            <div class="row" style={{ backgroundColor: '#f5f1ec' }}>
                <section class="col-lg-5 connectedSortable">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-chart-pie mr-1"></i>
                            AQI
                        </h3>
                        <div className="App" style={{ width: '100%', height: '100%' }}>
                            <Doughnut data={data} />
                        </div>
                    </div>
                </section>
                <section class="col-lg-5 connectedSortable">
                    <div >
                        <img src="dist/img/s2.png" style={{ width: '100', height: '100' }} />
                    </div>
                </section>
            </div>
            <footer class="main-footer">
                <strong>Copyright &copy;  <a>MAESOT HOSPITAL</a>.</strong>
                All rights reserved. Deverlop By.KITTIKON
                <div class="float-right d-none d-sm-inline-block">
                    <b>Version</b> 1.0.0
                </div>
            </footer>
        </>
    )
}
export default Dashboard;