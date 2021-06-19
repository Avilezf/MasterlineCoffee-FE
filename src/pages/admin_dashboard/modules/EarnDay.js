import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function EarnDay() {
    const [Data, setData] = useState([]);

    const getData = () => {
        axios({
            method: "GET",
            url: `https://marthacoffee.herokuapp.com/api/admin/earnday`,
            headers: { Authorization: `${window.localStorage.getItem("USER_KEY")}` },
        })
            .then((res) => {
                if (res.status === 200) {
                    setData(res.data.total)
                }
            })
            .catch((err) => {
                console.log(err, "algo ha sucedido,Imposible recuperar la informacion necesaria(EARNDAY)");
            });
    };

    useEffect(() => {
        getData();
    }, []);


    const classes = useStyles();
    const fecha = new Date();
    const dia = fecha.toDateString();

    return (
        <React.Fragment>
            <h3>Total Ganacias Hoy*</h3>
            <Typography component="p" variant="h4">
                ${Data.total} COP
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                {dia}
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                Recarga la pagina para actualizar el valor
            </Typography>
        </React.Fragment>
    );
}