import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';



export default function WeekdayBar() {

    const [Data, setData] = useState([]);

    const getData = () => {
        axios({
            method: "GET",
            url: `https://marthacoffee.herokuapp.com/api/admin/weekdaygraph`,
            headers: { Authorization: `${window.localStorage.getItem("USER_KEY")}` },
        })
            .then((res) => {
                if (res.status === 200) {
                    setData(res.data.weeks)
                }
            })
            .catch((err) => {
                console.log(err,"algo ha sucedido,Imposible recuperar la informacion necesaria(WEEKDAY)");
            });
    };

    useEffect(() => {
        getData();
    }, []);

     const uniqueItemsName = [...new Set(Data.map((x) => x.xDay))];
     const ItemsData = []
    
    Data.forEach((item) =>{
        ItemsData.push(item.ySells)
    });

    const state = {
        labels: uniqueItemsName,
        datasets: [
            {
                label: 'Ventas totales',
                backgroundColor: 'rgba(134, 133, 239, 1)',
                data: ItemsData,
                hoverOffset: 1,
                borderWidth: 2,
            }
        ]
    }


    return (
        <React.Fragment>
            <h3>Ventas Totales por dia </h3>
            <Bar
                data={state}
                options={{
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }}
            />

        </React.Fragment>
    );
}