import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ApiClient from '../../components/ApiClient';

import './Description.css';

type Product = {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
};

const DescriptionPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState('');
  const apiClient = new ApiClient();

  useEffect(() => {
    apiClient
      .fetch(`/products/${productId}`)
      .then((response) => response.json())
      .then((product) => setProduct(product))
      .catch((error) => setError(error.message));
  }, [apiClient, productId]);

  if (error) {
    return <span className="error__text">Error: {error}</span>;
  }

  if (!product) {
    return null; // или отобразите здесь лоадер
  }

  return (
    <article className="product__desctiption">
      <div className="card">
        <img className="product__image" src={product.image} alt="" />
        <h3 className="product__title">{product.title}</h3>
        <p className="product__description">{product.description}</p>
      </div>
    </article>
  );
};

export default DescriptionPage;
