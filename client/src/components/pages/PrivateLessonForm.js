/**
 * Created by amirassad on 7/27/17.
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class PrivateLessonForm extends React.Component {
    render(){
        return (
            <h1>PrivateLessonForm</h1>
        );
    }
}

function mapStateToProps(state){
    return {

    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateLessonForm);

