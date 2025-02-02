import React, { useState } from 'react';
import Header from '../components/Header';
import { useBag } from '../context/BagContext';
import s from './CheckoutPage.module.css';

function CheckoutPage() {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [orderOption, setOrderOption] = useState(''); // 'now' ou 'schedule'
    const { bagItems, removeItemFromBag } = useBag();
    const totalPrice = bagItems.reduce((acc, item) => acc + item.price, 0);

    const userName = localStorage.getItem('userName') || 'Guest';
    const userAddress = localStorage.getItem('userAddress') || 'No address provided';

    const handleOrderOptionChange = (option) => {
        setOrderOption(option);
        if (option === 'schedule') {
            setIsCalendarOpen(true);
        } else {
            setIsCalendarOpen(false);
        }
    };

    const handleFinalizarPedido = () => {
        const newOrder = {
            id: Date.now(),
            customer: userName,  // Usando o nome do usuário do localStorage
            address: userAddress, // Usando o endereço do usuário do localStorage
            items: bagItems.map(item => item.name),
            total: `$${totalPrice.toFixed(2)}`,
            schedule: orderOption === 'schedule' ? `${selectedDate} at ${selectedTime}` : null,
        };

        const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
        localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrder]));

        alert(orderOption === 'now' ? 'Pedido realizado agora!' : `Pedido agendado para ${selectedDate} às ${selectedTime}`);

        // Clear the bag after order
        bagItems.forEach(item => removeItemFromBag(item.id));
    };

    return (
        <div className={s.checkoutPage}>
            <Header />
            <main className={s.checkoutContent}>
                <h1>Checkout</h1>
                <div className={s.checkoutDetails}>
                    <h2>Your Order</h2>
                    {bagItems.length > 0 ? (
                        bagItems.map((item) => (
                            <div key={item.id} className={s.cartItem}>
                                <p>{item.name}</p>
                                <p>${item.price.toFixed(2)}</p>
                                <button
                                    className={s.removeButton}
                                    onClick={() => removeItemFromBag(item.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                    <div className={s.totalSection}>
                        <h3>Total: ${totalPrice.toFixed(2)}</h3>

                        <div className={s.orderOptions}>
                            <button
                                className={s.orderOptionButton}
                                onClick={() => handleOrderOptionChange('now')}
                            >
                                Order Now
                            </button>
                            <button
                                className={s.orderOptionButton}
                                onClick={() => handleOrderOptionChange('schedule')}
                            >
                                Schedule Order
                            </button>
                        </div>

                        {isCalendarOpen && (
                            <div className={s.scheduleSection}>
                                <label>Select Date:</label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                />
                                <label>Select Time:</label>
                                <input
                                    type="time"
                                    value={selectedTime}
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                />
                            </div>
                        )}

                        <button
                            className={s.checkoutButton}
                            onClick={handleFinalizarPedido}
                        >
                            {orderOption === 'now' ? 'Proceed to Payment' : 'Confirm Schedule'}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default CheckoutPage;
