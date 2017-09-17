/**
 * Created by amirassad on 7/18/17.
 */

import React from 'react';
import { Image, Row, Col, Well, Button } from 'react-bootstrap';
// import { connect } from 'react-redux';
// import {bindActionCreators } from 'redux';

class Painting extends React.Component {
	constructor(){
		super();
		this.state = {
			readMore: false
		};
	}

	onReadMore() {
		this.setState({readMore: true})
	}

	render() {
	    console.log("PAINTING\n", this.props.image);
		return(
			<Well>
				<Row>
					<Col xs={6} sm={8}>
						<h6>Title: {this.props.title}</h6>
						<p>Description: {(this.props.description.length > 18 && this.state.readMore === false) ?
							(this.props.description.substring(0,18)) : (this.props.description)}
							{/*<button className='link' onClick={this.onReadMore.bind(this)}>*/}
								{/*{(this.state.readMore === false && this.props.description !== null &&*/}
								{/*this.props.description.length > 18) ? ('...read more'): ('')}*/}
							{/*</button>*/}
						</p>
					</Col>
                    {/*//todo: using local files is not allowed in chrome*/}
					<Col xs={6} sm={8}>
						<img src={this.props.image.preview} />
					</Col>
				</Row>
			</Well>
		)
	}
}

export default Painting;

