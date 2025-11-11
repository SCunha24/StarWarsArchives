# StarWarsArchives
Assignment 2 — Static Website (Web Development)

This was Assignment nº2 for the Web Development subject. The goal was to create a static website with any theme of our choice. After some consideration, I decided to go with a Star Wars themed website. Initially, I thought about some RPG games, but it all came down to the available APIs. I found the SWAPI API, which has a lot of information about the Star Wars universe, enough to create many “cards” for display. The purpose of this website is to provide an interactive way for users to explore and learn about the Star Wars universe.

The website features a home page with information about the project, as well as four other pages: Characters, Planets, Vehicles, and Starships. There are three icons available that change the theme, with Star Wars related icons: Sith and Jedi banners, which adjust the colors accordingly, red and green. There’s also a “normal” icon with yellow colors to serve as a default mode.

On the content pages, the cards are clickable and open a panel displaying the image and information of the selected object.
The images for the character cards are sourced from another API (Akabab) on GitHub. For the other pages, the images are fetched from JSON files. I couldn’t find any API providing these images, so just created three JSON files and manually added the image URLs.