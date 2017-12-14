import React from 'react';
import {Grid, Row, Col, Navbar, Nav, NavItem, Jumbotron} from 'react-bootstrap';
import ProductList from './ProductList.js';
import {PulseLoader} from 'react-spinners';

class ProductFamily extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            family: {
                name: "Electronics"
            },
            products: [],
            criteria: "low-price-first",
            loading: true
        }
    }

    componentDidMount() {

        this.getProducts()
            .then(response => response.json())
            .then(products => {
                this.setState({products, loading: false});
                this.sortProducts(this.state.criteria);
            })

    }

    render() {


        return ( this.state.loading ?

                <Grid>
                    <Row>
                        <Col xsOffset={4} text-center>
                            <h2><PulseLoader color={'#333333'} loading="true"/></h2>
                        </Col>
                    </Row>
                </Grid>

                :

                <Grid fluid className="show-grid">
                    <Row>
                        <Jumbotron className="customHeaderTitle" >
                            <h1>{this.state.family.name}</h1>
                        </Jumbotron>
                    </Row>


                    <Grid>
                        <Row>
                            <Navbar collapseOnSelect>
                                <Nav>
                                    <NavItem> {this.state.products.length} of {this.state.products.length} products </NavItem>
                                </Nav>

                                <Navbar.Header>
                                    <Navbar.Toggle/>
                                </Navbar.Header>

                                <Navbar.Collapse>
                                    <Nav>
                                        <NavItem>Sort by: </NavItem>
                                        <NavItem onClick={() => this.sortProducts('low-price-first')}>Lowest
                                            price</NavItem>
                                        <NavItem onClick={() => this.sortProducts('high-price-first')}>Highest
                                            price</NavItem>

                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                        </Row>

                        <Row>
                            <ProductList products={this.state.products} user={this.props.user}
                                         redeemProduct={(product) => this.props.redeemProduct(product)}/>
                        </Row>

                        <Row>
                            <Navbar>
                                <Nav>
                                    <NavItem> {this.state.products.length} of {this.state.products.length} products </NavItem>
                                </Nav>
                            </Navbar>
                        </Row>

                    </Grid>


                </Grid>

        );
    }

    getProducts = () => {
        return fetch('https://aerolab-challenge.now.sh/products',
            {
                headers: {
                    "Content-Type":
                        "application/json",
                    "Accept":
                        "application/json",
                    "Authorization":
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTBjYTM1Y2U0OTYwMDAwNjBkMDBhODAiLCJpYXQiOjE1MTA3Nzc2OTJ9.kawyFF2Aq1jexnoufnG0mYzCZ_an4fO3RHvsvMEyl-U"
                }
                ,
                method: 'GET' // opcional
            })


    }

    sortProducts = (criteria) => {
        let products = this.state.products;
        console.log(criteria);
        switch (criteria) {
            case 'low-price-first':
                products.sort(function (a, b) {
                    return a.cost - b.cost;
                });
                break;
            case 'high-price-first':
                products.sort(function (a, b) {
                    return b.cost - a.cost;
                });
                break;
            default:
                break;
        }
        this.setState({products, criteria});
    }

}


export default ProductFamily;
