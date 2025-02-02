import { createContext, useContext, useState, useEffect } from 'react';

const BagContext = createContext();

export const useBag = () => {
    return useContext(BagContext);
};

export const BagProvider = ({ children }) => {
    // Carrega os itens da bag do localStorage, se disponíveis
    const [bagItems, setBagItems] = useState(() => {
        const savedBagItems = localStorage.getItem('bagItems');
        return savedBagItems ? JSON.parse(savedBagItems) : [];
    });

    // Salva os itens da bag no localStorage sempre que a bag mudar
    useEffect(() => {
        if (bagItems.length > 0) {
            localStorage.setItem('bagItems', JSON.stringify(bagItems));
        }
    }, [bagItems]);

    const addItemToBag = (item) => {
        setBagItems((prevItems) => {
            const newItems = [...prevItems, item];
            localStorage.setItem('bagItems', JSON.stringify(newItems));
            return newItems;
        });
    };

    const removeItemFromBag = (id) => {
        setBagItems((prevItems) => {
            const newItems = prevItems.filter(item => item.id !== id);
            localStorage.setItem('bagItems', JSON.stringify(newItems));
            return newItems;
        });
    };

    return (
        <BagContext.Provider value={{ bagItems, addItemToBag, removeItemFromBag }}>
            {children}
        </BagContext.Provider>
    );
};
