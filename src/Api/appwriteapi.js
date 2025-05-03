import { Client, Databases,Query,ID } from 'appwrite';

// Initialize the Appwrite client
const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1') // Your Appwrite endpoint
  .setProject('681242f900018bec2980'); // Your project ID

const databases = new Databases(client);

const DATABASE_ID = '681243b100131d747e01';
const REVIEWS_COLLECTION_ID = '681243de00157d6bbbea';

export async function submitReview({ movieId, name, reviewText }) {
  try {
    return await databases.createDocument(
      DATABASE_ID,
      REVIEWS_COLLECTION_ID,
      ID.unique(), // documentId
      {
        movieId,
        name,
        reviewText,
        date: new Date().toISOString()
      }
    );
  } catch (error) {
    console.error('Failed to submit review:', error);
    throw error;
  }
}


export async function getReviews(movieId) {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      REVIEWS_COLLECTION_ID,
      [
        Query.equal('movieId', movieId),
        Query.orderDesc('date')
      ]
    );
    return response.documents || [];
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    return [];
  }
}