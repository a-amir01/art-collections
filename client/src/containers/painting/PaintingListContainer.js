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

    componentDidMount() {
        const { dispatchGetPaintingsByCategory, match: { params} } = this.props;
        dispatchGetPaintingsByCategory(params.category);
    }

    render() {
        console.log("render in PaintingListContainer");
        const { paintings, categories, match: { params}, dispatchUpdatePainting } = this.props;
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