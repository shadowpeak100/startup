import React from 'react';

export function Home() {
    return (
        <main>
    <div id="hero">
        <video loop muted autoPlay preload="auto">
            <source src="pictures/turntable.mp4" type="video/mp4"/>
            Your Browser does not support video
        </video>
        <div className="caption">
            <h1>Music // Movement</h1>
            <h2>Bridging hobbies, coding and hardware together</h2>
        </div>
    </div>

    <div className="articleTexture"></div>

    <div className="body-flex">
        <div className="song-box">
            <img id="africa" className="songElement" src="pictures/Play.png" alt="A Play Arrow"/>
            <p className="songElement">
                <a href="../archivedWebpages/individualSong.html">Toto - Africa</a>
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
            <a href="../archivedWebpages/individualSong.html">C418 - Aria Math</a>
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
            <a href="../archivedWebpages/individualSong.html">C418 - Aria Math</a>
            <div className="star-rating">
                <span className="star" data-value="1">&#9733;</span>
                <span className="star" data-value="2">&#9733;</span>
                <span className="star" data-value="3">&#9733;</span>
                <span className="star" data-value="4">&#9733;</span>
                <span className="star" data-value="5">&#9733;</span>
            </div>
            <img src="pictures/Download.png" alt="Download Symbol"/>
        </div>

        <h1>Chuck Norris Jokes</h1>
        <button id="getJokeButton">Get Joke</button>
        <div id="jokeContainer"></div>
    </div>

</main>
    )}
