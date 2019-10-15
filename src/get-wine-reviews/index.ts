import stringify from 'csv-stringify/lib/sync';
import { promises as fs } from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import { Review } from '../../typings/review';

interface ReviewsResponse {
  reviews: Review[];
}

const rawReviewsPath = path.resolve(__dirname, '../../data/raw-reviews.json');
const reviewsPath = path.resolve(__dirname, '../../data/reviews.json');
const csVReviewsPath = path.resolve(__dirname, '../../data/reviews.csv');

const getReview = async ({ page = 0 }): Promise<Review[]> => {
  try {
    const response = await fetch(
      `https://www.vivino.com/api/wines/2359621/reviews?year=2017&page=${page}`,
    );

    if (response.ok) {
      const data: ReviewsResponse = await response.json();
      const { reviews } = data;
      return reviews;
    } else {
      throw new Error(await response.text());
    }
  } catch (error) {
    // tslint:disable-next-line: no-console
    console.error(error);
    throw Error;
  }
};

const getReviewList = async ({ page = 0 }): Promise<Review[]> => {
  const reviews = await getReview({ page });
  // tslint:disable-next-line: no-console
  console.log('Retreiving data from API for page : ' + page);
  if (reviews.length > 0) {
    return reviews.concat(await getReviewList({ page: page + 1 }));
  } else {
    return reviews;
  }
};

const start = async () => {
  // tslint:disable-next-line: no-console
  console.log('Start fetch reviews 🧨');
  const rawReviews = await getReviewList({ page: 0 });
  // tslint:disable-next-line: no-console
  console.log('Finish fetch reviews 🏁');
  // tslint:disable-next-line: no-console
  console.log('transforming data 🏭');
  const reviews = rawReviews.map(review => ({
    name: review.user.alias,
    rate: review.rating,
    comment: review.note,
    timestamp: review.created_at,
    vintageSeoName: review.vintage.seo_name,
    vintageName: review.vintage.name,
    vintageId: review.vintage.id,
  }));

  const csvReview = stringify(reviews, { header: true });

  // tslint:disable-next-line: no-console
  console.log('Writing files 📝');
  await fs.writeFile(rawReviewsPath, JSON.stringify({ rawReviews }));
  await fs.writeFile(reviewsPath, JSON.stringify({ reviews }));
  await fs.writeFile(csVReviewsPath, csvReview);

  // tslint:disable-next-line: no-console
  console.log('Done 🎉💥');
};

start();
