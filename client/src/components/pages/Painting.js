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
		return(
			<Well>
				<Row>
					<Col xs={12} sm={4}>
						<Image src={this.props.images} responsive/>
					</Col>
					<Col xs={6} sm={8}>
						<h6>{this.props.title}</h6>
						<p>{(this.props.description.length > 18 && this.state.readMore === false) ?
							(this.props.description.substring(0,18)) : (this.props.description)}
							<button className='link' onClick={this.onReadMore.bind(this)}>
								{(this.state.readMore === false && this.props.description !== null &&
								this.props.description.length > 18) ? ('...read more'): ('')}
							</button>
						</p>
					</Col>
				</Row>
			</Well>
		)
	}
}

export default Painting;

