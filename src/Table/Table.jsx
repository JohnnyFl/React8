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
import Icon from "@material-ui/core/Icon";
import DeleteIcon from "@material-ui/icons/Delete";
import green from "@material-ui/core/colors/green";
import SimpleModalWrapped from "../Modal/SimpleModal";
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

// let id = 0;
// const createData = (lastName, meal, quantity, sum, options) => {
//   sum = quantity * 5 + "$";
//   id = uuid.v4();
//   return { id, lastName, meal, quantity, sum, options };
// };

// const rows = [
//   createData("Brooks S.", "Soup", 2),
//   createData("Ward D.", "Salad", 3),
//   createData("Casey B.", "Chicken", 7),
//   createData("Watson J.", "Salmon", 2),
//   createData("Hale F.", "Taco", 5),
// ];

const test = [];

class SimpleTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      meal: "",
      quantity: "",
      id: 0
    };
  }

  onEdit = () => {
    console.log(this);
  };

  onDelete = () => {
    console.log(this);
  };

  updateData = value => {
    this.setState({
      name: value.name,
      meal: value.meal,
      quantity: Number(value.quantity),
      id: uuid.v4()
    });
    test.push(this.state);
    console.log(this.state);
  };

  render() {
    const { classes } = this.props;
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
              {test.map(row => (
                <TableRow key={row.id} className="tabler">
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.meal}</TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="right">{row.quantity * 5}$</TableCell>
                  <TableCell align="right">
                    <MuiThemeProvider theme={theme}>
                      <Fab
                        onClick={this.onEdit}
                        size="small"
                        color="primary"
                        aria-label="Edit"
                        className={classes.fab}
                      >
                        <Icon>edit_icon</Icon>
                      </Fab>
                    </MuiThemeProvider>
                    <Fab
                      onClick={this.onDelete}
                      size="small"
                      color="secondary"
                      aria-label="Delete"
                      className={classes.fab}
                    >
                      <DeleteIcon />
                    </Fab>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <SimpleModalWrapped updateData={this.updateData} />
      </div>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);
