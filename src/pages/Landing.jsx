import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Landing.module.css';

function LandingPage() {
    return (
        <div className={styles['landing-page']}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.logo}>
                    <img src="/img/Logo.png" alt="Company Logo"
                         className={styles.LogoImage}/>
                </div>
                <div className={styles['nav-links']}>
                    <Link to="/sign">Register</Link>
                    <Link to="/login">Login</Link>
                </div>
            </header>

            <div className={styles['balls-container']}>
                <div className={styles.ball}></div>
                <div className={styles.ball}></div>
            </div>
            <div className="plate-container">
                <img src="/img/Plate.png" alt="Plate" className={styles.plate}/>
            </div>

            <main className={styles.content}>
                <div className={styles['text-container']}>
                    <span className={styles['first-line']}>The power of the local</span>
                    <span className={styles['second-line']}>Agriculture</span>
                </div>

                <div className={styles['why-choose-us']}>
                    <h2>WHY CHOOSE US?</h2>
                    <div className={styles['choose-us-boxes']}>
                        <div className={styles['choose-us-box']}>
                            <img src="/img/WhyUs.png" alt="Box 1" className={styles['choose-us-image']}/>
                            <p className={styles['choose-us-text']}>Reason 1</p>
                        </div>
                        <div className={styles['choose-us-box']}>
                            <img src="/img/WhyUs.png" alt="Box 2" className={styles['choose-us-image']}/>
                            <p className={styles['choose-us-text']}>Reason 2</p>
                        </div>
                        <div className={styles['choose-us-box']}>
                            <img src="/img/WhyUs.png" alt="Box 3" className={styles['choose-us-image']}/>
                            <p className={styles['choose-us-text']}>Reason 3</p>
                        </div>
                    </div>
                </div>

                <div className={styles['our-services']}>
                    <div className={styles['image-container']}>
                        <img src="/img/Michael.jpeg" alt="Service" className={styles['service-image']}/>
                    </div>
                    <div className={styles['service-details']}>
                        <h2>Our Services</h2>
                        <p className={styles['service-description']}>Connecting small farmers to you</p>
                        <div className={styles['service-images']}>
                            <div className={styles['service-image-box']}>
                                <img src="/img/Truck.png" alt="Service 1" className={styles['service-small-image']}/>
                                <p className={styles['service-small-text']}>Service 1 Description</p>
                            </div>
                            <div className={styles['service-image-box']}>
                                <img src="/img/Truck.png" alt="Service 2" className={styles['service-small-image']}/>
                                <p className={styles['service-small-text']}>Service 2 Description</p>
                            </div>
                            <div className={styles['service-image-box']}>
                                <img src="/img/Truck.png" alt="Service 3" className={styles['service-small-image']}/>
                                <p className={styles['service-small-text']}>Service 3 Description</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles['about-us-container']}>
                    <div className={styles['about-us-text']}>
                        <h2>About Us</h2>
                        <p>We are dedicated to connecting local farmers with customers, providing fresh produce and
                            quality service. Our mission is to promote sustainability and support the local economy.</p>
                    </div>
                    <div className={styles['about-us-image']}>
                        <img src="/img/AboutUs.png" alt="About Us" className={styles['about-us-img']}/>
                    </div>
                </div>
            </main>

            <section className={styles.gallery}>
                <h2 className={styles['gallery-title']}>Gallery</h2>
                <div className={styles['gallery-images']}>
                    <div className={styles['gallery-item']}>
                        <img src="/img/Picture1.png" alt="Image 1" className={styles['gallery-image']}/>
                        <p className={styles['gallery-description']}>Michael Happy</p>
                    </div>
                    <div className={styles['gallery-item']}>
                        <img src="/img/Picture2.png" alt="Image 2" className={styles['gallery-image']}/>
                        <p className={styles['gallery-description']}>Michael Neutral</p>
                    </div>
                    <div className={styles['gallery-item']}>
                        <img src="/img/Picture3.png" alt="Image 3" className={styles['gallery-image']}/>
                        <p className={styles['gallery-description']}>Michael Sad</p>
                    </div>
                </div>
            </section>

            <footer className={styles.footer}>
                <div className={styles['footer-logo']}>
                    <img src="/img/Logo.png" alt="Company Logo"
                         className={styles.FooterImage}/>
                </div>
                <div className={styles['contact-info']}>
                    <p>Phone: (123) 456-7890</p>
                    <p>Email: info@company.com</p>
                </div>
                <div className={styles['social-media']}>
                    <a href="https://www.instagram.com/o.richard05/" target="_blank" rel="noopener noreferrer">
                        <img src="/img/Instagram.png" alt="Instagram" className={styles.socialIcon}/>
                    </a>
                    <a href="https://x.com/OtoniRichard" target="_blank" rel="noopener noreferrer">
                        <img src="/img/Twitter.png" alt="Twitter" className={styles.socialIcon}/>
                    </a>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;
