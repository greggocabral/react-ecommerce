import React from 'react';
import {Col, Badge, Panel, Button, Image} from 'react-bootstrap';


class  ProductItem extends React.Component{

    constructor(props){
        super(props);

    }

    render() {


        return (

            <Col lg={3} md={4} sm={6} xs={12}>
                <Panel>
                    <Badge pullRight> <h5> {this.props.product.cost} points</h5> </Badge>
                    <Image src={this.props.product.img.url} responsive />
                    <h5> {this.props.product.category} </h5>
                    <h4> {this.props.product.name} </h4>
                    {
                        this.props.product.cost<=this.props.user.points
                            ?
                            <Button onClick={() => this.props.confirmRedeem(this.props.product._id)}>
                                Redeem
                            </Button>
                            :
                            <Button disabled>You need {this.props.product.cost-this.props.user.points} extra points </Button>

                    }
                </Panel>

            </Col>

        );
    }

    confirmRedeem = () => {
        this.setState({showRedeemConfirm:true});
    }
}


export default ProductItem;
