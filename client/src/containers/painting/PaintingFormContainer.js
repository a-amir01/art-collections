/**
 * Created by amirassad on 9/25/17.
 */

/**
 * Created by amirassad on 7/18/17.
 */

/* https://redux-form.com/7.0.1/examples/
 * how to have multiple forms in one page
 * https://stackoverflow.com/questions/37456526/how-to-embed-the-same-redux-form-multiple-times-on-a-page/37464048#37464048
 */

import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveForm } from '../../actions/paintingFormActions';
import PaintingForm from '../../components/pages/painting/PaintingForm';

class PaintingFormContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        const { categories, imgFile, form, saveForm, msg, style, status } = this.props;
        console.log("PaintingFormContainer\n\n", form);
        return (
            <PaintingForm
                form={ form }
                categories={ categories }
                onSave={ saveForm }
                imgFile={ imgFile }
                msg={ msg }
                style={ style }
                status={ status }
            />
        )
    }
}

function mapStateToProps(state){
    return {
        categories: state.categoryReducer.categories,
        msg:   state.paintingFormReducer.msg,
        style: state.paintingFormReducer.style,
        status: state.paintingFormReducer.validation,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ saveForm }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PaintingFormContainer);



