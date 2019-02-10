import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import uuid from "uuid";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import green from "@material-ui/core/colors/green";
import SimpleModalWrapped from "../Modal/SimpleModal";
import EditButton from "../EditButton/EditButton";
import "./Table.css";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  fab: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

const theme = createMuiTheme({
  palette: {
    primary: green
  },
  typography: {
    useNextVariants: true
  }
});

class SimpleTable extends Component {
  state = {
    id: "",
    name: "",
    meal: "",
    quantity: "",
    sum: "",
    orders: [
      {
        id: uuid.v4(),
        name: "Josh",
        meal: "Sushi",
        quantity: 3,
        sum: 15
      },
      {
        id: uuid.v4(),
        name: "Jaks",
        meal: "Soup",
        quantity: 2,
        sum: 10
      },
      {
        id: uuid.v4(),
        name: "Lily",
        meal: "Pizza",
        quantity: 1,
        sum: 5
      }
    ]
  };

  addOrder = order => {
    this.setState(state => {
      return state.orders.push(order);
    });
  };

  deleteOrder = id => {
    this.setState({
      orders: this.state.orders.filter(order => order.id !== id)
    });
  };

  updateOrder = (id, updatedOrder) => {
    this.setState({
      orders: this.state.orders.map(order =>
        order.id === id ? updatedOrder : order
      )
    });
    console.log('updatedOrder', updatedOrder);
    console.log('state', this.state.orders)
  };

  // editRow = order => {
  //   this.setState({
  //     id: order.id,
  //     name: order.name,
  //     meal: order.meal,
  //     quantity: order.quantity,
  //     sum: order.sum
  //   });
  // };

  render() {
    const { classes } = this.props;
    const { orders } = this.state;

    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell align="right">Last Name</TableCell>
                <TableCell align="right">Meal</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Sum</TableCell>
                <TableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody className="tableb">
              {orders.map((row, index) => (
                <TableRow key={row.id} className="tabler">
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.meal}</TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="right">{row.sum} $</TableCell>
                  <TableCell align="right">
                    <div className="buttons">
                      <MuiThemeProvider theme={theme}>
                        <EditButton
                          currentOrder={this.state.orders[index]}
                          index={index}
                          updateOrder={this.updateOrder}
                        />
                      </MuiThemeProvider>
                      <Fab
                        size="small"
                        color="secondary"
                        aria-label="Delete"
                        className={classes.fab}
                        onClick={() => this.deleteOrder(row.id)}
                      >
                        <DeleteIcon />
                      </Fab>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <SimpleModalWrapped addOrder={this.addOrder} />
      </div>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);
