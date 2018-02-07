/**
 * Created by amirassad on 9/9/17.
 */

import React from 'react';
import _ from 'lodash';

import PaintingForm from '../../../components/pages/painting/PaintingForm';

/* https://redux-form.com/7.0.1/examples/
 * how to have multiple forms in one page
 * https://stackoverflow.com/questions/37456526/how-to-embed-the-same-redux-form-multiple-times-on-a-page/37464048#37464048
 * https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
 */

export default function PaintingFormList({ images, click, categories, saveForm }) {
    console.log(images);
    return (
        <div>
            {/*<h1>FillPaintingForms</h1>*/}
            {
                images.map(( { _id, file } ) => {
                    console.log(_id);
                    return (
                        <div key={ _id }>
                            {/*<img src={ file.preview } key={file.name}/>{file.name}*/}
                            <PaintingForm
                                _id={ _id }
                                form={ `${_.split(file.name, '.')[0]}-${_id}` }
                                imgFile={ file }
                                categories= { categories }
                                saveForm={ saveForm }
                            />
                        </div>
                    )
                })
            }

            {/*<Button bsStyle="primary" bsSize="lg" active onClick={ () => { click() } }>Publish</Button>*/}

        </div>
    );
}

