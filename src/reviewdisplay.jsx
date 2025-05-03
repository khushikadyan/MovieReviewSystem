import React,{ useState, useEffect, } from 'react';
import { getReviews } from './Api/appwriteapi';
import styled from 'styled-components';

// Container for all reviews
const ReviewList = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-top: 2rem;
`;

// Individual review card
const ReviewItem = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-left: 4px solid #646cff;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }
`;

const ReviewerName = styled.h4`
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;

  &::before {
    content: "👤";
    margin-right: 8px;
    font-size: 0.9rem;
  }
`;

const ReviewText = styled.p`
  margin: 0 0 1rem 0;
  color: #555;
  line-height: 1.5;
  font-size: 0.95rem;
`;

const ReviewDate = styled.span`
  display: block;
  font-size: 0.8rem;
  color: #888;
  text-align: right;

  &::before {
    content: "📅 ";
  }
`;

const NoReviews = styled.p`
  text-align: center;
  padding: 2rem;
  background:rgb(161, 200, 239);
  border-radius: 8px;
  color: #666;
  font-size: 1rem;
  border: 1px dashed #ddd;

  &::before {
    content: "💬";
    display: block;
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
`;

function ReviewShow({movieId}) {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsData = await getReviews(movieId);
        setReviews(reviewsData);
      } catch (error) {
        setError('Failed to load reviews');
        console.error("Failed to load reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (isLoading) return <div className="loading-reviews">Loading reviews...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <ReviewList>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <ReviewItem key={review.$id} className="review-item">
            <ReviewerName className="reviewer-name">{review.name}</ReviewerName>
            <ReviewText className="review-text">{review.reviewText}</ReviewText>
            <ReviewDate className="review-date">
              {new Date(review.date).toLocaleDateString()}
            </ReviewDate>
          </ReviewItem>
        ))
      ) : (
        <NoReviews className="no-reviews">No reviews yet. Be the first to review!</NoReviews>
      )}
    </ReviewList>
  );
}

export default ReviewShow;