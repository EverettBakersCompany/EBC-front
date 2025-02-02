import React, { useRef, useState } from 'react';
import ProductBox from './ProductBox';
import Filter from './Filter';
import s from './ProductList.module.css';
import products from '../data/products';

function ProductList() {
    const [isGridView, setIsGridView] = useState(false);
    const [selectedType, setSelectedType] = useState("All"); // Filter state
    const containerRef = useRef(null);

    const handleScroll = (direction) => {
        const container = containerRef.current;
        if (!container) return;

        const scrollAmount = container.offsetWidth;

        container.scrollBy({
            left: direction === "next" ? scrollAmount : -scrollAmount,
            behavior: "smooth"
        });
    };

    const toggleGridView = () => {
        setIsGridView(!isGridView);
    };

    const handleFilterChange = (type) => {
        setSelectedType((prevType) => (prevType === type ? "All" : type));
    };

    const filteredProducts = selectedType === "All"
        ? products
        : products.filter((product) => product.type === selectedType);

    return (
        <div className={s.productList}>
            {/* Filter Component */}
            <Filter selectedType={selectedType} onFilterChange={handleFilterChange} />

            {/* Section Header */}
            <div className={s.header}>
                <h2 className={s.title}>Products</h2>
                <div className={s.buttonGroup}>
                    <button className={s.navButton} onClick={toggleGridView}>
                        {isGridView ? "Show Side View" : "See All"}
                    </button>
                    <button className={s.navButton} onClick={() => handleScroll("prev")}>←</button>
                    <button className={s.navButton} onClick={() => handleScroll("next")}>→</button>
                </div>
            </div>

            {/* Layout Change */}
            <div
                ref={containerRef}
                className={`${s.scrollLayout} ${isGridView ? s.gridLayout : ''}`}
            >
                {filteredProducts.map((product) => (
                    <ProductBox key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default ProductList;
