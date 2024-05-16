import React from 'react';

const ServiceTile = ({ title, description, imageUrl, detailLink, btnColor }) => {
  const tileStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: '200px', // Adjusted to make three tiles fit in a row
  };

  const imageStyle = {
    width: '100%', // Ensuring the image is responsive
    height: 'auto',
    marginBottom: '15px',
    borderRadius: '4px',
  };

  return (
    <div className="col-md-4 d-flex align-items-stretch mb-4">
      <div style={tileStyle}>
        <img src={imageUrl} alt={title} style={imageStyle} />
        <h5>{title}</h5>
        <p>{description}</p>
        <a href={detailLink} className="btn" style={{ backgroundColor: btnColor, borderColor: btnColor, color: '#fff' }}>More Details</a>
      </div>
    </div>
  );
};

const ServiceList = () => {
  return (
    <div className="container mt-4" style={{ margin: 'auto auto', padding: '20px' }}>
      <div className="row justify-content-center" style={{ display: 'flex', flexDirection: 'row', flex:'300px', flexWrap:'wrap' }}>
        <ServiceTile
          title='Products'
          description='Discover products that enhance your rental experience, from GPS units to child booster seats.'
          imageUrl='image/products1.png'
          detailLink='/vehicles'
          btnColor='#dc3545' // Redspot red color
        />
        <ServiceTile
          title='Services'
          description='Long term rentals, roadside assistance, and more to ensure a smooth journey.'
          imageUrl='image/services.jpg'
          detailLink='/vehicles'
          btnColor='#dc3545'
        />
        <ServiceTile
          title='Coverage Options'
          description='Car Rental Services offers a number of vehicle damage protection products that will help keep your peace of mind during your car rental trip.'
          imageUrl='image/coverage.png'
          detailLink='/vehicles'
          btnColor='#dc3545'
        />
        <ServiceTile
          title='Standard Fees and Charges'
          description='Additional Charges that apply to your Car Rental Services.'
          imageUrl='image/coverage.png'
          detailLink='/vehicles'
          btnColor='#dc3545'
        />
        <ServiceTile
          title='Locations'
          description='Redspot Car Rentals has locations throughout Nepal with both inside and out side valley, regional and airport offices..'
          imageUrl='image/services.jpg'
          detailLink='/vehicles'
          btnColor='#dc3545'
        />
        <ServiceTile
          title='Fleet'
          description='Make your own group of cars which are the best for your own use.'
          imageUrl='image/coverage.png'
          detailLink='/vehicles'
          btnColor='#dc3545'
        />
      </div>
    </div>
  );
};

export default ServiceList;