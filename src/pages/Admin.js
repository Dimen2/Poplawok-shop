import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const Admin = () => {
    const [orders, setOrders] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('adminToken') === 'true');
    const [loginData, setLoginData] = useState({ name: '', password: '' });

    const REQUIRED_NAME = "Дима";
    const REQUIRED_PASS = "123456789";

    useEffect(() => {
        if (isLoggedIn) {
            const fetchOrders = async () => {
                const q = query(
                    collection(db, "orders"),
                    orderBy("createdAt", "desc")
                );
                const querySnapshot = await getDocs(q);
                const ordersData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setOrders(ordersData);
            };
            fetchOrders();
        }
    }, [isLoggedIn]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (loginData.name === REQUIRED_NAME && loginData.password === REQUIRED_PASS) {
            setIsLoggedIn(true);
            localStorage.setItem('adminToken', 'true');
        } else {
            alert("Неверное имя или пароль!");
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('adminToken');
    };

    if (!isLoggedIn) {
        return (
            <div style={{ padding: 40, textAlign: 'center', fontFamily: 'Arial' }}>
                <h1>Вход в админку</h1>
                <form onSubmit={handleLogin} style={{ display: 'inline-block', textAlign: 'left', background: '#f4f4f4', padding: 20, borderRadius: 10 }}>
                    <div style={{ marginBottom: 10 }}>
                        <label>Имя:</label><br/>
                        <input type="text" value={loginData.name} onChange={(e) => setLoginData({...loginData, name: e.target.value})} style={{ width: '200px', padding: 8 }} />
                    </div>
                    <div style={{ marginBottom: 10 }}>
                        <label>Пароль:</label><br/>
                        <input type="password" value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} style={{ width: '200px', padding: 8 }} />
                    </div>
                    <button type="submit" style={{ padding: '10px 20px', background: '#28a745', color: '#fff', border: 'none', borderRadius: 5, cursor: 'pointer' }}>Войти</button>
                </form>
            </div>
        );
    }

    return (
        <div style={{ padding: 40, fontFamily: 'Arial' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
                <h1>Адмінка — Замовлення</h1>
                <button onClick={handleLogout} style={{ padding: '5px 15px', cursor: 'pointer' }}>Вийти</button>
            </div>

            {orders.length === 0 && <p>Замовлень поки немає</p>}

            {orders.map(order => (
                <div key={order.id} style={{ border: "1px solid #ccc", padding: 20, marginBottom: 20, borderRadius: 8, backgroundColor: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <h3>Клієнт: {order.customer?.name}</h3>
                            <p>📞 {order.customer?.phone}</p>
                            <p>📍 {order.customer?.city}, {order.customer?.address}</p>
                        </div>
                        <div style={{ textAlign: 'right', color: '#666' }}>
                            <p>ID замовлення: {order.id}</p>
                            <p><strong>Сума: {order.total} грн</strong></p>
                        </div>
                    </div>

                    <hr />
                    <h4>📦 Товари у замовленні:</h4>
                    <div style={{ background: '#f9f9f9', padding: '10px', borderRadius: 5 }}>
                        {order.items && order.items.map((item, index) => (
                            <div key={index} style={{ marginBottom: 5, borderBottom: '1px dashed #ddd', paddingBottom: 5 }}>
                                {/* Выводим ID товара и его название */}
                                <span style={{ background: '#007bff', color: '#fff', padding: '2px 6px', borderRadius: 4, marginRight: 10 }}>
                                    № {item.id}
                                </span>
                                <strong>{item.name}</strong> — {item.quantity || 1} шт.
                            </div>
                        ))}
                    </div>

                    <p style={{ marginTop: 15 }}><strong>Статус:</strong> <span style={{ color: 'orange' }}>{order.status}</span></p>
                </div>
            ))}
        </div>
    );
};

export default Admin;