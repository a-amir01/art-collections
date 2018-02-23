/**
 * Created by amirassad on 9/25/17.
 */

/**
 * Created by amirassad on 7/18/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { dispatchGetPaintingsByCategory, dispatchUpdatePainting } from "../../actions/paintingActions";

import PaintingList from '../../components/pages/painting/PaintingList';

// https://masonry.desandro.com/

class PaintingListContainer extends React.Component {
    static propTypes = {
        paintings: PropTypes.array.isRequired,
        categories: PropTypes.array.isRequired,
        dispatchGetPaintingsByCategory: PropTypes.func.isRequired,
        dispatchUpdatePainting: PropTypes.func.isRequired,
    };

    // componentWillUnmount() {
    //     alert("componentWillUnmount");
    // }

    componentWillReceiveProps(nextProps) {
        const { match: { params } } = this.props;

        // alert("componentWillReceiveProps " + params.category + " " + nextProps.match.params.category);
        if(params.category !== nextProps.match.params.category) {
            this.props.dispatchGetPaintingsByCategory(nextProps.match.params.category);
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     alert("shouldComponentUpdate " + this.props.params.category !== nextProps.match.params.category);
    //     return this.props.match.params.category !== nextProps.match.params.category;
    // }

    // componentWillUpdate() {
    //     alert("componentWillUpdate");
    // }
    //
    // componentDidUpdate() {
    //     alert("componentDidUpdate");
    // }

    componentDidMount() {
        // alert("ComponentDidMount");
        const { dispatchGetPaintingsByCategory, match: { params } } = this.props;
        dispatchGetPaintingsByCategory(params.category);
    }

    render() {
        console.log("render in PaintingListContainer");
        const { paintings, categories, match: { params }, dispatchUpdatePainting } = this.props;
        const category = params.category;

        return (
            <PaintingList
                paintings={ paintings }
                category={ category }
                categories={ categories }
                dispatchUpdatePainting={ dispatchUpdatePainting }
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        paintings: state.paintingReducer.paintings,
        categories: state.categoryReducer.categories,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ dispatchGetPaintingsByCategory, dispatchUpdatePainting }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PaintingListContainer);