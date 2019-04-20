import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { fetchLeaderboards } from "../../actions/firebase";
import { connect } from 'react-redux'
import Modal from "../../Components/Modal";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
});

export class LeaderBoards extends Component {
         constructor(props) {
           super(props);
           this.state = {
             modal: false,
             selectUser:""
           };
         }

         componentDidMount() {
           this.props.fetchLeaderboards();
         }
         handleModal = () => {
           this.setState({ modal: !this.state.modal });
         };
         handleOpen =(user)=> {
           this.setState({selectUser:user,modal:true})
         }

         render() {
           const { modal, selectUser } = this.state;
           const { classes, content } = this.props;
           return content.hasContent ? (
             <List className={classes.root}>
               {content.data.map((user, index) => (
                 <ListItem
                   button
                   onClick={() => {
                     this.handleOpen(user);
                   }}
                   alignItems="flex-start"
                 >
                   <ListItemAvatar>
                     <Avatar
                       alt="Remy Sharp"
                       src={user.data.photoURL}
                     />
                   </ListItemAvatar>
                   <ListItemText primary={user.data.displayName} />
                   <ListItemSecondaryAction>
                     <React.Fragment>
                       <Typography
                         component="span"
                         className={classes.inline}
                         color="textPrimary"
                       >
                         {user.data.star} Star
                       </Typography>{" "}
                       <Typography
                         component="span"
                         className={classes.inline}
                       >
                         {user.data.digged}%
                       </Typography>
                     </React.Fragment>
                   </ListItemSecondaryAction>
                 </ListItem>
               ))}
               {selectUser.data !== undefined && (
                 <Modal
                   title={selectUser.data.displayName}
                   isOpen={modal}
                   handleModal={this.handleModal}
                   content={<div>{selectUser.id}</div>}
                 />
               )}
             </List>
           ) : (
             <p>Loading</p>
           );
         }
       }

const mapStateToProps = (state) => ({
  content:state.content
})

const mapDispatchToProps = {
  fetchLeaderboards,
};


export default withStyles(styles)(connect(mapStateToProps,mapDispatchToProps)(LeaderBoards));
