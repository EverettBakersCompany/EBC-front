import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import s from './ProfilePage.module.css';

function ProfilePage() {
    const [name, setName] = useState(localStorage.getItem('userName') || '');
    const [address, setAddress] = useState(localStorage.getItem('userAddress') || '');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isAddressValid, setIsAddressValid] = useState(true);
    const [suggestions, setSuggestions] = useState([]);  // For storing address suggestions
    const [isAddressEditing, setIsAddressEditing] = useState(false);  // To know if the address field is being edited

    const handleNameChange = (e) => {
        setName(e.target.value);
        setIsConfirmed(false);
    };

    const handleConfirmName = () => {
        if (name.trim() === '') {
            alert('Please enter a valid name.');
            return;
        }
        localStorage.setItem('userName', name);
        setIsConfirmed(true);
        alert('Name successfully updated!');
    };

    const handleConfirmAddress = () => {
        if (!address) {
            setIsAddressValid(false);
            return;
        }
        localStorage.setItem('userAddress', address);  // Correctly saves the address in localStorage
        alert('Address successfully updated!');
    };

    // Function to format the address
    const formatAddress = (address) => {
        const regex = /^(\d+ \S+.*?)\s*,\s*(\S.+)/; // Format number, street name, and city (ignores state and country)
        const match = address.match(regex);
        if (match) {
            return `${match[1]}, ${match[2]}`; // Returns street number and city
        }
        return address; // If formatting fails, returns the address as is
    };

    const fetchAddressSuggestions = async (input) => {
        const apiKey = '295b89d0a8f943c1aad9f0d1b04d726e';  // Replace with your OpenCage API key
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${input}&key=${apiKey}&limit=5`;

        const response = await fetch(url);
        const data = await response.json();
        if (data.results) {
            setSuggestions(data.results);  // Updates suggestions with API results
        }
    };

    useEffect(() => {
        if (address) {
            fetchAddressSuggestions(address);  // Fetch suggestions when the address is changed
        }
    }, [address]);

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
        setIsAddressEditing(true);  // Activates editing mode
        if (e.target.value) {
            fetchAddressSuggestions(e.target.value);  // Fetch suggestions as the user types
        } else {
            setSuggestions([]);  // Clears suggestions when the field is empty
        }
    };

    const handleSelectAddress = (selectedAddress) => {
        const formattedAddress = formatAddress(selectedAddress);  // Formats the address
        setAddress(formattedAddress);  // Updates the address field
        setSuggestions([]);  // Clears suggestions after selection
        localStorage.setItem('userAddress', formattedAddress);  // Saves to localStorage
    };

    return (
        <div className={s.profilePage}>
            <Header />
            <main>
                <div className={s.profileContent}>
                    <h1>Profile</h1>
                    <p>Welcome to your profile page!</p>
                    <div className={s.profileForm}>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={handleNameChange}
                            placeholder="Enter your name"
                        />
                        <button onClick={handleConfirmName} className={s.confirmButton}>Confirm</button>
                    </div>

                    <div className={s.profileForm}>
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={handleAddressChange}
                            placeholder="Enter your address"
                        />
                        <div className={s.suggestionsList}>
                            {isAddressEditing && suggestions.length > 0 && suggestions.map((suggestion, index) => (
                                <div
                                    key={index}
                                    className={s.suggestionItem}
                                    onClick={() => handleSelectAddress(suggestion.formatted)}
                                >
                                    <p>{suggestion.formatted}</p>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleConfirmAddress} className={s.confirmButton}>Confirm Address</button>
                        {!isAddressValid && <p className={s.errorMessage}>Please enter a valid address.</p>}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ProfilePage;
