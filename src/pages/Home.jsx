import React, {useEffect} from 'react';
import Header from '../components/Header';
import ProductList from '../components/ProductList';
import StoreList from '../components/StoreList';
import s from './Home.module.css';
import Chat from '../components/Chat';
import {useNavigate} from "react-router-dom";

function HomePage({internTokenValid}) {
    const navigate = useNavigate();
    useEffect(() => {
        var response = internTokenValid()
        if (response == false) {
            navigate('/login')
        }
    }, []);
    return (
        <div className={s.homePage}>
            <Header />
            <main>
                <ProductList />
                <h2 className={s.pageTitle}>Farmers</h2>
                <StoreList />

                <section className={s.helpSection}>
                    <div className={s.helpLeft}>
                        <h2>Do you need help?</h2>
                        <p>Talk with one of our admins.</p>
                    </div>
                    <div className={s.helpRight}>
                        <Chat />
                    </div>
                </section>
            </main>
        </div>
    );
}

export default HomePage;
