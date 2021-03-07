import React, { Component } from 'react';
import './ImageUploader.css';

class ImageUploader extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            imagePreviewUrl: null
        };
    }
    

    fileChangedHandler = event => {
        this.props.update_image(event.target.files[0])
 
        let reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(event.target.files[0])
    }


    
    render() {
        return (
            <div className="Uploader">
                <p>Select image for your profile</p>
                <input type="file" name="avatar" onChange={this.fileChangedHandler} />
            </div>
        )
    }
}

export default ImageUploader;







