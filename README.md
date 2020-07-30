# Warning

Hypertube can't function properly for now, due to changes in external APIs.

# Hypertube

3rd and last Web project for 42 school, Hypertube is a streaming site (made in React / Nodejs): 

This project was done with [Philippine S](https://github.com/pommedepain), [Clément F](https://github.com/Clemzerdu75) et [Benjamin T](https://github.com/BenjaminTle)

Clément was in charge of the front and UI/UX
Philippine was in charge on the API.
Benjamin was in charge of the streaming part.
I was in charge of the scrapping process, database and search engine, as well as authentication for Google and 42 accounts.  **(Nodejs, express, mongoDB, Oauth)**


## What is Hypertube ?

3rd and last project of the Web Branch of 42. Hypertube  is a streaming website based on the bittorrent protocole. After the user has authenticated, he is able to choose from our 14 000 film reference && 3000 shows.

### Features
- Automatic scrapping of external API (CRON) every day with a custom database switch system
- Live streaming, watch a torrent while downloading it.
- On the fly transcoding for the files with no supported extensions (ffmpeg)
- Fully customized player controls.
- Non-blocking download management.


## How to use it ?

Requirements: mongoDb running

Just go the the api folder and run `npm install` (bcrypt package may need to be installed manually: npm i bcrypt)
You can now just run `npm run dev` and you're ready to go.

Note that you need to have ffmpeg installed to make the website work with many extensions. Be sure you have it installed locally.

**NB: This project has only a pedagogic goal, it is not meant for production as this would cause a lot of copyright problems**
