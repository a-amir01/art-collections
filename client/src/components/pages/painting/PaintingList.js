/**
 * Created by amirassad on 7/18/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Painting from './Painting';

import { Container, Segment } from 'semantic-ui-react'

// https://masonry.desandro.com/

function generateElements(paintings, categories, category, dispatchUpdatePainting) {

    return paintings.map(painting=>{
        console.log("PaintingList: Generating paintings ", JSON.stringify(paintings));
        return (
            <Segment padded="very" key={ painting._id } style={{ background: "#ccb508"}}>
                <Painting
                    painting={ painting }
                    dispatchUpdatePainting={ dispatchUpdatePainting }
                    category={ category }
                    categories={ categories }
                />
            </Segment>
        )
    });
}

function PaintingList ({ paintings, categories, category, dispatchUpdatePainting }) {
        console.log("PaintingList: render\n");

        const paintingList = generateElements(paintings, categories, category, dispatchUpdatePainting);

        return (
            <div>
                <h1>{ category }</h1>
                <Container style={{ background: "#9e8b08", padding: "30px 30px", margin: "10px auto", borderRadius: "8px" }}>
                    { paintingList }
                </Container>
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