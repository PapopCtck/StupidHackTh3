import React, { Component } from 'react'
import Modal from "../../../Components/Modal"
export class ModalSection extends Component {
    constructor(props){
        super(props)
        this.state={
            modal:false,
            lotto :[6,9,10]
        }
    }
    

    handleModal=()=>{
        this.setState({ modal: !this.state.modal });
    }
  render() {
      const {lotto } = this.state
    return (
      <Modal 
      isOpen={this.state.modal}
      title={"test"}
            content={<div>
                <h2>เลขที่ได้</h2>
                {lotto.map((num,index)=>num)}


            </div>}
      handleModal={this.handleModal}
      />
    )
  }
}

export default ModalSection
