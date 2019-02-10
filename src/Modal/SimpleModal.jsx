import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import uuid from "uuid";
import "./SimpleModal.css";

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
};

const meals = [
  {
    value: "Pizza",
    label: "Pizza"
  },
  {
    value: "Soup",
    label: "Soup"
  },
  {
    value: "Sushi",
    label: "Sushi"
  }
];

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
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
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  menu: {
    width: 200
  }
});

class SimpleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      id: uuid.v4(),
      name: "",
      meal: "",
      quantity: "",
      orders: [{}]
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { classes } = this.props;

    const order = {
      id: uuid.v4(),
      name: this.state.name,
      meal: this.state.meal,
      quantity: Number(this.state.quantity),
      sum: this.state.quantity * 5
    };

    return (
      <div>
        <Button
          onClick={this.handleOpen}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          <Icon className={classes.leftIcon}>add</Icon>
          New Order
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography
              variant="h6"
              id="modal-title"
              style={{ textAlign: "center" }}
            >
              Сreate Order
            </Typography>
            <form className={classes.container} noValidate autoComplete="off">
              <TextField
                required
                id="outlined-name"
                label="Last Name"
                className={classes.textField}
                name="name"
                value={this.state.name}
                margin="normal"
                variant="outlined"
                onChange={this.handleInputChange}
              />
              <TextField
                required
                id="outlined-select-currency"
                select
                label="Meal"
                name="meal"
                className={classes.textField}
                value={this.state.meal}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                margin="normal"
                variant="outlined"
                onChange={this.handleInputChange}
              >
                {meals.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                required
                id="outlined-number"
                label="Quantity"
                value={this.state.quantity}
                name="quantity"
                type="number"
                className={classes.textField}
                onChange={this.handleInputChange}
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
                variant="outlined"
              />
              <div className="addButton">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => {
                    this.props.addOrder(order);
                    this.setState({
                      id: "",
                      name: "",
                      meal: "",
                      quantity: "",
                      sum: ""
                    });
                  }}
                >
                  <Icon className={classes.leftIcon}>add</Icon>
                  Add Order
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
