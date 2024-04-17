import React from 'react';
import '../styles.css';

export function All(allSongs) {
    const [uploads, setUploads] = React.useState([]);

    // Demonstrates calling a service asynchronously so that
    // React can properly update state objects with the results.
    React.useEffect(() => {
        fetch('/api/files')
            .then((response) => response.json())
            .then((uploads) => {
                setUploads(uploads);
            });
    }, []);

return (
    <main>
        <div className="body-flex">
            <div className="song-box">
                <img id="africa" className="songElement" src="pictures/Play.png" alt="A Play Arrow"/>
                <p className="songElement">
                    <a href="../../archivedWebpages/individualSong.html">Toto - Africa</a>
                </p>
                <div className="star-rating songElement">
                    <span className="star" data-value="1">&#9733;</span>
                    <span className="star" data-value="2">&#9733;</span>
                    <span className="star" data-value="3">&#9733;</span>
                    <span className="star" data-value="4">&#9733;</span>
                    <span className="star" data-value="5">&#9733;</span>
                </div>
                <img className="songElement" src="pictures/Download.png" alt="Download Symbol"/>
            </div>

            <div className="song-box">
                <img id="ariaMath" className="songElement" src="pictures/Play.png" alt="A Play Arrow"/>
                <a href="../../archivedWebpages/individualSong.html">C418 - Aria Math</a>
                <div className="star-rating">
                    <span className="star" data-value="1">&#9733;</span>
                    <span className="star" data-value="2">&#9733;</span>
                    <span className="star" data-value="3">&#9733;</span>
                    <span className="star" data-value="4">&#9733;</span>
                    <span className="star" data-value="5">&#9733;</span>
                </div>
                <img src="pictures/Download.png" alt="Download Symbol"/>
            </div>

            <div className="song-box">
                <img id="fireflies" className="songElement" src="pictures/Play.png" alt="A Play Arrow"/>
                <a href="../../archivedWebpages/individualSong.html">Owl City - Fireflies</a>
                <div className="star-rating">
                    <span className="star" data-value="1">&#9733;</span>
                    <span className="star" data-value="2">&#9733;</span>
                    <span className="star" data-value="3">&#9733;</span>
                    <span className="star" data-value="4">&#9733;</span>
                    <span className="star" data-value="5">&#9733;</span>
                </div>
                <img src="pictures/Download.png" alt="Download Symbol"/>
            </div>

            <h1>Saved Objects</h1>
            <div id="savedObjectsContainer" className="body-flex">
                {uploads.map(upload => (
                    <div className="song-box">
                        <img id="fireflies" className="songElement" src="pictures/Play.png" alt="A Play Arrow"/>
                        <a href="">{upload.title}</a>
                        <div className="star-rating">
                            <span className="star" data-value="1">&#9733;</span>
                            <span className="star" data-value="2">&#9733;</span>
                            <span className="star" data-value="3">&#9733;</span>
                            <span className="star" data-value="4">&#9733;</span>
                            <span className="star" data-value="5">&#9733;</span>
                        </div>
                        <img src="pictures/Download.png" alt="Download Symbol"/>
                    </div>
                ))}
            </div>
        </div>
    </main>
)
}
