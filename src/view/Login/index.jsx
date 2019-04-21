import React, { Component } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Grid, Button, withStyles } from "@material-ui/core";
import firebase from "../../configs/firebase";
import { connect } from "react-redux";
import { signOut } from "../../actions/firebase";
import Avatar from "@material-ui/core/Avatar";
import "./login.css";

const style = {};

const stylegrid = {
  // backgroundColor: "gray",
  // borderColor: "orange",
  // borderSize: "10",
  // borderStyle: "solid"
  marginTop: "20%",
  height: "40vh",
  width: "100vw"
};

const styles = {
  avatar: {
    margin: 10
  },
  bigAvatar: {
    margin: 10,
    width: "!0%",
    height: "10%"
  }
};

const ava = {
  margin: 10,
  width: 150,
  height: 150
};

export class Login extends Component {
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => {
        // ? ควรเด้งกลับไปหน้าที่มาก่อนหน้า
        this.props.history.push("/");
      }
    }
  };
  handleLogOut = () => {
    this.props.signOut();
  };

  render() {
    const { classes, auth } = this.props;
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <div style={stylegrid}>
          {!auth.isAuth ? (
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          ) : (
            <React.Fragment>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Avatar src={auth.data.photoURL} style={ava} />
              </Grid>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <h2>{auth.data.displayName}</h2>{" "}
              </Grid>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  onClick={this.handleLogOut}
                >
                  Logout
                </Button>
              </Grid>
            </React.Fragment>
          )}
        </div>
      </Grid>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  signOut
};

export default withStyles(style)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
