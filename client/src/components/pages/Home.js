/**
 * Created by amirassad on 7/27/17.
*/

import React from 'react';

import { Grid, Row } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';

// function getCarouselPaintings(){
//     return this.props.paintings
//         .filter(painting => painting.inCarousel === true)
//         .map(painting =>{
//             return (
//                 <div>
//                     <h3>{painting}</h3>
//                     <img width={1000} height={600} src={painting.image}/>
//                 </div>
//             )
//         });
// }

export default function  Home ({ paintings }) {

    // const carouselPaintings = paintings
    //     .filter(painting => painting.inCarousel === true)
    //     .map(painting =>{
    //         return (
    //             <div>
    //                 <h3>{painting}</h3>
    //                 <img width={1000} height={600} src="/images/Accomplished.jpg"/>
    //             </div>
    //         )
    //     });

    return (

            <Grid>
                <Row>
                    <Carousel axis="horizontal" showThumbs={false} useKeyboardArrows infiniteLoop dynamicHeight emulateTouch>
                        {/*{ carouselPaintings }*/}
                        <img width={1000} height={600} src="/images/Accomplished.jpg"/>
                        <img width={1000} height={600} src="/images/Maturity.jpg"/>
                    </Carousel>
                </Row>
            </Grid>
    )
}
