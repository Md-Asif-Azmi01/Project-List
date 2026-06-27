import React from 'react';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  const { id, title, price, category, image, rating } = product;

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
      <div className="card h-100 product-card">
        <img
          src={image}
          className="card-img-top"
          alt={title}
          style={{ height: '200px', objectFit: 'contain', padding: '10px' }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title" style={{ fontSize: '1rem', fontWeight: '600' }}>
            {title.length > 40 ? title.slice(0, 40) + '…' : title}
          </h5>
          <p className="card-text mb-1"><strong>${price}</strong></p>
          <p className="card-text small text-muted mb-1">{category}</p>
          {rating && (
            <div className="d-flex align-items-center mt-auto">
              <span className="badge bg-warning text-dark me-2">
                ⭐ {rating.rate}
              </span>
              <span className="small text-muted">({rating.count})</span>
            </div>
          )}
          <Link href={`/product/${id}`} className="btn btn-outline-primary btn-sm mt-2">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;