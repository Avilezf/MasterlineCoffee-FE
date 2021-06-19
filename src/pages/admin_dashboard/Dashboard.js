/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { STOREHOUSE, CASHIER } from "../../Roles";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import LastOrders from "./modules/LastOrders";
import EarnDay from "./modules/EarnDay";
import PieChart from "./modules/PieChart";
import WeekdayBar from "./modules/WeekdayBar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },

  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 150,
  },
  fixedHeight2: {
    height: 495,
  },
}));

function Dashboard() {
  const history = useHistory();

  useEffect(() => {
    window.localStorage.getItem("ROLE") === STOREHOUSE && history.push("/storehouse");
    window.localStorage.getItem("ROLE") === CASHIER && history.push("/cashier");
  }, []);

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaper2 = clsx(classes.paper, classes.fixedHeight2);

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <h1>Tablero De Administrador</h1>
          <Grid container spacing={3}>
            {/* WeekdayBar  */}
            <Grid item xs={6} justify="flex-start">
              <Paper className={classes.paper}>
                <WeekdayBar />
              </Paper>

              {/*  Total sell per day  */}
              <Paper
                className={fixedHeightPaper}
                style={{ paddingTop: "20px" }}
              >
                <EarnDay />
              </Paper>
            </Grid>
            {/*  pie chart  */}
            <Grid item xs={6} sm={6} md={5}>
              <Paper className={fixedHeightPaper2}>
                <PieChart />
              </Paper>
            </Grid>

            {/* Last Orders */}
            <Grid item xs={11}>
              <Paper className={classes.paper}>
                <LastOrders />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default Dashboard;
