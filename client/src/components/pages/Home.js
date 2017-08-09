/**
 * Created by amirassad on 7/27/17.
*/

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col, Button } from 'react-bootstrap';

import { getPaintings } from "../../actions/paintingActions";

import { Carousel } from 'react-responsive-carousel';

class Home extends React.Component {
    getCarouselPaintings(){
        return this.props.paintings
            .filter(painting => painting.inCarousel === true)
            .map(painting =>{
                return (
                    <div>
                        <h3>{painting}</h3>
                        <img width={1000} height={600} src={painting.image}/>
                    </div>
                )
            });
    }

    render () {
        console.log("Home: render\n");
        const carouselPaintings = this.props.paintings
            .filter(painting => painting.inCarousel === true)
            .map(painting =>{
                return (
                    <div>
                        <h3>{painting}</h3>
                        <img width={1000} height={600} src="/images/Accomplished.jpg"/>
                    </div>
                )
            });

        return (
            <Grid>
                <Row>
                    <Carousel axis="horizontal" showThumbs={false} useKeyboardArrows infiniteLoop dynamicHeight emulateTouch>
                        {/*{ carouselPaintings }*/}
                        <img width={1000} height={600} src="/images/Accomplished.jpg"/>
                        <img width={1000} height={600} src="/images/Maturity.jpg"/>
                    </Carousel>
                </Row>
            </Grid>
        )
    }
}

function mapStateToProps(state){
    return {
        paintings: state.paintingReducers.paintings,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getPaintings}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);