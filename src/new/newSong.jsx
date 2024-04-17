import React from 'react';
import { useRef } from 'react';

export function New({userName}) {
    console.log(userName)
    const textFile = useRef(null);
    const mp3File = useRef(null);
    const songTitle = useRef(null);

    function upload(){
        const rating = [];
        const title = songTitle.current.value;
        const comments = [];
        if (!title.trim()) {
            alert('Please enter a title.');
            return;
        }

        const formData = new FormData();

        formData.append('textFile', textFile.current.files[0].name);
        formData.append('mp3File', mp3File.current.files[0].name);
        formData.append('title', title);
        formData.append('rating', rating)
        formData.append('comments', comments)

        fetch('/api/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then(error => {
                        throw new Error(error.error || 'Failed to upload files.');
                    });
                }
            })
            .then(data => {
                console.log(data.message);
            })
            .catch(error => {
                console.error('Error uploading files:', error.message);
            });
    }

    return (
        <main>
            <div id="player-messages"></div>
            <div className="body-flex">
                <h1>Save Object to Local Storage</h1>

                <form id="uploadForm" encType="multipart/form-data">
                    <label form="textFile">Text File:</label>
                    <input className="button" type="file" id="textFile" ref={textFile}/><br />

                    <label form="mp3File">MP3 File:</label>
                    <input className="button" type="file" id="mp3File" ref={mp3File}/><br />

                    <label form="songTitle">Title:</label>
                    <textarea id="songTitle" rows="2" cols="50" ref={songTitle}></textarea><br />

                    {userName !== '' ? (
                        <button id="saveButton" type="button" onClick={upload}>Save Object</button>
                    ) : (
                        <p>You must be signed in to save a song</p>
                    )}

                    <div id="buttonPlaceHolder"></div>
                </form>
            </div>
        </main>
    );
}
