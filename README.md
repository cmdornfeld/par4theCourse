# PROJECT NAME

Par4theCourse

## Description

_Duration: 2 Week Sprint_

For my Prime Solo Project, I wanted to combine the software development skills I have learned with one of my biggest passions; the wonderful game of golf.  Par4theCourse is a mobile scorecard application which allows users to create a scorecard for all of their new rounds of golf.  Users can also track their entire history of rounds, view details of a specific round, and view all of the participating courses.

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Installation

1. Create a database named `par_4_the-course`,
2. Execute all of the scripts in the `database.sql` file.  This will create all of the necessary tables and populate the needed data to allow the application to run correctly. This project is built with [PostgreSQL](https://www.postgresql.org/download/), so you will need to make sure to have that installed. I recommend using [Postico](https://eggerapps.at/postico/) for your PostgreSQL client, as that is what I used for developing this application, 
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!

## Usage
How does someone use this application? Tell a user story here.

1. Register for an account by entering a username and password, or; Log in with your username and password if you are already a user
2. Upon logging in, you will land on the homepage, which includes all of your rounds played, and the option to begin a new round
3. Click on a specific round card to see further details of the round.  Total score, total par, total to/from par, and hole specific score/comments are available to view.  Click back to exit and return to your home page, or click delete to remove the round from your history.
4. Click start new round and move to the round details page.  Select the course you are playing, the number of holes, and the tee(distance) you are playing from, and click start to create your scorecard for the round.
5. Enter your score, and if you desire, any comment, for each hole.  Click on submit round to save your round.  At any time, click cancel to exit the round and delete it from your history.

## Roadmap
Moving forward with Par4theCourse, I would like to give users the ability to add their favorite courses to the application.  The list of available courses is unfortunately pretty small at the moment, and currently the only way to add courses, is to manually enter all of their information into the database.

## Built With
- node.js
- express.js
- React
- Redux
- Sagas
- CSS
- javascript
- PostgreSQL
- nodemon
- passport.js

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) in Minneapolis who equipped and helped me to make this application a reality. My instructors, Mary and Dev; my cohort, Trifid; Maddie, from our user experience cohort, Fleetwood! I couldn't have done it without you all!

## Support
If you have suggestions or issues, please email me at [cmdornfeld@gmail.com]