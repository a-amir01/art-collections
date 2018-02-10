/**
 * Created by amirassad on 7/18/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Painting from './Painting';

// https://masonry.desandro.com/

function generateElements(paintings, categories, category, dispatchUpdatePainting) {

    return paintings.map(painting=>{
        console.log("PaintingList: Generating paintings\n");
        return (
            <div key={ painting._id }>
                <Painting
                    painting={ painting }
                    dispatchUpdatePainting={ dispatchUpdatePainting }
                    category={ category }
                    categories={ categories }
                />
            </div>
        )
    });
}

function PaintingList ({ paintings, categories, category, dispatchUpdatePainting }) {
        console.log("PaintingList: render\n");

        const paintingList = generateElements(paintings, categories, category, dispatchUpdatePainting);

        return (
            <div>
                <h1>{ category }</h1>
                { paintingList }
            </div>
        );
}

export default PaintingList;

PaintingList.propTypes = {
    paintings: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired,
    dispatchUpdatePainting: PropTypes.func.isRequired,
};