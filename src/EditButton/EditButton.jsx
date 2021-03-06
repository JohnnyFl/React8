import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Fab from "@material-ui/core/Fab";

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
    const { id, name, meal, quantity, sum } = this.props.currentOrder;
    this.state = {
      open: false,
      id,
      name,
      meal,
      quantity,
      sum
    };
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { id, name, meal, quantity } = this.state;

    return (
      <div>
        <Fab
          onClick={this.handleOpen}
          size="small"
          color="primary"
          aria-label="Edit"
          className={classes.fab}
        >
          <Icon>edit_icon</Icon>
        </Fab>
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
              Edit Order
            </Typography>
            <form className={classes.container} noValidate autoComplete="off">
              <TextField
                required
                id="outlined-name"
                label="Last Name"
                className={classes.textField}
                value={this.state.name}
                margin="normal"
                name="name"
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
                onChange={this.handleInputChange}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                margin="normal"
                variant="outlined"
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
                type="number"
                name="quantity"
                onChange={this.handleInputChange}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
                variant="outlined"
                value={this.state.quantity}
              />
              <div className="addButton">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => {
                    let sum = this.state.quantity * 5;
                    const order = { id, name, meal, quantity, sum };
                    this.props.updateOrder(id, order);
                    console.log(order);
                    this.setState(() => {
                      return { open: !this.state.open };
                    });
                  }}
                >
                  <Icon className={classes.leftIcon}>edit</Icon>
                  Edit Order
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
const EditButton = withStyles(styles)(SimpleModal);

export default EditButton;
