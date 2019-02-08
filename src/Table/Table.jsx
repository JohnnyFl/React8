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
    name: "",
    meal: "",
    quantity: "",
    id: "",
    sum: "",
    orders: [""]
  };

  updateData = value => {
    const { id, name, meal, quantity } = value;
    this.setState(() => {
      return { id, name, meal, quantity };
    });
  };

  removeItem = index => {
    const { orders } = this.state;
    this.setState({
      orders: orders.filter(order => {
        return order.id !== index;
      })
    });
  };

  handleEdit = value => {
    console.log(value);
    this.updateData(value);
    const { orders } = this.state;
    const { id, name, meal, quantity, index } = value;
    const newOrders = orders.map(order => {
      if (order.id === id) {
        return { id, name, meal, quantity };
      }
      return null;
    });
    // console.log(this.state);
    // this.state.orders[index] = newOrders;
    // console.log(this.state);

    // fix above (problem with structure) we should choose element of array and then change object value
    this.setState(() => {
      const { orders } = this.state;
      return {
        orders: this.state.orders
      };
    });
  };

  handleAdd = value => {
    this.updateData(value);
    const { orders } = this.state;
    const { id, name, meal, quantity } = value;
    const data = {
      sum: quantity * 5,
      id: uuid.v4(),
      name,
      quantity,
      meal
    };
    console.log(this.state);

    orders.push(data);
    this.setState(() => {
      return { orders, name, meal, quantity, id };
    });
  };

  render() {
    const { classes } = this.props;
    const { name, orders } = this.state;

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
            {name !== "" ? (
              <TableBody className="tableb">
                {orders.map((row, index) => (
                  <TableRow key={row.id} className="tabler">
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">
                      {row.name}, {index}
                    </TableCell>
                    <TableCell align="right">{row.meal}</TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">
                      {row.sum} {row.sum !== "" ? "$" : ""}
                    </TableCell>
                    <TableCell align="right">
                      <div className="buttons">
                        <MuiThemeProvider theme={theme}>
                          <EditButton
                            name={row.name}
                            meal={row.meal}
                            quantity={row.quantity}
                            id={row.id}
                            index={index}
                            handleAdd={this.handleAdd}
                            handleEdit={this.handleEdit}
                          />
                        </MuiThemeProvider>
                        <Fab
                          onClick={() => this.removeItem(row.id)}
                          size="small"
                          color="secondary"
                          aria-label="Delete"
                          className={classes.fab}
                        >
                          <DeleteIcon />
                        </Fab>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : null}
          </Table>
        </Paper>
        <SimpleModalWrapped handleAdd={this.handleAdd} />
      </div>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);
