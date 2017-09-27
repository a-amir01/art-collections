/**
 * Created by amirassad on 7/18/17.
 */

import React from 'react';
import { Grid, Col, Row, Button } from 'react-bootstrap';

import Painting from './Painting';

// https://masonry.desandro.com/

function generateElements(paintings) {

    return paintings.map(painting=>{
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
}

function PaintingList ({ paintings, category }) {
        console.log("PaintingList: render\n");

        const paintingList = generateElements(paintings);

        return (
            <Grid>
                <h1>{ category }</h1>
                <Row style={{margineTop: '15px'}}>
                    {paintingList}
                </Row>
            </Grid>
        );
}

export default PaintingList;