/**
 * Created by amirassad on 8/6/17.
 */

import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './navigation';
import Footer from './footer';
import PaintingList from './pages/PaintingList';
import Home from './pages/Home';
import Biography from './pages/Biography';
//import paintingActions from '../actions/paintingActions';
import * as actions from '../actions/paintingActions';

// import CustomOrders from './pages/CustomOrders';
// import PrivateLessonForm from './pages/PrivateLessonForm';
// import Exhibitions from './pages/Exhibitions';

class ClientRoutes extends React.Component {
    render() {
        console.log("IN RENDER\n");
        return (
            <BrowserRouter>
                <div>
                    <Navigation/>
                    <div>
                        {/*<Switch>*/}
                        <Route exact path="/" component={Home}/>
                        <Route path="/biography" component={Biography}/>
                        <Route path="/gallery/:category" component={PaintingList}/>
                        {/*</Switch>*/}
                    </div>
                    <Footer/>
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(null, actions)(ClientRoutes);