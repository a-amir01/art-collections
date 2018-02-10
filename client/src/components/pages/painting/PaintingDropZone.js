/**
 * Created by amirassad on 8/29/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import DropZone from 'react-dropzone';

import PaintingFormListContainer from "../../../containers/painting/PaintingFormListContainer";
const uuidv4 = require('uuid/v4');

class PaintingDropZone extends React.Component {
    static propTypes = {
        dispatchNewForms: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
    }

    //https://stackoverflow.com/questions/39663961/how-do-you-send-images-to-node-js-with-axios
    // https://medium.com/ecmastack/uploading-files-with-react-js-and-node-js-e7e6b707f4ef
    onDrop(files) {
        const { dispatchNewForms } = this.props;
        files = files.map(file => { return { "_id": uuidv4(), "file": file } });
        dispatchNewForms(files);
    }

    render() {
        const overlayStyle = {
            background: '#2acaff',
            position: 'relative',
            padding: '5em 0',
            textAlign: 'center',
            color: '#fff'
        };

        const { currentForms } = this.props;

        return (
            <section>
                <div>
                    <DropZone
                        style={ overlayStyle }
                        name="MyDropZone"
                        onDrop={ this.onDrop }>
                        <div>Try dropping some files here, or click to select files to upload.</div>
                    </DropZone>

                </div>
                <aside>
                    {/*{*/}
                        {/*images.map(file =>*/}
                            {/*<div key={ file.name }><img src={ file.preview } key={file.name}/>{file.name}</div> )*/}
                    {/*}*/}
                </aside>

                { currentForms.length !== 0 ? <PaintingFormListContainer/> : "" }
            </section>
        );
    }
}

export default PaintingDropZone;
