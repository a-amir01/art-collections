/**
 * Created by amirassad on 7/18/17.
 */

import React from 'react';
import { Image, Row, Col, Well, Button } from 'react-bootstrap';

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
            <Row>
                <Col>
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
                <Col>
                    {/*<Image src={this.props.image} responsive/>*/}
                    <img src={ image } />
                </Col>
            </Row>
        )
    }
}

export default Painting;

