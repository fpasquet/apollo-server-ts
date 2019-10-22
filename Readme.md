Query GraphQL:
```graphql
query MOVIES {
  movies {
      ...Movie
  }
}

query MOVIE_BY_SLUG($slug: String!) {
	movie(slug: $slug) {
      ...Movie
  }
}

mutation ADD_MOVIE($movie: MovieInput!) {
	addMovie(movie: $movie) {
		...Movie
	}
}

fragment Movie on Movie {
  slug
  releaseDate
  title
  summary
  posterPath
  ratings
  ratingsCount
  averageRating
}
```

Query variables:
```json
{
    "movie": {
        "releaseDate": "2019-10-22",
        "title": "Movie title",
        "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed faucibus augue. Proin porta, lacus id finibus imperdiet, nisi nulla luctus eros, non auctor libero dui at urna.",
        "posterPath": "posterPath"
    },
    "slug": "doctor-sleep"
}
```