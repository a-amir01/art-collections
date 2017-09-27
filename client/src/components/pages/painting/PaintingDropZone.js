/**
 * Created by amirassad on 8/29/17.
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DropZone from 'react-dropzone';

import PaintingFormListContainer from "../../../containers/painting/PaintingFormListContainer";

// const dropzoneStyle = {
//     width  : "100%",
//     height : "50%",
//     border : "1px solid black"
// };

class PaintingDropZone extends React.Component {
    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
        this.onNext = this.onNext.bind(this);
        this.state = {
            next: false,
            images: []
        };
    }

    onNext(){
        if(this.state.images.length === 0)
            alert("Must drop one or more pictures into the bucket!");
        else
            this.setState({ next: true });

    }
    //https://stackoverflow.com/questions/39663961/how-do-you-send-images-to-node-js-with-axios
    // https://medium.com/ecmastack/uploading-files-with-react-js-and-node-js-e7e6b707f4ef
    onDrop(files) {
        console.log("ONDROP\n\n\n\n");
        this.setState({ images: this.state.images.concat(files), next: true });
    }

    render() {
        const { images, next } = this.state;
        return (
            <section>
                <div>
                    <DropZone
                        name="MyDropZone"
                        onDrop={ this.onDrop }>
                        <div>Try dropping some files here, or click to select files to upload.</div>
                    </DropZone>

                </div>
                <aside>
                    <h2>{images.length}</h2>
                    {/*{*/}
                        {/*images.map(file =>*/}
                            {/*<div key={ file.name }><img src={ file.preview } key={file.name}/>{file.name}</div> )*/}
                    {/*}*/}
                </aside>

                { next ? <PaintingFormListContainer
                            images={images}/>
                       : "" }
            </section>
        );
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ }, dispatch);
}

export default connect(null, mapDispatchToProps)(PaintingDropZone);
