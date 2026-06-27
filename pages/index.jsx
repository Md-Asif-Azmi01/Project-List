// pages/index.jsx
import React, { useState, useEffect, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

// Helper to fetch with timeout
async function fetchWithTimeout(url, options = {}, timeout = 8000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

export async function getServerSideProps() {
  try {
    const res = await fetchWithTimeout('https://fakestoreapi.com/products', {}, 8000);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const products = await res.json();
    return { props: { products } };
  } catch (error) {
    // Log the full error to Vercel logs
    console.error('❌ API Fetch Error:', error.message);
    console.error('❌ Error name:', error.name);

    // Fallback products so the page still works
    const fallbackProducts = [
      {
        id: 1,
        title: "Fjallraven - Foldsack No. 1 Backpack",
        price: 109.95,
        description: "Your perfect pack for everyday use...",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        rating: { rate: 3.9, count: 120 },
      },
      {
        id: 2,
        title: "Mens Casual Premium Slim Fit T-Shirts",
        price: 22.3,
        description: "Slim-fitting style...",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/71-3HjG6UL._AC_SY879._SX._UX._SY._UY_.jpg",
        rating: { rate: 4.1, count: 259 },
      },
      // Add a third fallback product
      {
        id: 3,
        title: "Mens Cotton Jacket",
        price: 55.99,
        description: "Great outerwear jackets...",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
        rating: { rate: 4.7, count: 500 },
      },
    ];
    return { props: { products: fallbackProducts } };
  }
}

export default function Home({ products }) {
  // ... keep the rest of your component exactly as before
  // (the useState, useEffect, useMemo, pagination, etc.)
}