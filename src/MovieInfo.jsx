import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_KEY } from "./App";
import styled from "styled-components";
import ReviewForm from "./reviewform"; // Your review form component
import ReviewShow from "./reviewdisplay"; // Your review display component

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  justify-content: center;
  border: 1px solid lightgray;
  border-radius: 10px;
  background-color:transparent;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  margin: auto;
`;

const Header = styled.h1.withConfig({
  shouldForwardProp: (prop) => !['active'].includes(prop),
})`
font-size: 40px;
font-weight: bold;
color: #333;
text-align: center;
margin-bottom: 20px;
cursor: pointer;
transition: color 0.3s ease, transform 0.3s ease;

&:hover {
  color:rgb(124, 37, 0); /* Change color on hover */
  transform: scale(1.05); /* Slightly enlarge the header */
}

&:active {
  transform: scale(1); /* Reset scaling when clicked */
  color:rgb(217, 149, 137); /* Slightly darker color on active click */
}

&:focus {
  outline: none; /* Remove focus outline */
  box-shadow: 2px 2px 5px rgba(210, 184, 183, 0.8); /* Highlight with shadow */
}
`;


const MovieDetailsContainer = styled.div` 
   display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 20px;

  background: linear-gradient(135deg,rgb(29, 29, 45), #ffffff); /* Gradient from dark blue to white */
  padding: 20px;
  border-radius: 10px; /* Optional: for rounded corners */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Optional: subtle shadow */
  
  transition: background 0.5s ease-in-out; /* Smooth transition on background color change */
  
`;

const CoverImage = styled.img`
  object-fit: cover;
  height: 500px;
  border-radius: 10px;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  width:400px;
  margin-left: 20px;
 
`;

const MovieName = styled.h2`
  font-size: 22px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  text-transform: capitalize;
`;

const MovieInfo = styled.p`
  font-size: 16px;
  color: #444;
  margin: 5px 0;

  & span {
    font-weight: bold;
    color: #333;
  }
`;
const ReviewsSection = styled.div`
  margin-top: 40px;
  padding: 20px;
  background: linear-gradient(135deg,rgb(29, 29, 45), #ffffff); /* Gradient from dark blue to white */
  border-radius: 8px;
`;


const MovieInfoComponent = (props) => {
  const [movieInfo, setMovieInfo] = useState();
  const [refreshReviews, setRefreshReviews] = useState(0); 
  const { selectedMovie } = props;

  useEffect(() => {
    Axios.get(`https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`)
      .then((response) => setMovieInfo(response.data));
  }, [selectedMovie]);

 



  return (
    <Container>
      {movieInfo ? (
        <>
          <Header>Movie Review System</Header>
          <MovieDetailsContainer>
            <CoverImage src={movieInfo?.Poster} alt={movieInfo?.Title} />
            <InfoColumn>
              <MovieName>{movieInfo?.Title}</MovieName>
              <MovieInfo>
                <span>IMDB Rating:</span> {movieInfo?.imdbRating}
              </MovieInfo>
              <MovieInfo>
                <span>Year:</span> {movieInfo?.Year}
              </MovieInfo>
              <MovieInfo>
                <span>Language:</span> {movieInfo?.Language}
              </MovieInfo>
              <MovieInfo>
                <span>Rated:</span> {movieInfo?.Rated}
              </MovieInfo>
              <MovieInfo>
                <span>Released:</span> {movieInfo?.Released}
              </MovieInfo>
              <MovieInfo>
                <span>Runtime:</span> {movieInfo?.Runtime}
              </MovieInfo>
              <MovieInfo>
                <span>Genre:</span> {movieInfo?.Genre}
              </MovieInfo>
              <MovieInfo>
                <span>Director:</span> {movieInfo?.Director}
              </MovieInfo>
              <MovieInfo>
                <span>Actors:</span> {movieInfo?.Actors}
              </MovieInfo>
              <MovieInfo>
                <span>Plot:</span> {movieInfo?.Plot}
              </MovieInfo>
            </InfoColumn>
          </MovieDetailsContainer>
         
         {/* Review Section - Better Integrated */}
        <ReviewsSection> {/* Consider adding this styled component */}
        <ReviewForm 
              onSuccess={() => setRefreshReviews(prev => prev + 1)} 
              movieId={movieInfo.imdbID}
            />
            <ReviewShow 
              key={refreshReviews} 
              movieId={movieInfo.imdbID}
            />
        </ReviewsSection>
      </>
    ) : (
      <div style={{ textAlign: 'center', padding: '100px', color: 'white' }}>
        Loading movie details...
      </div>
    )}
  </Container>
);
};



export default MovieInfoComponent;
