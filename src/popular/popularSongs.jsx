import React from 'react';
import '../styles.css';

export function Popular() {
    return (
        <main>
            <p>The following content is sorted based off download count</p>
            <div className="body-flex">
                <div className="song-box">
                    <img id="africa" className="songElement" src="../pictures/Play.png" alt="A Play Arrow" />
                    <p className="songElement">
                        <a href="individualSong.html">Toto - Africa</a>
                    </p>
                    <div className="star-rating songElement">
                        <span className="star" data-value="1">&#9733;</span>
                        <span className="star" data-value="2">&#9733;</span>
                        <span className="star" data-value="3">&#9733;</span>
                        <span className="star" data-value="4">&#9733;</span>
                        <span className="star" data-value="5">&#9733;</span>
                    </div>
                    <img className="songElement" src="../pictures/Download.png" alt="Download Symbol" />
                </div>

                <div className="song-box">
                    <img id="ariaMath" className="songElement" src="../pictures/Play.png" alt="A Play Arrow" />
                    <a href="individualSong.html">C418 - Aria <Math></Math></a>
                    <div className="star-rating">
                        <span className="star" data-value="1">&#9733;</span>
                        <span className="star" data-value="2">&#9733;</span>
                        <span className="star" data-value="3">&#9733;</span>
                        <span className="star" data-value="4">&#9733;</span>
                        <span className="star" data-value="5">&#9733;</span>
                    </div>
                    <img src="../pictures/Download.png" alt="Download Symbol" />
                </div>

                <div className="song-box">
                    <img id="fireflies" className="songElement" src="../pictures/Play.png" alt="A Play Arrow" />
                    <a href="individualSong.html">Owl City - Fireflies</a>
                    <div className="star-rating">
                        <span className="star" data-value="1">&#9733;</span>
                        <span className="star" data-value="2">&#9733;</span>
                        <span className="star" data-value="3">&#9733;</span>
                        <span className="star" data-value="4">&#9733;</span>
                        <span className="star" data-value="5">&#9733;</span>
                    </div>
                    <img src="../pictures/Download.png" alt="Download Symbol" />
                </div>
            </div>
        </main>
    );
}
