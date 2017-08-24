/**
 * Created by amirassad on 8/9/17.
 */


import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Admin extends React.Component {
    render(){
        return (
            <h1>Admin</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
