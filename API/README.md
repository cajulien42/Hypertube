***My thoughts***
```
Our db contains Only already seen films: {
    id: movie.imdb_code,
    title: movie.title,
    englishTitle: movie.title_english,
    year: movie.year,
    rating: movie.rating,
    runtime: movie.runtime,
    genres: movie.genres,
    synopsis: movie.synopsis,
    language: movie.language,
    smallCover: movie.small_cover_image,
    mediumCover: movie.medium_cover_image,
    largeCover: movie.large_cover_image,
    state: movie.state,
    trailer: movie.yt_trailer_code,
    torrents: movie.torrents,
    seen: true,
}

When a user is browsing shows/films , we will use YST/popcorn APIs to provide the lists.
When a user wants to play a film, we will check the film ***imd_code*** against our DB.
if Found then play
else register films informations in our DB, start the download, then play.

```

