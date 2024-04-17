import React from 'react';
import '../styles.css';

export function New() {
    return (
        <main>
            <div id="player-messages"></div>
            <div className="body-flex">
                <h1>Save Object to Local Storage</h1>

                <form id="uploadForm" encType="multipart/form-data">
                    <label form="textFile">Text File:</label>
                    <input className="button" type="file" id="textFile" /><br />

                    <label form="mp3File">MP3 File:</label>
                    <input className="button" type="file" id="mp3File" /><br />

                    <label form="songTitle">Title:</label>
                    <textarea id="songTitle" rows="2" cols="50"></textarea><br />
                    <div id="buttonPlaceHolder"></div>
                </form>
            </div>
        </main>
    );
}
