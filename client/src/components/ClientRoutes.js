/**
 * Created by amirassad on 8/6/17.
 */

import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavigationContainer from '../containers/NavigationContainer';
import Footer from './pages/Footer';
import PaintingListContainer from '../containers/painting/PaintingListContainer';
import HomeContainer from '../containers/HomeContainer';
import Biography from './pages/Biography';
import * as actions from '../actions/paintingActions';

// import CustomOrders from './pages/CustomOrders';
// import PrivateLessonForm from './pages/PrivateLessonForm';
// import Exhibitions from './pages/Exhibitions';
import CategoryFormContainer from '../containers/category/CategoryFormContainer';
import PaintingDropZone from './pages/painting/PaintingDropZone';

class ClientRoutes extends React.Component {
    render() {
        console.log("IN RENDER\n");
        return (
            <BrowserRouter>
                <div>
                    <NavigationContainer/>
                    <div>
                        {/*<Switch>*/}
                        <Route path="/admin" component={ PaintingDropZone }/>
                        <Route path="/category" component={ CategoryFormContainer }/>
                        <Route path="/biography" component={ Biography }/>
                        <Route path="/gallery/:category" component={ PaintingListContainer }/>
                        <Route exact path="/" component={ HomeContainer }/>
                        {/*</NSwitch>*/}
                    </div>
                    <Footer/>
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(null, actions)(ClientRoutes);