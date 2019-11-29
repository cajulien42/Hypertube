***My thoughts***
```
Db  should contains two libraries fields and a user field: {
  library0: {
    movies: ArrayOfMovies,
    shows: ArrayOfShows, // To do
  }
  library1: {
    movies: ArrayOfMovies,
    shows: ArrayOfShows, // To do
  }
  users: ArrayOfUsers // handled by philoutre
}

When the App starts, it checks db connection, update library0, and then launch the server, which will use library0. every *duration TBdetermined* library 1 will be updated, then server will swap to library1 and so on.

Error during launch/update: 
  For now : process exits
  In the future: Retry and restart server regularly until it works

```

