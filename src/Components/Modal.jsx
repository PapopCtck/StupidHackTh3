import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "@material-ui/core/Button"

import modalStyle from "../assets/jss/modalStyle";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}
//Modal for Admin only!
//for make this post to public
class Modal extends React.Component {
  handleClose = () => {
    this.props.handleModal();
  };

  render() {
    const { classes, isOpen, submit, title, content } = this.props;

    return (
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal
        }}
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => this.handleClose()}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <IconButton
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => this.handleClose()}
          >
            <Close className={classes.modalClose} />
          </IconButton>
          <h4 className={classes.modalTitle}>{title}</h4>
        </DialogTitle>
        <DialogContent
          id="modal-slide-description"
          className={classes.modalBody}
        >
          {content}
        </DialogContent>
        {this.props.submit !== undefined && (
          <DialogActions
            className={classes.modalFooter + " " + classes.modalFooterCenter}
          >
            <Button onClick={() => this.handleClose()}>No</Button>
            <Button
              onClick={() => {
                submit();
                this.handleClose();
              }}
              color="successNoBackground"
            >
              Yes
            </Button>
          </DialogActions>
        )}
      </Dialog>
    );
  }
}

Modal.defaultProps = {
  isOpen: false
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  handleModal: PropTypes.func.isRequired,
  classes: PropTypes.object,
  isOpen: PropTypes.bool,
  submit: PropTypes.func
};

export default withStyles(modalStyle)(Modal);
