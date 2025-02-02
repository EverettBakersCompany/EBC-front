import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import styles from './ProductBox.module.css';

const ProductBox = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link to={`/product/${product.id}`} className={styles.productLink}>
            <div
                className={`${styles.productBox} ${isHovered ? styles.hovered : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img
                    src={product.imgSrc}
                    alt={product.name}
                    className={`${styles.productImage} ${isHovered ? styles.imageHover : ''}`}
                />
                <div className={styles.productInfo}>
                    <div className={styles.productDetails}>
                        <h2 className={styles.productName}>{product.name}</h2>
                        <img src="/img/star.png" alt="rating" className={styles.productRatingImage} />
                    </div>
                    <div className={styles.productPriceContainer}>
                        <p className={styles.productPrice}>{product.price}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductBox;
