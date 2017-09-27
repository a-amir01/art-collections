/**
 * Created by amirassad on 9/25/17.
 */

/**
 * Created by amirassad on 7/18/17.
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import { getPaintingsByCategory } from "../../actions/paintingActions";
//import Painting from './Painting';
import PaintingList from '../../components/pages/painting/PaintingList';

// https://masonry.desandro.com/

class PaintingListContainer extends React.Component {
    componentDidMount(){
        console.log("PaintingListContainer: componentDidMount\n");
        this.props.getPaintingsByCategory(this.props.match.params.category);
    }
    render(){
        const { paintings } = this.props;
        const category = this.props.match.params.category;
        return (
            <PaintingList
                paintings={ paintings }
                category={ category }
            />
        );
    }
}

function mapStateToProps(state){
    console.log("PaintingListContainer: mapStateToProps\n", state);
    return {
        paintings: state.paintingReducers.paintings,
    }
}

function mapDispatchToProps(dispatch){
    console.log("PaintingListContainer: mapDispatchToProps\n");
    return bindActionCreators({ getPaintingsByCategory }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PaintingListContainer);