/**
 * Created by amirassad on 8/6/17.
 */

import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './footer';
import PaintingList from './pages/PaintingList';
import Home from './pages/Home';
import Biography from './pages/Biography';
//import paintingActions from '../actions/paintingActions';
import * as actions from '../actions/paintingActions';

// import CustomOrders from './pages/CustomOrders';
// import PrivateLessonForm from './pages/PrivateLessonForm';
// import Exhibitions from './pages/Exhibitions';
import PaintingForm from './pages/PaintingForm';
import PaintingCategoryForm from './pages/PaintingCategoryForm';
import PaintingDropZone from './pages/PaintingDropZone';

class ClientRoutes extends React.Component {
    render() {
        console.log("IN RENDER\n");
        return (
            <BrowserRouter>
                <div>
                    <Navigation/>
                    <div>
                        {/*<Switch>*/}
                        <Route path="/admin" component={ PaintingDropZone }/>
                        <Route path="/category" component={ PaintingCategoryForm }/>
                        <Route path="/biography" component={ Biography }/>
                        <Route path="/gallery/:category" component={ PaintingList }/>
                        <Route exact path="/" component={ Home }/>
                        {/*</NSwitch>*/}
                    </div>
                    <Footer/>
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(null, actions)(ClientRoutes);