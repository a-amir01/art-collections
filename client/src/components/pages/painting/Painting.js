/**
 * Created by amirassad on 7/18/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Well } from 'react-bootstrap';

import { Button, Image, Grid, Container, Icon } from 'semantic-ui-react'

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

    async updatePainting(values) {
        const { dispatchUpdatePainting } = this.props;
        const { isEditing } = this.state;
        await dispatchUpdatePainting(values);
        this.setState({ isEditing: !isEditing });
    }

    cancelUpdate() {
        const { isEditing } = this.state;
        this.setState({ isEditing: !isEditing });
    }

    render() {

        const { readMore, painting: { title, description, image, _id }, categories } = this.props;
        const { isEditing } = this.state;

        if(isEditing) {
            return (
                <Container >

                    <div onClick={ this.cancelUpdate } style={{ float: "right", cursor: "pointer", marginTop: "5px" }}><Icon name="remove circle" color="red" size="big"/></div>
                    <PaintingForm
                       _id={ _id }
                       form={ `${ title }-${ _id }` }
                       imgFile={ image }
                       categories= { categories }
                       updateForm={ this.updatePainting }
                       initialValues={ this.props.painting }
                       shouldUpdateForm={ true }
                    />
                </Container>

            )
        }

        return(
            <Container>
                <Grid padded>
                    <Grid.Row>
                        <Grid.Column/>
                        <Grid.Column width={3}>
                            <h6>Title: { title }</h6>
                            <p>Description: { (description.length > 18 && readMore === false) ?
                                (description.substring(0,18)) : (description) }
                                {/*<button className='link' onClick={this.onReadMore}>*/}
                                {/*{(this.state.readMore === false && this.props.description !== null &&*/}
                                {/*this.props.description.length > 18) ? ('...read more'): ('')}*/}
                                {/*</button>*/}
                            </p>
                            <Button onClick={ this.editPainting }>Edit</Button>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Image src={ image } size='large' centered rounded />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

export default Painting;