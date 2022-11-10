# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

This repository is the starter code for the project: Students will fork and clone this repository, then build upon it to practice their HTML, CSS, JS, jQuery and AJAX front-end skills, and their Node, Express back-end skills.

## Screenshots

!["Screenshot of app on a large screen"](https://github.com/sakonjo310/tweeter/blob/master/docs/largeScreen.png?raw=true)
!["Screenshot of app on tablets"](https://github.com/sakonjo310/tweeter/blob/master/docs/tabletMode.png?raw=true)
!["Screenshot of error message"](https://github.com/sakonjo310/tweeter/blob/master/docs/errorMessage.png?raw=true)
!["Screenshot of app on mobile devices"](https://github.com/sakonjo310/tweeter/blob/master/docs/Mobile.png?raw=true)

## Getting Started

1. [Create](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) a new repository using this repository as a template.
2. Clone your repository onto your local device.
3. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Features

- When you click "Write a new tweet" on top right corner, text area will appear on the screen. Click again if you want to hide the text area.
- As you type in the text area, you will see the character count on bottom right.
- When you type more than 140 characters (or nothing at all) and try to tweet, you will get a red error message.
- You will get a green success message (which will dessaper after 3 seconds) when the tweet was successful and you will see your tweet added at the top of your feed.
- Each tweet on your feed shows: tweeter's icon, their name, their username, their tweet message, when they tweeted, buttons (icons) to save, retweet or like the tweet.
- As you scroll down, a red up-arrow icon will fade in at bottom right. Click to go back to the top of the page.

## Responsive Designs

- On mobile devices(screen width smaller than 768px): "Write a new tweet" button changes to a bird icon.
- On tablets (screen width smaller than 1024px): "Write a new tweet" text appears and the bird icon is added at the end of the logo.
- On bigger screens (screen width bigger than 1024px): Profile and the feed displayed side by side. Height of the profile square changes accorging to the width.

## Dependencies

- Express
- Node 5.10.x or above


