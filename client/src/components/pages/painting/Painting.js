/**
 * Created by amirassad on 7/18/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Image, Row, Col, Well, Button } from 'react-bootstrap';

import PaintingForm from './PaintingForm';

class Painting extends React.Component {
    static propTypes = {
        painting: PropTypes.object.isRequired,
    };

    constructor(props, context){
        super(props, context);
        this.editPainting = this.editPainting.bind(this);
        this.updatePainting = this.updatePainting.bind(this);
        this.cancelUpdate = this.cancelUpdate.bind(this);

        this.state = {
            isEditing: false,
            painting: this.props.painting
        };
    }

    editPainting() {
        const { isEditing } = this.state;
        this.setState({ isEditing: !isEditing });
    }

    updatePainting(values) {
        const { dispatchUpdatePainting } = this.props;
        const { isEditing } = this.state;
        dispatchUpdatePainting(values);
        this.setState({ isEditing: !isEditing });
    }

    cancelUpdate() {
        const { isEditing } = this.state;
        this.setState({ isEditing: !isEditing });
    }

    render() {

        const { readMore, painting: { title, description, image, _id }, categories } = this.props;
        const { isEditing } = this.state;
        // style={{ display: "block",  marginLeft: 'auto', marginRight: 'auto', width: "50%"}}
        if(isEditing) {
            return (
                <div>
                    <Button bsStyle="danger" style={{ float: "right", opacity: "50%", color:"black" }} onClick={ this.cancelUpdate }>X</Button>
                    <PaintingForm
                       _id={ _id }
                       form={ `${ title }-${ _id }` }
                       imgFile={ image }
                       categories= { categories }
                       updateForm={ this.updatePainting }
                       initialValues={ this.props.painting }
                       shouldUpdateForm={ true }
                    />
                </div>
            )
        }

        return(
            <div>
                <Well>
                    <Row>
                        <Col xs={10} md={8}>
                            {/*<img style={{ display: 'inline-block', marginLeft: 'auto', marginRight: 'auto', position: 'relative' }} src={ image } />*/}
                            <Image src={ image } rounded />
                            {/*<img style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }} src={ image } />*/}
                        </Col>
                        <Col xs={6} md={4}>
                            <h6>Title: { title }</h6>
                            <p>Description: { (description.length > 18 && readMore === false) ?
                                (description.substring(0,18)) : (description) }
                                {/*<button className='link' onClick={this.onReadMore}>*/}
                                {/*{(this.state.readMore === false && this.props.description !== null &&*/}
                                {/*this.props.description.length > 18) ? ('...read more'): ('')}*/}
                                {/*</button>*/}
                            </p>
                            <Button onClick={ this.editPainting }>Edit</Button>
                        </Col>
                    </Row>
                </Well>
            </div>
        );
    }
}

export default Painting;