// src/components/StoreList.js
import React from 'react';
import StoreBox from './StoreBox';
import s from './StoreList.module.css'; // CSS module for the list layout

const stores = [
    {
        id: 1,
        name: "Farmer A",
        location: "Chapel Hill, NC",
        rating: "4.5",
        imgSrc: "/img/StorePic.png"
    },
];

function StoreList() {
    return (
        <div className={s.storeContainer}>
            {stores.map(store => (
                <StoreBox key={store.id} store={store} />
            ))}
        </div>
    );
}

export default StoreList;
