/**
 * Created by amirassad on 7/18/17.
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import { getPaintingsByCategory } from "../../actions/paintingActions";
import Painting from './Painting';

// https://masonry.desandro.com/

class PaintingList extends React.Component {
    componentDidMount(){
        console.log("PaintingList: componentDidMount\n");
        this.props.getPaintingsByCategory(this.props.match.params.category);
    }
    render(){
        console.log("PaintingList: render\n");

        const paintingList = this.props.paintings.map(painting=>{
            console.log("PaintingList: Generating paintings\n");

            return (
                <Col xs={12} sm={6} md={4} key={ painting._id }>
                    <Painting
                        _id={painting._id}
                        title={painting.title}
                        description={painting.description}
                        image={painting.image}
                    />
                </Col>
            )
        });

        return (
            <Grid>
                <h1>{this.props.match.params.category}</h1>
                <Row style={{margineTop: '15px'}}>
                    {paintingList}
                </Row>
            </Grid>
        )
    }
}

function mapStateToProps(state){
    console.log("PaintingList: mapStateToProps\n", state);
    return {
        paintings: state.paintingReducers.paintings,
    }
}

function mapDispatchToProps(dispatch){
    console.log("PaintingList: mapDispatchToProps\n");
    return bindActionCreators({ getPaintingsByCategory }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PaintingList);