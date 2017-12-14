import React from 'react';
import {Grid, Row} from 'react-bootstrap';
import ProductItem from './ProductItem.js';
import ModalConfirm from "../Modals/ModalConfirm.js";


class  ProductList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            modal: {
                show: false,
                title: '',
                description: '',
                okButton: '',
                cancelButton: ''
            },
            selectedProduct: {}
        }

    }

    componentDidMount() {

    }

    render() {

        return (

            <Grid>
                <Row>
                    {
                        this.props.products.map(product => {
                            return <ProductItem key={product._id} product={product} user={this.props.user} confirmRedeem={this.handleRedeem}/>
                        })
                    }
                </Row>
                <ModalConfirm showModal={this.state.modal.show}
                              title={this.state.modal.title}
                              description={this.state.modal.description}
                              okButton={this.state.modal.okButton}
                              cancelButton={this.state.modal.cancelButton}
                              close={response => this.closeModal(response)}/>
            </Grid>


        );
    }

    handleRedeem = (productId) => {

        let product = this.props.products.find(product => {
            return product._id === productId;
        });

        this.setState({
            modal: {
                show:true,
                title:'Confirm redeem',
                description: 'Are you sure you want to redeem '+ product.name +'?',
                okButton: 'Redeem now!',
                cancelButton: 'Cancel'
            },
            selectedProduct: product
        });
    }

    closeModal = (response) => {
        console.log(response);
        if (response){
           this.props.redeemProduct(this.state.selectedProduct);
        } else {
            this.setState({selectedProduct:{}});
        }
        this.setState({modal: {show:false, title:'', description:'', okButton: '', cancelButton: ''}});
    }

    redeemProduct = () => {
        console.log(this.state.selectedProduct.name);
    }
}


export default ProductList;
