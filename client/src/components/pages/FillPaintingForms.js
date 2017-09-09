/**
 * Created by amirassad on 9/9/17.
 */

import React from 'react';
import PaintingForm from './PaintingForm';

class FillPaintingForms extends React.Component {
    render() {
        const images = this.props.images;
        return (
            <div>
                <h1>FillPaintingForms</h1>
                {
                    images.map(file =>
                    <div key={ file.name }>
                        {/*<img src={ file.preview } key={file.name}/>{file.name}*/}
                        <PaintingForm
                            imgFile={ file }/>
                    </div> )
                }
            </div>

        )
    }
}

export default FillPaintingForms;
