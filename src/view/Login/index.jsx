import React, { Component } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Grid, Button, withStyles } from "@material-ui/core";
import firebase from "../../configs/firebase";
import { connect } from "react-redux";
import { signOut } from "../../actions/firebase";
import "./login.css";

const style = {};

const stylegrid = {
  // backgroundColor: "gray",
  // borderColor: "orange",
  // borderSize: "10",
  // borderStyle: "solid"
  marginTop:"20%",
  height:"40vh",
  width:"100vw",

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
    const { auth } = this.props;
    return (
      <Grid container direction="row" justify="center" alignItems="center">
      <div style={stylegrid}>
        {!auth.isAuth ? (
           
          
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          
         
        ) : (
          <Grid container>
            <h2>{auth.data.displayName}</h2>
            <Button onClick={this.handleLogOut}>Logout</Button>
          </Grid>
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
