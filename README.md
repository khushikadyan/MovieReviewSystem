 ### Movie Review System
Project Overview
The Movie Review System allows users to search for movies by title, view detailed information about each movie, and share their reviews. The system displays movie details such as the release date, IMDb rating, language, runtime, cast & crew, plot, and more. Users can also submit their reviews and rate the movies they've watched, providing a dynamic and interactive movie discovery experience.

### Features
Search Movies: Users can search for movies by entering the movie title or wish.

Movie Details: The system provides detailed information about the selected movie, including:

Release date

IMDb rating

Language

Runtime

Cast & Crew

Plot

Review System: Users can submit their reviews and rate the movie based on their viewing experience.

Responsive Design: The system is responsive, ensuring it works smoothly across different devices.

### Tech Stack
Frontend: React, Vite

Styling: Tailwind CSS

Backend: SQL (for storing movie details and user reviews)

API Integration: External API (for fetching movie details like IMDb ratings, plot, cast, etc.)

### Installation
To set up and run the project locally, follow these steps:

# Clone the repository:

bash 
```
git clone https://github.com/yourusername/movie-review-system.git
Navigate to the project directory:


cd movie-review-system
Install the required dependencies:

npm install
Set up the database:

Make sure you have an SQL database set up locally.

Create the necessary tables for storing movie details and reviews.
```

### Example SQL structure:

sql
```
CREATE TABLE movies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  release_date DATE,
  imdb_rating DECIMAL(3,2),
  language VARCHAR(50),
  runtime INT,
  plot TEXT,
  cast TEXT,
  crew TEXT
);

CREATE TABLE reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  movie_id INT,
  username VARCHAR(100),
  review TEXT,
  rating INT,
  FOREIGN KEY (movie_id) REFERENCES movies(id)
);
```
# Run the development server:

```
npm run dev
Open the app in your browser:


http://localhost:3000
```
### Usage
Search for Movies: Enter the movie title or wish in the search bar to find a movie.

View Movie Details: After selecting a movie, you'll see its details, including release date, IMDb rating, language, runtime, cast & crew, and plot.

Submit a Review: After watching a movie, submit your review and give it a rating to share your experience.


Contact
Khushi Kadyan

Email: [kadyankhushi290@gmail.com]

Acknowledgments
The movie data is sourced from an external movie API (e.g.OMDB API).

Tailwind CSS for responsive styling.

Vite for fast and optimized build setup.

live DEMO-

https://movie-review-system-mauve.vercel.app/
