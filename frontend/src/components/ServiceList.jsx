import React from 'react';

// Example data structure for services, you can replace it with actual data
const serviceData = [
  {
    title: 'Products',
    description: 'From a range of child safety seats, to additional drivers or GPS devices, discover products that will enhance your Redspot car rental experience.',
    imageUrl: '/images/products.jpg', // Replace with your actual image paths
    detailLink: '/products'
  },
  {
    title: 'Services',
    description: 'From long term or subscription rentals, road side assistance, toll waivers and Redspot pre-check in capabilities.',
    imageUrl: '/images/services.jpg',
    detailLink: '/services'
  },
  // ... Add more service items as needed
];

const ServiceItem = ({ title, description, imageUrl, detailLink }) => (
  <div className="card" style={{ width: '18rem', marginBottom: '20px' }}>
    <img src={imageUrl} className="card-img-top" alt={title} />
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <p className="card-text">{description}</p>
      <a href={detailLink} className="btn btn-primary">More Details</a>
    </div>
  </div>
);

const ServiceList = () => {
  return (
    <div className="container">
      <h2 className="my-4">Products and Services</h2>
      <div className="row">
        {serviceData.map((service, index) => (
          <div className="col-md-4" key={index}>
            <ServiceItem {...service} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
