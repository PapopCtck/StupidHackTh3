import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {
  fetchLeaderboards,
  fetchUserScore,
  fetchFeeds,
  fetchSystem
} from "../../actions/firebase";
import { connect } from 'react-redux'
import Modal from "../../Components/Modal";
import ModalListItemSection from "./Sections/ModalListItemSection";
import leaderStyle from "../../assets/jss/leaderStyle";
import StarIcon from "@material-ui/icons/Star";
import * as moment from "moment";
import { Grid } from '@material-ui/core';
export class LeaderBoards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectUserList: [],
      modal: false,
      imgList: [],
      selectUser: ""
    };
  }

         componentDidMount() {
           this.props.fetchLeaderboards();
           this.props.fetchFeeds();
           this.props.fetchSystem();
         }
         handleModal = () => {
           if(this.state.modal) this.setState({selectUserList:[],imgList:[]})
           this.setState({ modal: !this.state.modal});
           
         };
         handleOpen =(user)=> {
           fetchUserScore(user.id).then((list)=>{
            this.setState({ selectUser: user, modal: true ,selectUserList:list});
           })
         }

         render() {
           const { modal, selectUser ,selectUserList } = this.state;
           const { classes, content } = this.props;
           return content.hasContent ? (
             <Grid>
               <h2>Ranking</h2>
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
                           {user.data.star}
                           <StarIcon />
                         </Typography>{" "}
                         <Typography
                           component="span"
                           className={classes.inline}
                         >
                           {user.data.digged} digged
                         </Typography>
                         <star_rate />
                       </React.Fragment>
                     </ListItemSecondaryAction>
                   </ListItem>
                 ))}
               </List>
               <h2>Recent Feeds</h2>
               {content.hasSys && (
                 <div>
                   number: {content.system.trophy} time:
                   {moment(content.system.date.toDate()).fromNow()}
                 </div>
               )}
               <List className={classes.root}>
                 {content.hasFeeds &&
                   content.feeds.map((lotto, index) => (
                     <ModalListItemSection
                       lotto={lotto}
                       prize={content.system.trophy}
                     />
                   ))}
                 {selectUser.data !== undefined && (
                   <Modal
                     className={classes.modal}
                     title={selectUser.data.displayName}
                     isOpen={modal}
                     handleModal={this.handleModal}
                     content={
                       <List>
                         {selectUserList.map(item => (
                           <ModalListItemSection lotto={item} />
                         ))}
                       </List>
                     }
                   />
                 )}
               </List>
             </Grid>
           ) : (
             <p>Loading</p>
           );
         }
       }

const mapStateToProps = state => ({
  content: state.content
});

const mapDispatchToProps = {
  fetchLeaderboards,
  fetchFeeds,
  fetchSystem
};

export default withStyles(leaderStyle)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LeaderBoards)
);
