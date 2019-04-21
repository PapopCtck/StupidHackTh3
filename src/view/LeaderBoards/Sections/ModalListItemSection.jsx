import React, { Component } from 'react'
import { getImgfromStorage, getUserFromUid } from "../../../actions/firebase";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import * as moment from "moment"
import { Button } from '@material-ui/core';
import Modal from "../../../Components/Modal";
import { withStyles } from "@material-ui/core/styles";

const style = {
  img: {
    width: "100%"
  }
};


export class ModalListItemSection extends Component {
         state = {
           modal: false,
           img: null,
           name: ""
         };
         componentDidMount() {
           getUserFromUid(this.props.lotto.ownerUid).then(user => {
             this.setState({ name: user.displayName });
           });
           getImgfromStorage(this.props.lotto.id + ".jpg").then(img => {
             this.setState({ img: img });
           });
         }
         handleModal = () => {
           this.setState({ modal: !this.state.modal });
         };

         checkhuay = doubt => {
           var prize = this.props.prize;
           var swift = doubt - prize;
           var x = prize - doubt;
           if (
             !this.props.lotto.checked ||
             this.props.number === undefined
           ) {
             return <Button>{doubt}</Button>;
           } else if (x === 0) {
             return <Button color="primary">{doubt} ถูก</Button>;
           } else if (x === 1 || x === -1 || x === 10 || x === -10) {
             return <Button>{doubt} สลับ</Button>;
           } else if (swift % 9 === 0) {
             return <Button>{doubt} ใกล้</Button>;
           } else {
             return <Button color="secondary">{doubt} ผิด </Button>;
           }
           //console.log(total)
         };
         render() {
           const { lotto ,classes} = this.props;
           const { name, modal } = this.state;
           return (
             <ListItem
               button
               onClick={this.handleModal}
               alignItems="flex-start"
             >
               <ListItemAvatar>
                 <Avatar alt="Remy Sharp" src={this.state.img} />
               </ListItemAvatar>
               <ListItemText
                 primary={name}
                 secondary={moment(lotto.date.toDate()).fromNow()}
               />
               <ListItemSecondaryAction>
                 {lotto.lotto !== undefined &&
                   lotto.lotto.map(num => {
                     return this.checkhuay(num);
                   })}
               </ListItemSecondaryAction>
               <Modal
                 //className={classes.modal}
                 title={"dsdasd"}
                 isOpen={modal}
                 handleModal={this.handleModal}
                 content={<img src={this.state.img} className={classes.img} alt="ss" />}
               />
             </ListItem>
           );
         }
       }

export default withStyles(style)(ModalListItemSection);




