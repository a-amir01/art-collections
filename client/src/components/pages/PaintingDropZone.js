/**
 * Created by amirassad on 8/29/17.
 */

import React from 'react';
import DropZone from 'react-dropzone';
import { Link } from 'react-router-dom';
import FileReader from 'filereader';
import { Button } from 'react-bootstrap';
import FillPaintingForms from "./FillPaintingForms";


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
    onDrop(files) {
        // files.forEach(file => {
        //     const reader = new window.FileReader();
        //     reader.onload = () => {
        //         const fileAsBinaryString = reader.result;
        //         this.setState({ images: this.state.images.concat(fileAsBinaryString) });
        //         console.log("FileReader ", fileAsBinaryString);
        //            writeFIleToDisk(fileAsBinaryString)
        //         // do whatever you want with the file content
        //     };
        //     reader.onabort = () => console.log('file reading was aborted');
        //     reader.onerror = () => console.log('file reading has failed');
        //     reader.readAsBinaryString(file);
        // });

        //pass the data back for each drop zone
        // this.props.DropZone(files);
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

                {/*<Button bsStyle="primary" bsSize="lg" active onClick={ this.onNext }>Next</Button>*/}
                { next ? <FillPaintingForms
                            images={images}/>
                       : "" }
            </section>
        );
    }
}

export default PaintingDropZone;

