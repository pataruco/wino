# Wino 🍷

## What is it?

A node app to get all the reviews from a wine and then see the sentiments using Google Cloud Machine Learning tool

## How to run it?

- Clone repo

```sh
git clone origin	git@github.com:pataruco/jimmy-wines.git
```

- Install dependecies

```sh
yarn
```

- Start script

```sh
yarn get:reviews
yarn:get:sentiments
```

- Go to [data](./data) folder and you can see
  - [raw data](./data/raw-reviews.json)
  - [data as JSON](./data/reviews.json)
  - [data with sentiment as CSV](./data/reviews-with-sentiment.csv)
  - [data with sentiment as JSON](./data/reviews-with-sentiment.json)
