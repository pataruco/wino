// @ts-ignore
import { LanguageServiceClient } from '@google-cloud/language';
import { promises as fs } from 'fs';

import stringify from 'csv-stringify/lib/sync';
import path from 'path';

import * as credentials from '../../.env.json';
import * as reviewsData from '../../data/reviews.json';

const { client_email, private_key } = credentials;
const { reviews } = reviewsData;

const sentimentReviewPath = path.resolve(
  __dirname,
  '../../data/reviews-with-sentiment.json',
);

const csVSentimentReviewPath = path.resolve(
  __dirname,
  '../../data/reviews-with-sentiment.csv',
);
const client = new LanguageServiceClient({
  credentials: {
    client_email,
    private_key,
  },
});

interface SentimentResult {
  language: null | string;
  magnitude: null | number;
  score: null | number;
  error: null | string;
}

interface SentimentDocument {
  content: string;
  type: string;
}

const getSentiment = async (
  document: SentimentDocument,
): Promise<SentimentResult> => {
  try {
    const [result] = await client.analyzeSentiment({ document });
    const {
      language,
      documentSentiment: { magnitude, score },
    } = result;
    return { language, magnitude, score, error: null };
  } catch (error) {
    // tslint:disable-next-line: no-console
    console.error(error.details);
    return {
      language: null,
      magnitude: null,
      score: null,
      error: error.details,
    };
  }
};

const start = async () => {
  // tslint:disable-next-line: no-console
  console.log('Start fetch reviews sentiment 🧨');
  const reviewWithSentiment = await Promise.all(
    reviews.map(async review => {
      const document: SentimentDocument = {
        content: review.comment,
        type: 'PLAIN_TEXT',
      };
      // tslint:disable-next-line: no-console
      console.log(`Getting sentiment from review ${review.vintageId} ✨`);
      const { language, magnitude, score, error } = await getSentiment(
        document,
      );

      return { ...review, language, magnitude, score, error };
    }),
  );

  const csvReview = stringify(reviewWithSentiment, { header: true });

  // tslint:disable-next-line: no-console
  console.log('Writing files 📝');
  await fs.writeFile(
    sentimentReviewPath,
    JSON.stringify({ reviewWithSentiment }),
  );
  await fs.writeFile(csVSentimentReviewPath, csvReview);

  // tslint:disable-next-line: no-console
  console.log('Done 🎉💥');
};

start();
