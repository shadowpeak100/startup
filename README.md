# Motor Music

Motor music is a fun way to learn hardware and software,
it teaches valuable skills and makes programming fun and
tangible. The process involves finding a song you like, or
making your own, building a mini-circuit that connects 
stepper motors to software then coding that song to sound
on the stepper motors. The Motor Music website allows users
to share and collaborate on projects and receive tutorials on
how to set up their own machines

### Technologies ###
1. **Authentication:** Users will be able to create profiles to store their information and view liked songs
2. **Database:** The database will store song programs created by users as well as user information
3. **Websockets:** Under the songs, users will be able to commend their thoughts and opinion's on a song's quality

### Key Features ###

The website will be able to show the most popular songs, by like count. It will also have the
ability to show which songs have been newly published. The commenting feature will allow
users to interact and leave their thoughts on songs. In addition to this, users will be able to 
rate songs using a star system to promote favorites and especially well done songs. The application is
designed to be clean, simple and user friendly with essential features but a quick learning curve for 
all ages.

### Sketches and Proof of Concept ###
##### Main Home page #####
![Concept Sketch 1](https://github.com/shadowpeak100/startup/blob/main/pictures/Website%20Mockup%20Part%201%20%5BCA%20260%5D.jpg?raw=true)
##### Individual Song Page #####
![Concept Sketch 1](https://github.com/shadowpeak100/startup/blob/main/pictures/Website%20mock%20up%20part%202%20%5BCS%20260%5D.jpg?raw=true)

## Basic HTML ##
2/5/24

The website has been given some basic HTML, including some space for websockets where a live comment/chat system will go.
This will better facilitate the sense of community fostered on the website. I also added a cool code block to give a preview
for the different songs others have written.

## CSS ##
2/14/24

The website has been made pretty! CSS has been added as well as responsive design. Upon resizing to a mobile size, 
a hamburger menu shows itself using flex box. The menu has been created as well as a search bar for finding songs from 
the data base (functionality will be added later but it has been formatted as a form) Other placeholders such as the 
login button will allow functionality in the future but has been put in place for now.

## JavaScript ##
2/28/24

The website now has the ability to play music, support for an RSS feed (for the websocket) and can save music objects then
put them into the all songs area. The new songs file was changed to new song, which allows for the uploading of information.
There is now also a login function that displays the username when signed in. This data is stored in local storage for now.

## Express ##
3/11/24

The website now hosts everything over express. It can stand on its own and download/display files. The ability to download
a previously uploaded file has been added as well. There is now a third party service call to get a chuck norris joke because
all APIs that were relevant to the website cost money I didn't want to pay.

## WebSockets ##
3/29/24

Websocket functionality conveys when a user uploads a new song on the "new" page. When a user uploads a song, a message 
pops up "new song uploaded new song: <Title here> just added, check it out!" This allows users to see when new items of 
interest are added so they can be amongst the first to check out the new hits!

## Database connections ##
4/15/24

Website now can store credentials and allow users to sign in/out. Only signed in users can upload
a new song under the "new" page. Going to "all" fetches the uploaded songs from the database. Passwords
are stored securely using Bcrypt and security protocols are now in place, we set auth cookies and a username
in local memory.

## React ##
4/17/24

The website now uses react to render elements! Upon sign in, the user can upload a song but this feature is restricted
only to a valid signed in user. The buttons on the navigation are all routers and hooks are used to dynamically change 
content via fetch requests. Everything is bundled using vite which minifies javascript and other files. Functional react 
components can be seen especially around the log in features, showing the pop up and allowing the ability to upload a new song.
