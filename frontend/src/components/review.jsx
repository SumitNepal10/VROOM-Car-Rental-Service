import React, { useState } from 'react';

const CarRentalRating = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the rating and review to the server or perform any other action
    console.log('Rating:', rating);
    console.log('Review:', review);
    // Reset the form after submission
    setRating(0);
    setReview('');
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '400px', margin: '0 auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          <button onClick={handleClose} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#aaa' }}>×</button>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Share Your Car Rental Experience</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="review" style={{ display: 'block', marginBottom: '5px' }}>Your Review:</label>
              <textarea
                id="review"
                name="review"
                rows="4"
                cols="50"
                value={review}
                onChange={handleReviewChange}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                placeholder="Write your review here..."
                required
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Rating:</label>
              <div>
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    style={{
                      cursor: 'pointer',
                      color: index < rating ? '#ffc107' : '#ccc',
                      fontSize: '24px',
                      marginRight: '5px',
                    }}
                    onClick={() => handleRatingChange(index + 1)}
                  >
                    &#9733;
                  </span>
                ))}
              </div>
            </div>
            <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Submit</button>
          </form>
        </div>
      )}
    </>
  );
};

export default CarRentalRating;