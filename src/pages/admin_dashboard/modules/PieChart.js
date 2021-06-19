import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';



  function interpolateColor(color1, color2, factor) {
    if (arguments.length < 3) { 
        factor = 0.5; 
    }
    var result = color1.slice();
    for (var i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return result;
};

// My function to interpolate between two colors completely, returning an array
function interpolateColors(color1, color2, steps) {
    var stepFactor = 1 / (steps - 1),
        interpolatedColorArray = [];

    color1 = color1.match(/\d+/g).map(Number);
    color2 = color2.match(/\d+/g).map(Number);

    for(var i = 0; i < steps; i++) {
        interpolatedColorArray.push(interpolateColor(color1, color2, stepFactor * i));
    }

    return interpolatedColorArray;
}



export default function PieChart() {

    const [Data, setData] = useState([]);

    const getData = () => {
        axios({
            method: "GET",
            url: `https://marthacoffee.herokuapp.com/api/admin/piegraph`,
            headers: { Authorization: `${window.localStorage.getItem("USER_KEY")}` },
        })
            .then((res) => {
                if (res.status === 200) {
                    setData(res.data.pies)
                    
                }
            })
            .catch((err) => {
                console.log(err, "algo ha sucedido,Imposible recuperar la informacion necesaria(PIECHART)");
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const uniqueItemsName = [...new Set(Data.map((x) => x.proname))];
    const ItemsData = []
    const ColorArray = interpolateColors("rgb(134, 133, 239) ", "rgb(227, 224, 243)",uniqueItemsName.length);
    const backgroundColor = [];
    Data.forEach((item) =>{
        ItemsData.push(item.total)
    });
    ColorArray.forEach((color)=>{
        backgroundColor.push(`rgb(${color[0]}, ${color[1]},${color[2]})`)
    });

    
    const state = {
        labels: uniqueItemsName,
        datasets: [
            {
                label: 'Rainfall',
                backgroundColor: backgroundColor,
                data: ItemsData,
                hoverOffset: 4
            }
        ]
    }




    return (
        <React.Fragment>
            <h3>Ventas por productos</h3>
            <Doughnut
                data={state}
                options={{
                    legend: {
                        display: false,
                        position: 'right'
                    }
                }}
            />

        </React.Fragment>
    );
}