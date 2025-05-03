import React, { useState,useEffect } from "react";
import Axios from "axios";
import styled ,{keyframes}from "styled-components";
import MovieComponent from "./MovieComponent";
import MovieInfoComponent from "./MovieInfo";
import symbole from './assets/symbole.jpeg';
import searchicon from './assets/search.png';


export const API_KEY = "a9118a3a";

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;
const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;
const Container = styled.div`
 width:220vh;
  display: flex;
  background-image: url('/back2.jpeg');
  flex-direction: column;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  overflow: hidden;
  width:100vw;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  grid-template-columns:repeat(auto-fill,minmax(250px,1fr));
  gap: 25px;
  justify-content: space-evenly;
  background-color: rgba(31, 48, 58, 0.7); /* Semi-transparent sky blue */
  animation: fadeIn 1.5s ease-in-out; /* Smooth fade-in effect */

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  & > div:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease-in-out;
  }
`;
const Header = styled.div`
  background-color: rgba(0, 0, 0, 0.8); /* Semi-transparent black */
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: sticky;
  top:0;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 4px 30px 0 rgba(0, 0, 0, 0.7);
   border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  animation: slideIn 1s ease-in-out;

  @keyframes slideIn {
    from {
      transform: translateY(-50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  margin-left: 20px;
  width: 47%;
  background: rgba(255, 255, 255, 0.2)
  transition: all 0.3s ease;
  min-width: 250px;
    &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.02);
  }
    @media (max-width: 768px) {
    width: 60%;
  }
`;

const AppName = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  background: linear-gradient(90deg, #ff6b6b, #feca57, #1dd1a1, #54a0ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 300% 300%;
  animation: ${gradient} 5s ease infinite;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
  border-radius:50px;
  margin-right: 10px;
  opacity: 0.8;
`;
const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
  border-radius:50px;
`;
const SearchInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: white;
  font-size: 1rem;
  width: 100%;
  padding: 0.5rem 0;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;


const HeroSection = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%);
    z-index: 1;
}
`;
const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  background: linear-gradient(90deg, #fff, #f8f9fa);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
   
  &:hover{

  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.9);
    background-size: 200% 200%;
    animation: ${gradient} 3s ease infinite;
   
  }
  @media (max-width: 768px) {
    font-size: 2.5rem;
    &:hover {
      transform: none; /* Disable scale on mobile */
    }
  }
`;
const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto 2rem;
  position: relative;
  z-index: 2;
  opacity: 0.9;
  line-height: 1.6;
  &:hover {
    opacity: 1;
    transform: translateY(-3px);
    text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    
    /* Animated underline effect */
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent, #feca57, transparent);
      animation: underline 1.5s ease-in-out infinite;
    }
`;
const PlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  grid-column: 1 / -1;
`;
const PlaceholderImage = styled.img`
  width: 150px;
  height: 150px;
  opacity: 0.5;
  margin-bottom: 2rem;
  animation: ${float} 3s ease-in-out infinite;
`;
const PlaceholderText = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
`;

const CategoryTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
  flex-wrap: wrap;
`;
const TabButton = styled.button`
  background: ${props => props.$active ? "rgba(255, 255, 255, 0.2)" : "transparent"};
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  backdrop-filter: blur(5px);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

// Add to your styled components
const FooterContainer = styled.footer`
  background: rgba(27, 32, 41, 0.8);
  backdrop-filter: blur(10px);
  color: white;
  padding: 2rem 1rem;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  position: relative;
  z-index: 2;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const FooterLink = styled.a`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  
  &:hover {
    color: #feca57;
    transform: translateY(-2px);
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialIcon = styled.a`
  color: white;
  background: rgba(255, 255, 255, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: #feca57;
    transform: translateY(-3px) scale(1.1);
    color: #1a1a2e;
  }
`;

const Copyright = styled.p`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 1rem;
`;

const FooterPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.05;
  background-image: radial-gradient(#feca57 1px, transparent 1px);
  background-size: 20px 20px;
  z-index: 1;
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState("");
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [activeCategory, setActiveCategory] = useState("popular");
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { id: "popular", name: "Popular" },
    { id: "top_rated", name: "Top Rated" },
    { id: "upcoming", name: "Upcoming" },
    { id: "now_playing", name: "Now Playing" }
  ];

  const fetchData = async (searchString) => {
    setIsLoading(true);
    try {
      const response = await Axios.get(
        `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
      );
      updateMovieList(response.data?.Search || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchMoviesByCategory = async (category) => {
    setIsLoading(true);
    try {
      // Note: For actual implementation, you would need to use a different API
      // as OMDB doesn't support these categories directly
      // This is just a placeholder for the UI
      const response = await Axios.get(
        `https://www.omdbapi.com/?s=${category}&apikey=${API_KEY}`
      );
      updateMovieList(response.data?.Search || []);
    } catch (error) {
      console.error("Error fetching category data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onTextChange = (e) => {
    onMovieSelect(null);
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => {
      if (e.target.value.trim() !== "") {
        fetchData(e.target.value);
      } else {
        fetchMoviesByCategory(activeCategory);
      }
    }, 500);
    updateTimeoutId(timeout);
  };
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    updateSearchQuery("");
    fetchMoviesByCategory(category);
  };

  useEffect(() => {
    fetchMoviesByCategory(activeCategory);
  }, []);

  return (
    
    <Container>
      <Header>
        <AppName>
          <MovieImage src={symbole}alt="App Logo" />
         Movie Review System
        </AppName>
        <SearchBox>
          <SearchIcon src={searchicon} alt="Search" />
          <SearchInput
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>

      {!searchQuery && (
        <>
        <HeroSection>
          <HeroTitle>Discover Your Next Favorite Movie</HeroTitle>
          <HeroSubtitle>
            Explore thousands of movies, read reviews, and find hidden gems.
            Search above or browse our curated collections below.
          </HeroSubtitle>
        </HeroSection>

<CategoryTabs>
            {categories.map((category) => (
              <TabButton
                key={category.id}
                $active={activeCategory === category.id}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </TabButton>
            ))}
          </CategoryTabs>
          </>
      )}

      

      {selectedMovie && (
        <MovieInfoComponent
          selectedMovie={selectedMovie}
          onMovieSelect={onMovieSelect}
        />
      )}
      <MovieListContainer>
      {isLoading ? (
          <PlaceholderContainer>
            <PlaceholderImage src="/src/assets/loading.gif" alt="Loading" />
            <PlaceholderText>Loading movies...</PlaceholderText>
          </PlaceholderContainer>
        ) : movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <PlaceholderContainer>
            <PlaceholderImage src="/src/assets/film-reel.png" alt="No movies" />
            <PlaceholderText>
              {searchQuery
                ? `No movies found for "${searchQuery}". Try another search.`
                : "Discover movies by browsing categories or using the search above."}
            </PlaceholderText>
          </PlaceholderContainer>
        )}
      </MovieListContainer>

      <FooterContainer>
  <FooterPattern />
  <FooterContent>
    <FooterLinks>
      <FooterLink>This Project Belongs to : Khushi Kadyan </FooterLink>
      <FooterLink> Btech CSE DSAI </FooterLink>
      <FooterLink >Contact for Opportunities</FooterLink>
      
    </FooterLinks>
    
    <SocialIcons>
      <SocialIcon href="#"><i className="fab fa-twitter"></i></SocialIcon>
      <SocialIcon href="#"><i className="fab fa-facebook-f"></i></SocialIcon>
      <SocialIcon href="#"><i className="fab fa-instagram"></i></SocialIcon>
      <SocialIcon href="#"><i className="fab fa-youtube"></i></SocialIcon>
    </SocialIcons>
    
    <Copyright>
      © {new Date().getFullYear()} MovieMagic. All rights reserved.
    </Copyright>
  </FooterContent>
</FooterContainer>
    </Container>
  );
}

export default App;
