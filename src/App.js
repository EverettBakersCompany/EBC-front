import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signin from "./pages/Signin";
import LandingPage from "./pages/Landing";
import HomePage from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import ProfilePage from "./pages/ProfilePage"; // Import ProfilePage
import CheckoutPage from "./pages/CheckoutPage";
import { BagProvider } from './context/BagContext';
import AdminPage from "./components/AdminPage";

function App() {
    function compareDates (date) {
        let today = new Date()      // pega a data atual
        let hoje = Date.parse(today)
        let vencimento = Date.parse(date)

        if(hoje >= vencimento) {
            return true
        }
        else {
            return false
        }

    }

    function checandoValidade (date) {
        let today = new Date()
        let data2 = new Date(date)
        let timezone = today.getTimezoneOffset()
        data2.setMinutes(data2.getMinutes() + timezone)

        if (today >= data2) {
            return true
        }
        return false
    }

    function tokenValid(setConfirma) {
        if (localStorage.getItem('token') !== null) {
            var token = localStorage.getItem('token')
            token = JSON.parse(token)
            var vencimento = token.down

            if (compareDates(vencimento) == false){
                return true
                //navigate("/home")
            }
            //excluir token
            localStorage.removeItem('token')
            return false
        }
        else if (localStorage.getItem('eValidation') !== null && checandoValidade(JSON.parse(localStorage.getItem('eValidation')).down) === false) {
            setConfirma('flex')
            return false
        }
    }

    function internTokenValid() {
        if (localStorage.getItem('token') == null) {
            return false
        }
        else {
            var token = localStorage.getItem('token')
            token = JSON.parse(token)
            var vencimento = token.down
            //console.log(((vencimento.getDate() )) + "/" + ((vencimento.getMonth() + 1)) + "/" + vencimento.getFullYear() )

            if (compareDates(vencimento)){
                localStorage.removeItem('token')
                return false
            }
            else {
                const data = {
                    'token': JSON.parse(localStorage.getItem('token')).key
                }
                fetch('http://127.0.0.1:5000/' + 'verificaToken', {
                    method: 'POST',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json' // Especifique o tipo de conteúdo como JSON
                    },
                    body: JSON.stringify(data) // Converta o objeto em uma string JSON
                })
                    .then((resp) => resp.json())
                    .then(function(data) {
                        let acert = data // saberemos se deu certo
                        if (acert.status !== true) {
                            localStorage.removeItem('token')
                            return false
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        }
    }

    return (
        <BagProvider>
            <div className="app">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate to="/landing" replace />} />
                        <Route path="/landing" element={<LandingPage />} />
                        <Route path="/login" element={<Login tokenValid={tokenValid}/>} />
                        <Route path="/sign" element={<Signin tokenValid={tokenValid} />} />
                        <Route path="/home" element={<HomePage internTokenValid={internTokenValid}/>} />
                        <Route path="/product/:id" element={<ProductDetails />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/AdminPage" element={<AdminPage />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </BagProvider>
    );
}


export default App;
