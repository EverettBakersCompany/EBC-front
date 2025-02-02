import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBag } from '../context/BagContext';
import s from './Header.module.css';

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBagOpen, setIsBagOpen] = useState(false);
    const [address, setAddress] = useState(localStorage.getItem('userAddress') || '');
    const { bagItems, removeItemFromBag } = useBag();

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const toggleBagPopup = () => {
        setIsBagOpen(!isBagOpen);
    };

    const totalBagValue = bagItems.reduce((acc, item) => acc + (typeof item.price === 'number' ? item.price : 0), 0);

    // Função para formatar o endereço (número, nome da rua e cidade)
    const formatAddress = (address) => {
        const regex = /^(\d+ \S+.*?)\s*,\s*(\S.+)/;
        const match = address.match(regex);
        if (match) {
            return `${match[1]}, ${match[2]}`; // Retorna número da rua e cidade
        }
        return address; // Caso a formatação falhe, retorna o endereço como está
    };

    // Atualiza o endereço sempre que o localStorage mudar
    useEffect(() => {
        const savedAddress = localStorage.getItem('userAddress');
        setAddress(savedAddress || 'No address provided');
    }, [localStorage.getItem('userAddress')]);

    const formattedAddress = formatAddress(address);

    return (
        <header className={s.header}>
            <div className={s.logo}>
                <Link to="/Home" className={s.logoLink}>
                    <img src="/img/Logo.png" alt="Company Logo" className={s.logoImage} />
                </Link>
            </div>

            <div className={s.address}>
                <p>{formattedAddress}</p>
                <button className={s.addressEditButton} onClick={toggleModal}>
                    <img src="/img/Arrow.png" alt="Edit Address" />
                </button>
            </div>

            <div className={s.profileAndBag}>
                <Link to="/profile">
                    <img src="/img/ProfPic.png" alt="Profile" className={s.profileImage} />
                </Link>

                <button className={s.bagIcon} onClick={toggleBagPopup}>
                    <img src="/img/Bag.png" alt="Shopping Bag" className={s.bagImage} />
                </button>

                <div className={s.totalValue}>
                    <span>${totalBagValue.toFixed(2)}</span>
                </div>
            </div>

            {isBagOpen && (
                <div className={s.bagPopup}>
                    <div className={s.popupContent}>
                        <h3>Your Shopping Bag</h3>
                        {bagItems.length === 0 ? (
                            <p>Your bag is empty.</p>
                        ) : (
                            <ul>
                                {bagItems.map((item) => (
                                    <li key={item.id}>
                                        {item.name} - ${item.price.toFixed(2)}
                                        <button
                                            className={s.removeButton}
                                            onClick={() => removeItemFromBag(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <button className={s.checkoutButton} onClick={() => (window.location.href = '/checkout')}>
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
