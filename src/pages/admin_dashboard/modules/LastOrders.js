import React, { useState, useEffect } from 'react'
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';



export default function LastOrders() {
    const [Data, setData] = useState([]);

    const getData = () => {
        axios({
            method: "GET",
            url: `https://marthacoffee.herokuapp.com/api/admin/tablelastorders`,
            headers: { Authorization: `${window.localStorage.getItem("USER_KEY")}` },
        })
            .then((res) => {
                if (res.status === 200) {
                    setData(res.data.orders)
                }
            })
            .catch((err) => {
                console.log(err,"algo ha sucedido,Imposible recuperar la informacion necesaria (LASTORDERS)");
            });
    };

    useEffect(() => {
        getData();
    }, []);


    return (
        <React.Fragment>
            <h3>Ordenes Recientes</h3>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Fecha(AA-MM-DD)</TableCell>
                        <TableCell>Id de la Orden</TableCell>
                        <TableCell>Cedula</TableCell>
                        <TableCell>Nombre del cliente</TableCell>
                        <TableCell>Tipo de pago</TableCell>
                        <TableCell align="right">Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Data.map((row) => (
                        <TableRow key={row.orderId}>
                            {/* decostruir la hora */}
                            <TableCell>{row.dateCreated.substr(0,10)} </TableCell>
                            <TableCell>{row.orderId}</TableCell>
                            <TableCell>{row.cedula}</TableCell>
                            <TableCell>{row.firstName} {row.lastName}</TableCell>
                            <TableCell>{row.payName}</TableCell>
                            <TableCell align="right">{row.total}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    )
}
