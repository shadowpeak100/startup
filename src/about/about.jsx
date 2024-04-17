import React from 'react';
import '../styles.css';

export function About() {
    return (
        <main>
            <div id="player-messages"></div>
            <div className="body-flex">
                <img className="profile" src="../../pictures/Brayden.jpg" alt="A picture of a very guapo dude repelling" />
                <h3>About me</h3>
                <p>Hi! My name is Brayden. I am currently a CS student at BYU and enjoy programming in Go the most. I love concurrency,
                    data processing and learning how memory works below the code. I also like side projects, like this that teach some wicked
                    cool hardware and software coordination with this clean HTML website. When I'm not coding, catch me outside repelling,
                    skiing, hiking or on some random adventure. Thanks for visiting the site!</p>
            </div>
        </main>
    );
}
