// /**
//  * Created by amirassad on 9/25/17.
//  */
//
// /**
//  * Created by amirassad on 7/18/17.
//  */
//
//
//
// import React from 'react';
//
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { saveForm } from '../../actions/paintingFormActions';
// import PaintingForm from '../../components/pages/painting/PaintingForm';
//
// class PaintingFormContainer extends React.Component {
//
//     constructor(props) {
//         super(props);
//     }
//
//     render(){
//         const { categories, imgFile, form, saveForm } = this.props;
//         console.log("PaintingFormContainer\n\n", form);
//         return (
//             <PaintingForm
//                 form={ form }
//                 categories={ categories }
//                 saveForm={ saveForm }
//                 imgFile={ imgFile }
//             />
//         )
//     }
// }
//
// function mapStateToProps(state){
//     return {
//         categories: state.categoryReducer.categories,
//     }
// }
//
// function mapDispatchToProps(dispatch){
//     return bindActionCreators({ saveForm }, dispatch);
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(PaintingFormContainer);
//
//
//
