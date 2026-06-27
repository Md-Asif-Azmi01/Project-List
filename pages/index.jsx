import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

export async function getServerSideProps() {
  try {
    const res = await axios.get('https://fakestoreapi.com/products');
    const products = res.data;
    return { props: { products } };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { props: { products: [] } };
  }
}

export default function Home({ products }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 400);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">🛍️ Product Listing</h1>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="row">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <p className="lead">No products found.</p>
              </div>
            )}
          </div>
          {totalPages > 1 && (
            <nav aria-label="Product pagination" className="mt-4">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(page)}>
                      {page}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
}