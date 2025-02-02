import React, { useState, useEffect } from 'react';
import s from './Admin.module.css';

function AdminPage() {
    const [orders, setOrders] = useState([]);
    const [messages, setMessages] = useState([]);
    const [adminReply, setAdminReply] = useState('');  // Para armazenar a mensagem do Admin antes do envio
    const userName = localStorage.getItem('userName') || 'Guest';  // Pegando o nome do usuário (ou "Guest" se não tiver nome)

    useEffect(() => {
        // Carregar mensagens e pedidos do localStorage
        const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
        const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
        setOrders(storedOrders);
        setMessages(storedMessages);
    }, []);

    const handleReply = (id, replyText) => {
        const updatedMessages = messages.map(msg =>
            msg.id === id
                ? { ...msg, replies: [...(msg.replies || []), { sender: 'Admin', text: replyText }] }
                : msg
        );
        setMessages(updatedMessages);
        localStorage.setItem('messages', JSON.stringify(updatedMessages));
    };

    const resetChat = (customer) => {
        const updatedMessages = messages.filter(msg => msg.user !== customer);
        setMessages(updatedMessages);
        localStorage.setItem('messages', JSON.stringify(updatedMessages));
    };

    const getChatForCustomer = (customer) => {
        return messages.filter(msg => msg.user === customer);
    };

    const handleAdminSendMessage = (customer) => {
        if (adminReply.trim()) {
            const newAdminMessage = {
                id: Date.now(), // Gerando um ID único para cada mensagem
                user: customer,
                sender: 'Admin',
                text: adminReply,
                replies: []
            };

            // Adicionando a nova mensagem de Admin
            const updatedMessages = [...messages, newAdminMessage];

            // Atualizando o estado e localStorage
            setMessages(updatedMessages);
            localStorage.setItem('messages', JSON.stringify(updatedMessages));
            setAdminReply('');  // Limpar o campo de mensagem após o envio
        }
    };

    // Função para formatar o endereço (número, nome da rua e cidade)
    const formatAddress = (address) => {
        const regex = /^(\d+ \S+.*?)\s*,\s*(\S.+)/; // Formato número, nome da rua e cidade (ignora estado e país)
        const match = address.match(regex);
        if (match) {
            return `${match[1]}, ${match[2]}`; // Retorna número da rua e cidade
        }
        return 'No address provided'; // Caso a formatação falhe, retorna o endereço como está
    };

    // Função para marcar o pedido como "Entregue" (remover da lista de pedidos)
    const handleDelivered = (orderId) => {
        const updatedOrders = orders.filter(order => order.id !== orderId);  // Remove o pedido da lista
        setOrders(updatedOrders);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));  // Atualiza o localStorage
    };

    return (
        <div className={s.adminPage}>
            <h1>Admin Dashboard</h1>

            <section className={s.ordersSection}>
                <h2>Orders</h2>
                <div className={s.orderGrid}>
                    {orders.length > 0 ? (
                        orders.map(order => (
                            <div key={order.id} className={s.orderCard}>
                                {/* Exibindo o nome do cliente corretamente */}
                                <h3>{order.customer || 'Guest'}</h3>
                                <p><strong>Address:</strong> {formatAddress(order.address || localStorage.getItem('userAddress'))}</p>
                                <p><strong>Items:</strong></p>
                                <ul className={s.itemsList}>
                                    {order.items.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                                <p><strong>Total:</strong> {order.total}</p>
                                {order.schedule && <p><strong>Schedule:</strong> {order.schedule}</p>}
                                <button
                                    className={s.deliveredButton}
                                    onClick={() => handleDelivered(order.id)}
                                >
                                    Mark as Delivered
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No orders yet.</p>
                    )}
                </div>
            </section>

            <section className={s.messagesSection}>
                <h2>Messages</h2>
                <div className={s.messageGrid}>
                    {messages.length > 0 ? (
                        Array.from(new Set(messages.map(msg => msg.user))).map((customer, index) => (
                            <div key={index} className={s.messageCard}>
                                <h3>{customer}</h3>
                                <div className={s.chatHistory}>
                                    {getChatForCustomer(customer).map((msg, idx) => (
                                        <p key={idx}><strong>{msg.sender === 'Admin' ? 'Admin' : userName}:</strong> {msg.text}</p>
                                    ))}
                                </div>
                                <div className={s.replySection}>
                                    <input
                                        type="text"
                                        placeholder="Type your reply..."
                                        value={adminReply}
                                        onChange={(e) => setAdminReply(e.target.value)}
                                    />
                                    <button className={s.sendButton} onClick={() => handleAdminSendMessage(customer)}>Send</button>
                                </div>
                                <button className={s.resetButton} onClick={() => resetChat(customer)}>Reset Chat</button>
                            </div>
                        ))
                    ) : (
                        <p>No messages yet.</p>
                    )}
                </div>
            </section>
        </div>
    );
}

export default AdminPage;
