// src/components/StoreBox.js
import React from 'react';
import styles from './StoreBox.module.css'; // Correctly import the CSS module

const StoreBox = ({ store }) => {
    return (
        <div className={styles.storeBox}> {/* Store box structure */}
            <img src={store.imgSrc} alt={store.name} className={styles.storeImage} />
            <div className={styles.storeInfo}>
                <h2 className={styles.storeName}>{store.name}</h2>
                <p className={styles.storeLocation}>{store.location}</p>
                <p className={styles.storeRating}>Rating: {store.rating}</p>
            </div>
        </div>
    );
};

export default StoreBox;
