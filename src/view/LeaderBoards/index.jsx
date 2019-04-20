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

  componentDidMount() {
  this.props.fetchLeaderboards()
  }


         render() {
           const { classes,content} = this.props
           return (
             <List className={classes.root}>
               {content.data.map((user, index) => (
                 <ListItem alignItems="flex-start">
                   <ListItemAvatar>
                     <Avatar
                       alt="Remy Sharp"
                       src={user.data.photoURL}
                     />
                   </ListItemAvatar>
                   <ListItemText
                     primary={user.data.displayName}
                   />
                   <ListItemSecondaryAction>
                     <React.Fragment>
                       <Typography
                         component="span"
                         className={classes.inline}
                         color="textPrimary"
                       >
                         {user.data.star} Star
                       </Typography>
                       {" "}
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

             </List>
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
