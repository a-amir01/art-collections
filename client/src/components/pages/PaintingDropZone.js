/**
 * Created by amirassad on 8/29/17.
 */

import React from 'react';
import DropZone from 'react-dropzone';
import FileReader from 'filereader';

class PaintingDropZone extends React.Component {
    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
        this.state = {
            images: []
        };
    }

    onDrop(files) {
        // files.forEach(file => {
        //     const reader = new window.FileReader();
        //     reader.onload = () => {
        //         const fileAsBinaryString = reader.result;
        //         this.setState({ images: this.state.images.concat(fileAsBinaryString) });
        //         console.log("FileReader ", fileAsBinaryString);
        //         // do whatever you want with the file content
        //     };
        //     reader.onabort = () => console.log('file reading was aborted');
        //     reader.onerror = () => console.log('file reading has failed');
        //     reader.readAsBinaryString(file);
        // });

        //pass the data back for each drop zone
        this.props.DropZone(files);
        this.setState({ images: this.state.images.concat(files) });
    }
    render() {
        const { images } = this.state;
        return (
            <section>
                <div>
                    <DropZone
                        name="MyDropZone"
                        onDrop={ this.onDrop } >
                        <div>Try dropping some files here, or click to select files to upload.</div>
                    </DropZone>

                </div>
                <aside>
                    <h2>{this.state.images.length}</h2>
                    {
                        this.state.images.map(file =>
                            <div key={ file.name }><img src={ file.preview } key={file.name}/>{file.name}</div> )
                    }
                </aside>
            </section>
        );
    }
}

export default PaintingDropZone;

