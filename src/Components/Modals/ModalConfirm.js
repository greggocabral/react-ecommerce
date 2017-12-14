import React from 'react';
import {Modal, Button} from 'react-bootstrap';

class  ModalConfirm extends React.Component{

    constructor(props){
        super(props);

    }

    componentDidMount() {

    }

    render() {

        return (

            <Modal show={this.props.showModal} onHide={this.close}>
                <Modal.Header>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{this.props.description}</p>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.close(true)}>{this.props.okButton}</Button>
                    <Button onClick={() => this.close(false)}>{this.props.cancelButton}</Button>
                </Modal.Footer>
            </Modal>

        );
    }


    close = (response) => {
        this.props.close(response);
    }

}


export default ModalConfirm;
