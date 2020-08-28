import React, {useState} from 'react';
import './css/homeimage.css'

export default function HomeImage(){
    const [image, setImage] = useState('BG.png');
    return(
        <div className="homeimage">
            <img src={require("../images/homeimage/" + image)} alt="Home Image"></img>
        </div>
    );
}