import React from 'react';
import styles from './Filter.module.css';

const Filter = ({ activeFilter, onFilterChange }) => {
    const filterOptions = [
        { type: "Hummus", label: "Hummus", imgSrc: "/img/hummus.png" },
        { type: "Feta Cheese", label: "Cheese", imgSrc: "/img/cheese.png" },
        { type: "Pita Chips", label: "Pita Chips", imgSrc: "/img/chip.png" },
        { type: "Other", label: "Other", imgSrc: "/img/other.png" },
    ];

    return (
        <div className={styles.filterContainer}>
            {filterOptions.map((option) => (
                <button
                    key={option.type}
                    className={`${styles.filterButton} ${
                        activeFilter === option.type ? styles.active : ""
                    }`}
                    onClick={() =>
                        onFilterChange(activeFilter === option.type ? null : option.type)
                    }
                >
                    <img src={option.imgSrc} alt={option.label} className={styles.filterImage} />
                    <span className={styles.filterLabel}>{option.label}</span>
                </button>
            ))}
        </div>
    );
};

export default Filter;
