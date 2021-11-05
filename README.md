# Reddit Clone

This project is my interpretation of a Reddit-like backend service that provides an API to serve articles, comments, users, and topics; additionally users are able to update votes and add new comments to the database. If you would like to view the API currently hosted on Heroku, [please click here](https://nc-reddit-clone.herokuapp.com/api/) and you will be taken to a list of all the available endpoints in JSON format. If your browser does not support viewing JSON objects, please consider [this extension](https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh).

PostGreSQL version 14 and Node v.17 and greater is recommended to ensure the project runs as intended.

## Setup & Installation
If you would like to run this project on your local machine please clone the repository below:

> ```https://github.com/ASproson/nc-reddit-clone.git```

And then install all the dependencies stored in package.json with:

> ```npm i```

Before proceeding two files need to be created in the root folder, and can be done so with these commands:

> ```echo "PGDATABASE=nc_news_test" >> .env.test```

> ```echo "PGDATABASE=nc_news" >> .env.development```

Once this is complete we can then create the test and development databases with the following commands:

> ```npm run setup-dbs```

> ```npm run seed```

## Testing the endpoints & Localhost
As this project has been developed from the ground up using TDD (Jest), please enter the following command to see the full extent of the tests:

> ```npm test```

If you would like to use the API on your localhost enter the command:

> ```npm run start```

## Available endpoints



[GET /api/topics](https://nc-reddit-clone.herokuapp.com/api/topics) returns all topics

[GET /api/articles/:article_id](https://nc-reddit-clone.herokuapp.com/api/articles/1) returns article with specified article_id

[PATCH /api/articles/:article_id](https://nc-reddit-clone.herokuapp.com/api/articles/1) updates spcecified article's votes when passed a JSON object like: {inc_votes : 20}

[GET /api/articles](https://nc-reddit-clone.herokuapp.com/api/articles?sort_by=comment_count) returns an array of articles that can be sorted by any of the returned properties (defaults to date)

[GET /api/articles](https://nc-reddit-clone.herokuapp.com/api/articles?order=ASC) returns an array of articles ordered by date ascending

[GET /api/articles](https://nc-reddit-clone.herokuapp.com/api/articles?topic=cats) returns an array of articles filtered by specified topic

[GET /api/articles/:article_id/comments](https://nc-reddit-clone.herokuapp.com/api/articles/1/comments) returns an array of comments for the specified article_id

[POST /api/articles/:article_id/comments](https://nc-reddit-clone.herokuapp.com/api/articles/1/comments) adds a new comment to the specified article_id if username matches an existing user and passed body is not empty, then returns the posted comment

[DELETE /api/comments/:comment_id](https://nc-reddit-clone.herokuapp.com/api/comments/1) deletes a comment based on the specified comment_id

[GET /api](https://nc-reddit-clone.herokuapp.com/api) returns a JSON object describing all available endpoints on the API

