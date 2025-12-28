import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useAuth } from '../utils/AuthContext';
import api from '../services/api';
import '../styles/ProductDetail.css';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await api.getProduct(Number(id));
      setProduct(data);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setAdding(true);
    try {
      await api.addToCart(Number(id), quantity);
      alert('Product added to cart!');
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to add to cart');
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (!product) {
    return <div className="container">Product not found</div>;
  }

  return (
    <div className="product-detail">
      <div className="container">
        <div className="product-detail-content">
          <div className="product-image-large">
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} />
            ) : (
              <div className="placeholder-image-large">No Image</div>
            )}
          </div>

          <div className="product-details">
            <h1>{product.name}</h1>
            {product.category && (
              <p className="category">
                Category: {product.category}
                {product.sub_category && ` / ${product.sub_category}`}
              </p>
            )}
            <p className="price">${product.price}</p>
            
            <div className="stock-info">
              {product.stock_quantity > 0 ? (
                <span className="in-stock">In Stock ({product.stock_quantity} available)</span>
              ) : (
                <span className="out-of-stock">Out of Stock</span>
              )}
            </div>

            <p className="description">{product.description}</p>

            {product.stock_quantity > 0 && (
              <div className="add-to-cart-section">
                <div className="quantity-selector">
                  <label>Quantity:</label>
                  <input
                    type="number"
                    min="1"
                    max={product.stock_quantity}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                </div>
                <button
                  className="btn-primary btn-large"
                  onClick={handleAddToCart}
                  disabled={adding}
                >
                  {adding ? 'Adding...' : 'Add to Cart'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
