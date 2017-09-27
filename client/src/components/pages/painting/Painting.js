/**
 * Created by amirassad on 7/18/17.
 */

import React from 'react';
import { Image, Row, Col, Well, Button } from 'react-bootstrap';
// import s from '../../uploads/Sensational.jpg';

class Painting extends React.Component {

    constructor(){
        super();
        this.onReadMore = this.onReadMore.bind(this);
        this.state = {
            readMore: false
        };
    }

    onReadMore() {
        this.setState({ readMore: true })
    }

    render() {
        const { readMore, title, description, image } = this.props;

        return(
            <Well>
                <Row>
                    <Col xs={10} sm={12}>
                        <h6>Title: {title}</h6>
                        <p>Description: {(description.length > 18 && readMore === false) ?
                            (description.substring(0,18)) : (description)}
                            {/*<button className='link' onClick={this.onReadMore}>*/}
                            {/*{(this.state.readMore === false && this.props.description !== null &&*/}
                            {/*this.props.description.length > 18) ? ('...read more'): ('')}*/}
                            {/*</button>*/}
                        </p>
                    </Col>
                    {/*//todo: using local files is not allowed in chrome*/}
                    <Col xs={10} sm={12}>
                        {/*<Image src={this.props.image} responsive/>*/}
                        <img src={ image } />
                    </Col>
                </Row>
            </Well>
        )
    }
}

export default Painting;

