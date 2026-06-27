import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

export async function getServerSideProps({ params }) {
  const { id } = params;
  try {
    const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
    const product = res.data;
    return { props: { product } };
  } catch (error) {
    console.error('Error fetching product:', error);
    return { props: { product: null } };
  }
}

export default function ProductDetail({ product }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div className="container my-5 text-center">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="container my-5 text-center">
        <h2>Product not found</h2>
        <Link href="/" className="btn btn-primary mt-3">Back to Home</Link>
      </div>
    );
  }

  const { title, price, description, category, image, rating } = product;

  return (
    <div className="container my-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link href="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">
            {title.length > 30 ? title.slice(0, 30) + '…' : title}
          </li>
        </ol>
      </nav>
      <div className="row">
        <div className="col-md-6 text-center">
          <img src={image} alt={title} className="img-fluid" style={{ maxHeight: '400px', objectFit: 'contain' }} />
        </div>
        <div className="col-md-6">
          <h1 className="mb-3">{title}</h1>
          <p className="text-muted mb-2">{category}</p>
          <h2 className="display-6 fw-bold text-success mb-3">${price}</h2>
          {rating && (
            <div className="mb-3">
              <span className="badge bg-warning text-dark me-2">⭐ {rating.rate}</span>
              <span className="text-muted">({rating.count} reviews)</span>
            </div>
          )}
          <p className="lead">{description}</p>
          <Link href="/" className="btn btn-secondary mt-2">← Back to Products</Link>
        </div>
      </div>
    </div>
  );
}