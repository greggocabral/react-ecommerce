import React, {Component} from 'react';
import {Grid, Row, Col, Image } from 'react-bootstrap';
import './App.css';
import ProductFamily from "./Components/Products/ProductFamily";
import ModalAlert from "./Components/Modals/ModalAlert.js";
import { PulseLoader} from 'react-spinners';


class App extends Component {

    constructor() {
        super();
        this.state = {
            user: {},
            ModalAlert: {show:false, title: '', description: ''},
            loading: true
        }
    }

    componentDidMount() {

        this.getUser()
            .then(response => response.json())
            .then(user => {
                this.setState({user, loading:false})
            })
            .catch(err => {
                this.setState({error: {haveError:true, description: err.message}})
                console.log(err);
            })
    }

    render() {

        return (

            <div>
                <Grid fluid className="show-grid">
                    <Row className="customHeader">
                        <Col xs={2} sm={1}>
                           <h5><Image src="./img/aerolab-logo.svg"/></h5>
                        </Col>
                        <Col xs={10} >
                            <h3 className='customTextRight'>  {this.state.loading? '' : this.state.user.name +' | '+ this.state.user.points + ' points' }</h3>
                        </Col>
                    </Row>
                </Grid>



                <ProductFamily user={this.state.user} redeemProduct={(product) => this.redeemProduct(product)}/>

                <ModalAlert showModal={this.state.ModalAlert.show} title={this.state.ModalAlert.title} description={this.state.ModalAlert.description} okButton='Ok' close={this.closeErrorModal}/>

            </div>


        );
    }

    closeErrorModal = () => {
        this.setState({ModalAlert: {show:false, title: '', description: ''}});
    }

    getUser = () => {
        return fetch('https://aerolab-challenge.now.sh/user/me',
            {
                headers: {
                    "Content-Type":
                        "application/json",
                    "Accept":
                        "application/json",
                    "Authorization":
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTBjYTM1Y2U0OTYwMDAwNjBkMDBhODAiLCJpYXQiOjE1MTA3Nzc2OTJ9.kawyFF2Aq1jexnoufnG0mYzCZ_an4fO3RHvsvMEyl-U"
                }
            })


    }

    redeemProduct = (product) => {
        let pointsLeft = this.state.user.points - product.cost;
        this.setState({
            user:{
                name: this.state.user.name,
                points: pointsLeft
            },
            ModalAlert:{
                show:true,
                title: 'Product redeem',
                description: 'You redeemed '+product.name+'! '+pointsLeft+ ' points are left in your balance.'
            }

        });
    }
}


export default App;
