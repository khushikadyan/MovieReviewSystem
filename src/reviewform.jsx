
import { submitReview } from './Api/appwriteapi';
import React, { useState } from 'react'; // Add this at the top
import styled from 'styled-components';

const Form = styled.form`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color:rgb(239, 255, 100);
    box-shadow: 0 0 0 3px rgba(242, 255, 100, 0.32);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 12px 16px;
  margin-bottom: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color:rgb(239, 255, 100);
    box-shadow: 0 0 0 3px rgba(242, 255, 100, 0.32);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  background-color: ${({ theme }) => theme.primary};
  color: black;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color:rgb(242, 194, 83);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const Message = styled.div`
  padding: 12px;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
`;

const ErrorMessage = styled(Message)`
   color: #ff3333;
  margin-bottom: 15px;
  padding: 10px;
  background-color: #ffeeee;
  border-radius: 4px;
  border-left: 3px solid #ff3333;
`;


function ReviewForm({movieId, onSuccess }) {
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !review.trim()) {
      setError('Please fill all fields');
      return;
    }
  
    setIsSubmitting(true);
    setError(null);

    
    try {
      await submitReview({
        movieId: movieId,
      name: name.trim(),
      reviewText: review.trim()
    });
      setName('');
      setReview('');
      onSuccess(); // Trigger refresh in parent
    } catch (error) {
      setError('Failed to submit review. Please try again.');
      console.error("Review submission failed:", {
        message: error.message,
        code: error.code,
        type: error.type
      });

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} >
      {error && <ErrorMessage> {error}</ErrorMessage>}
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        required
      />
      <TextArea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Your review"
        required
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </Button>
    </Form>
  );
}

export default ReviewForm;