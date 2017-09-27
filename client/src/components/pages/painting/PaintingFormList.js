/**
 * Created by amirassad on 9/9/17.
 */

import React from 'react';
import _ from 'lodash';

import { Button } from 'react-bootstrap';

import PaintingFormContainer from '../../../containers/painting/PaintingFormContainer';

// https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0

export default function PaintingFormList({ images, click }) {
    return (
        <div>
            {/*<h1>FillPaintingForms</h1>*/}
            {
                images.map(file =>
                    <div key={ file.name }>
                        {/*<img src={ file.preview } key={file.name}/>{file.name}*/}
                        <PaintingFormContainer
                            form={ _.split(file.name, '.')[0] }
                            imgFile={ file }/>
                    </div> )
            }

            <Button bsStyle="primary" bsSize="lg" active onClick={ () => { click() } }>Publish</Button>

        </div>
    );
}

