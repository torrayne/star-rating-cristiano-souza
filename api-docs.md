# Ratings API Docs

IMPORTANT NOTE: the leading slash in mandatory in all api calls.
"/api/ratings" is a valid url
"api/ratings" is not a valid url

## Conventions
This API follows standard HTTP status code practices. I.e. 2xx for success, 4xx for client errors, 5xx for server errors.

All endpoints in this api return an object with ***either***
- a `data` field, in case of success. Possible examples:
    ```json
    {
        "data": {
            ...
        }
    }
    // or
    {
        "data": [
            ...
        ]
    }
    // or
    {
        "data": "ok"
    }
    ```
- an `errors` field, in case of error(s). An array of strings error messages. Example:
    ```json
    {
        "errors": [
            "<example> field is required"
        ]
    }
    ```

## Endpoints

`GET /api/ratings/:productId` (example: `/api/ratings/1234`)
Returns a list of all ratings for a product.
Request body: NONE
Response:
```json
{
    "data": [
        {
            "ratingValue": <number>,
            "ratingId": <string>,
            "productId": <number>
        },
        ...
    ]
}
```

------------

`POST /api/ratings`
Creates a new rating.
Request body:
```json
{
    "productId": <number>,
    "ratingValue": <number> // must be 1-5
}
```

Response:
```json
{
    "data": {
        "productId": <number>,
        "ratingId": <string>,
        "ratingValue": <number>
    }
}
```

------------

`PUT /api/rating/:ratingId` (example `/api/rating/clc024i1q000008l599wb09ry`)
Updates an existing rating
Request body:
```json
{
    "ratingValue": <number>, // must be 1-5
    "productId": <number> // optional
}
```

Response:
```json
{
    "data": {
        "ratingValue": <number>,
        "ratingId": <string>
    }
}
```
