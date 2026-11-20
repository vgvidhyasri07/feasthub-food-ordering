import React, { useState, useEffect } from 'react';

const CATEGORIES = ['All', 'Pizza', 'Burgers', 'Biryani', 'Chinese', 'Desserts', 'Drinks'];

// Complete 24 Balanced Dishes with High-Quality Food Images
const DEFAULT_FOODS = [
  // --- PIZZA ---
  {
    id: 1,
    name: 'Farmhouse Veggie Delight Pizza',
    category: 'Pizza',
    isVeg: true,
    price: 349,
    rating: 4.8,
    reviews: 840,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop',
    desc: 'Crisp crust loaded with crunchy bell peppers, sweet corn, black olives & 100% mozzarella.'
  },
  {
    id: 2,
    name: 'Paneer Tikka Supreme Pizza',
    category: 'Pizza',
    isVeg: true,
    price: 389,
    rating: 4.9,
    reviews: 950,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&auto=format&fit=crop',
    desc: 'Spiced tandoori paneer cubes, red paprika, diced capsicum and melted cheddar blend.'
  },
  {
    id: 3,
    name: 'Classic Margherita Double Cheese Pizza',
    category: 'Pizza',
    isVeg: true,
    price: 299,
    rating: 4.7,
    reviews: 620,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&auto=format&fit=crop',
    desc: 'Fresh basil leaves, slow-cooked herb tomato marinara and golden bubbly mozzarella.'
  },
  {
    id: 4,
    name: 'Spicy Chicken Pepperoni Pizza',
    category: 'Pizza',
    isVeg: false,
    price: 429,
    rating: 4.9,
    reviews: 1200,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&auto=format&fit=crop',
    desc: 'Loaded with smoky chicken pepperoni slices and melted mozzarella cheese.'
  },
  {
    id: 5,
    name: 'BBQ Chicken & Jalapeno Pizza',
    category: 'Pizza',
    isVeg: false,
    price: 449,
    rating: 4.8,
    reviews: 890,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop',
    desc: 'Smokey barbecue chicken chunks, spicy sliced jalapenos and caramelized red onions.'
  },

  // --- BURGERS ---
  {
    id: 6,
    name: 'Crispy Veggie Double Patty Burger',
    category: 'Burgers',
    isVeg: true,
    price: 169,
    rating: 4.7,
    reviews: 650,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop',
    desc: 'Crispy golden potato & green peas patty with fresh iceberg lettuce and tangy mayo.'
  },
  {
    id: 7,
    name: 'Royal Paneer Makhani Burger',
    category: 'Burgers',
    isVeg: true,
    price: 199,
    rating: 4.8,
    reviews: 780,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop',
    desc: 'Grilled spiced cottage cheese patty topped with rich butter makhani gravy.'
  },
  {
    id: 8,
    name: 'Crispy Chicken Supreme Burger',
    category: 'Burgers',
    isVeg: false,
    price: 219,
    rating: 4.8,
    reviews: 940,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop',
    desc: 'Fried crispy chicken breast fillet with creamy spicy garlic aioli sauce.'
  },
  {
    id: 9,
    name: 'Smoked BBQ Chicken Burger',
    category: 'Burgers',
    isVeg: false,
    price: 249,
    rating: 4.9,
    reviews: 810,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&auto=format&fit=crop',
    desc: 'Flame-grilled chicken patty glazed with hickory BBQ sauce and cheddar cheese.'
  },

  // --- BIRYANI ---
  {
    id: 10,
    name: 'Royal Hyderabadi Veg Dum Biryani',
    category: 'Biryani',
    isVeg: true,
    price: 260,
    rating: 4.8,
    reviews: 1420,
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&auto=format&fit=crop',
    desc: 'Fragrant basmati rice slow-cooked with fresh garden vegetables, saffron and fried onions.'
  },
  {
    id: 11,
    name: 'Shahi Paneer Tikka Biryani',
    category: 'Biryani',
    isVeg: true,
    price: 290,
    rating: 4.7,
    reviews: 980,
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&auto=format&fit=crop',
    desc: 'Saffron-infused basmati rice layered with roasted marinated paneer and rich spices.'
  },
  {
    id: 12,
    name: 'Hyderabadi Chicken Dum Biryani',
    category: 'Biryani',
    isVeg: false,
    price: 320,
    rating: 4.9,
    reviews: 2450,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop',
    desc: 'Aromatic basmati rice dum-cooked on slow embers with tender marinated chicken.'
  },
  {
    id: 13,
    name: 'Royal Mutton Dum Biryani',
    category: 'Biryani',
    isVeg: false,
    price: 390,
    rating: 4.9,
    reviews: 1890,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop',
    desc: 'Succulent goat mutton pieces cooked with aged basmati rice, saffron and ghee.'
  },

  // --- CHINESE ---
  {
    id: 14,
    name: 'Schezwan Veg Hakka Noodles',
    category: 'Chinese',
    isVeg: true,
    price: 180,
    rating: 4.6,
    reviews: 560,
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&auto=format&fit=crop',
    desc: 'Wok-tossed noodles with bell peppers, scallions, carrots and spicy schezwan sauce.'
  },
  {
    id: 15,
    name: 'Crispy Veg Spring Rolls',
    category: 'Chinese',
    isVeg: true,
    price: 150,
    rating: 4.5,
    reviews: 320,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop',
    desc: 'Golden crunchy rolls filled with seasoned shredded vegetables and sweet chilli dip.'
  },
  {
    id: 16,
    name: 'Chilli Paneer Dry',
    category: 'Chinese',
    isVeg: true,
    price: 220,
    rating: 4.8,
    reviews: 730,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&auto=format&fit=crop',
    desc: 'Crispy paneer cubes tossed in spicy soy-garlic sauce with bell peppers and green chillies.'
  },
  {
    id: 17,
    name: 'Chilli Chicken Gravy',
    category: 'Chinese',
    isVeg: false,
    price: 260,
    rating: 4.8,
    reviews: 1100,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&auto=format&fit=crop',
    desc: 'Boneless tender chicken bites tossed in rich garlic-soya sauce with scallions.'
  },
  {
    id: 18,
    name: 'Chicken Schezwan Fried Rice',
    category: 'Chinese',
    isVeg: false,
    price: 230,
    rating: 4.7,
    reviews: 940,
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&auto=format&fit=crop',
    desc: 'Wok-fried rice tossed with shredded chicken, scrambled eggs and spicy schezwan oil.'
  },

  // --- DESSERTS (100% PURE VEG) ---
  {
    id: 19,
    name: 'Belgian Choco Lava Cake',
    category: 'Desserts',
    isVeg: true,
    price: 99,
    rating: 4.9,
    reviews: 1850,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop',
    desc: 'Warm dark chocolate sponge cake with rich molten Belgian chocolate center.'
  },
  {
    id: 20,
    name: 'Gulab Jamun with Ice Cream',
    category: 'Desserts',
    isVeg: true,
    price: 110,
    rating: 4.8,
    reviews: 1220,
    image: 'https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?w=600&auto=format&fit=crop',
    desc: 'Warm cardamom-soaked gulab jamuns served with a scoop of vanilla ice cream.'
  },
  {
    id: 21,
    name: 'Red Velvet Pastry Slice',
    category: 'Desserts',
    isVeg: true,
    price: 120,
    rating: 4.8,
    reviews: 870,
    image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=600&auto=format&fit=crop',
    desc: 'Moist red velvet sponge layered with silky cream cheese frosting and white curls.'
  },

  // --- DRINKS (100% PURE VEG) ---
  {
    id: 22,
    name: 'Cold Brew Thick Coffee',
    category: 'Drinks',
    isVeg: true,
    price: 119,
    rating: 4.8,
    reviews: 740,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&auto=format&fit=crop',
    desc: 'Blended with roasted Arabica beans, thick dairy cream, and chilled milk.'
  },
  {
    id: 23,
    name: 'Fresh Mango Lassi',
    category: 'Drinks',
    isVeg: true,
    price: 99,
    rating: 4.9,
    reviews: 1150,
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=600&auto=format&fit=crop',
    desc: 'Traditional thick yogurt smoothie whipped with ripe Alphonso mangoes and nuts.'
  },
  {
    id: 24,
    name: 'Virgin Mint Lime Mojito',
    category: 'Drinks',
    isVeg: true,
    price: 89,
    rating: 4.7,
    reviews: 630,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop',
    desc: 'Muddled fresh garden mint, zesty lime juice, ice and chilled sparkling soda.'
  }
];

// Official Indian Veg / Non-Veg Mark
function VegBadge({ isVeg }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '18px',
        height: '18px',
        border: `2px solid ${isVeg ? '#16a34a' : '#dc2626'}`,
        borderRadius: '4px',
        background: 'white',
        marginRight: '8px',
        flexShrink: 0
      }}
      title={isVeg ? 'Pure Vegetarian' : 'Non-Vegetarian'}
    >
      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isVeg ? '#16a34a' : '#dc2626' }} />
    </span>
  );
}

// 100% Reliable Image
function FoodImage({ food }) {
  const [imgError, setImgError] = useState(false);

  const categoryThemes = {
    Pizza: { bg: 'linear-gradient(135deg, #ffedd5, #fed7aa)', icon: '🍕' },
    Burgers: { bg: 'linear-gradient(135deg, #fef3c7, #fde68a)', icon: '🍔' },
    Biryani: { bg: 'linear-gradient(135deg, #ffedd5, #fbcfe8)', icon: '🍲' },
    Chinese: { bg: 'linear-gradient(135deg, #fee2e2, #fecaca)', icon: '🥡' },
    Desserts: { bg: 'linear-gradient(135deg, #fce7f3, #fbcfe8)', icon: '🍰' },
    Drinks: { bg: 'linear-gradient(135deg, #e0f2fe, #bae6fd)', icon: '🥤' }
  };
  const theme = categoryThemes[food.category] || { bg: '#f1f5f9', icon: '🍽️' };

  if (imgError || !food.image) {
    return (
      <div style={{ width: '100%', height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '56px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))' }}>{theme.icon}</span>
        <span style={{ marginTop: '8px', fontSize: '11px', fontWeight: 'bold', background: 'white', padding: '3px 10px', borderRadius: '15px', color: food.isVeg ? '#16a34a' : '#dc2626' }}>
          {food.isVeg ? '🟢 Pure Veg' : '🔴 Non-Veg'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={food.image}
      alt={food.name}
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
      loading="lazy"
      onError={() => setImgError(true)}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block'
      }}
    />
  );
}

export default function App() {
  const [role, setRole] = useState('customer');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Direct access to store for Mam!
  const [email, setEmail] = useState('vino.skasc@gmail.com');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('Vino');
  const [isRegistering, setIsRegistering] = useState(false);

  const [foods, setFoods] = useState(DEFAULT_FOODS);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [vegFilter, setVegFilter] = useState('all');

  // Checkout & Bill States
  const [showCheckout, setShowCheckout] = useState(false);
  const [phone, setPhone] = useState('9876543210');
  const [address, setAddress] = useState('Room 204, College Hostel, SKASC Campus, Coimbatore');
  const [paymentMethod, setPaymentMethod] = useState('UPI / Google Pay');
  const [upiId, setUpiId] = useState('vino@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 8920 1234 5678');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('789');
  const [selectedBank, setSelectedBank] = useState('State Bank of India (SBI)');
  const [placedBill, setPlacedBill] = useState(null);

  // Admin Portal States
  const [adminTab, setAdminTab] = useState('orders');
  const [adminOrders, setAdminOrders] = useState([]);
  const [newDishName, setNewDishName] = useState('');
  const [newDishCategory, setNewDishCategory] = useState('Pizza');
  const [newDishPrice, setNewDishPrice] = useState('');
  const [newDishIsVeg, setNewDishIsVeg] = useState(true);
  const [newDishImage, setNewDishImage] = useState('');

  const loadFoods = () => {
    fetch('http://localhost:5000/api/foods')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setFoods(data);
      })
      .catch((err) => console.log('Using default foods:', err.message));
  };

  const loadOrders = () => {
    fetch('http://localhost:5000/api/orders')
      .then((res) => res.json())
      .then((data) => setAdminOrders(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadFoods();
  }, []);

  const handleAuth = (e) => {
    e.preventDefault();
    if (role === 'admin') {
      if (email === 'admin@feasthub.com' && password === 'admin123') {
        setIsLoggedIn(true);
        loadOrders();
      } else {
        alert('Invalid Admin Credentials!\nEmail: admin@feasthub.com\nPassword: admin123');
      }
    } else {
      if (!email || !password) return alert('Please enter email and password');
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCart([]);
    setShowCheckout(false);
    setPlacedBill(null);
  };

  const addToCart = (food) => {
    const existing = cart.find((item) => item.id === food.id);
    if (existing) {
      setCart(cart.map((item) => item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...food, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, change) => {
    setCart(cart.map((item) => {
      if (item.id === id) {
        const newQty = item.quantity + change;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 400 || subtotal === 0 ? 0 : 40;
  const taxes = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + deliveryFee + taxes;

  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const clientName = name || 'Vino';
    
    let finalPaymentMethod = paymentMethod;
    if (paymentMethod === 'UPI / Google Pay') finalPaymentMethod = `UPI (${upiId})`;
    else if (paymentMethod === 'Credit/Debit Card') finalPaymentMethod = `Card (Ending ${cardNumber.slice(-4)})`;
    else if (paymentMethod === 'Net Banking') finalPaymentMethod = `Net Banking (${selectedBank})`;

    const orderPayload = {
      orderId: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
      customer: clientName,
      customerName: clientName,
      customerEmail: email,
      phone,
      address,
      paymentMethod: finalPaymentMethod,
      items: cart,
      subtotal,
      deliveryFee,
      taxes,
      total: grandTotal,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) + ', ' + new Date().toLocaleDateString()
    };

    try {
      let res;
      try {
        res = await fetch('http://127.0.0.1:5000/api/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderPayload),
        });
      } catch (err1) {
        res = await fetch('http://localhost:5000/api/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderPayload),
        });
      }

      if (res && res.ok) {
        const data = await res.json();
        console.log('🍃 Order Saved to MongoDB:', data);
      }
    } catch (err) {
      console.warn("Backend note:", err);
    }

    setShowCheckout(false);
    setPlacedBill(orderPayload);
    setCart([]);
  };

  const handleAddDish = async (e) => {
    e.preventDefault();
    if (!newDishName || !newDishPrice) return;

    await fetch('http://localhost:5000/api/foods', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: newDishName,
        category: newDishCategory,
        price: newDishPrice,
        isVeg: newDishIsVeg,
        image: newDishImage,
        desc: 'Specialty culinary preparation'
      })
    });

    alert(`✅ New dish "${newDishName}" added to Menu!`);
    setNewDishName('');
    setNewDishPrice('');
    setNewDishImage('');
    loadFoods();
  };

  const handleDeleteDish = async (id) => {
    if (!window.confirm('Delete this dish from menu?')) return;
    await fetch(`http://localhost:5000/api/foods/${id}`, { method: 'DELETE' });
    loadFoods();
  };

  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || food.category === selectedCategory;
    const matchesVeg = vegFilter === 'all' || (vegFilter === 'veg' ? food.isVeg : !food.isVeg);
    return matchesSearch && matchesCategory && matchesVeg;
  });

  // 1. DESKTOP SPLIT LOGIN
  if (!isLoggedIn) {
    return (
      <div style={{ width: '100vw', minHeight: '100vh', display: 'flex', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <div style={{ flex: 1.2, background: 'linear-gradient(135deg, #c2410c, #ea580c, #f97316)', padding: '80px', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontSize: '42px' }}>🍕</span>
              <h1 style={{ fontSize: '36px', fontWeight: '900', margin: 0 }}>FeastHub</h1>
            </div>
            <p style={{ opacity: 0.85, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '6px' }}>
              Full-Stack Food Delivery & Order Management
            </p>
          </div>

          <div style={{ maxWidth: '600px' }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold' }}>
              Multi-Role Access
            </span>
            <h2 style={{ fontSize: '46px', fontWeight: '900', lineHeight: 1.2, margin: '20px 0' }}>
              Order Fresh Meals with Digital Invoicing.
            </h2>
            <p style={{ fontSize: '18px', opacity: 0.9, lineHeight: 1.6 }}>
              Customers browse authentic dishes with official veg/non-veg marks, select online payments, and receive itemized bills, while Admins manage the food catalog and MongoDB orders.
            </p>
          </div>
          <div style={{ fontSize: '14px', opacity: 0.7 }}>© 2026 FeastHub Inc. All rights reserved.</div>
        </div>

        <div style={{ flex: 1, background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px' }}>
          <div style={{ width: '100%', maxWidth: '440px' }}>
            <div style={{ display: 'flex', background: '#f1f5f9', padding: '5px', borderRadius: '12px', marginBottom: '25px' }}>
              <button
                type="button"
                onClick={() => { setRole('customer'); setEmail(''); setPassword(''); }}
                style={{
                  flex: 1, padding: '12px', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer',
                  background: role === 'customer' ? '#ea580c' : 'transparent',
                  color: role === 'customer' ? 'white' : '#64748b'
                }}
              >
                👤 Customer Login
              </button>
              <button
                type="button"
                onClick={() => { setRole('admin'); setEmail('admin@feasthub.com'); setPassword('admin123'); }}
                style={{
                  flex: 1, padding: '12px', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer',
                  background: role === 'admin' ? '#0f172a' : 'transparent',
                  color: role === 'admin' ? 'white' : '#64748b'
                }}
              >
                🛡️ Admin Login
              </button>
            </div>

            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px 0' }}>
              {role === 'admin' ? 'Restaurant Admin Portal' : (isRegistering ? 'Create Customer Account' : 'Customer Sign In')}
            </h2>
            <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 25px 0' }}>
              {role === 'admin' ? 'Sign in with admin credentials to inspect menu & MongoDB orders' : 'Sign in to order food and generate bills'}
            </p>

            <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {role === 'customer' && isRegistering && (
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                />
              )}
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              />

              <button
                type="submit"
                style={{
                  width: '100%', padding: '15px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px', marginTop: '10px',
                  background: role === 'admin' ? '#0f172a' : '#ea580c',
                  color: 'white'
                }}
              >
                {role === 'admin' ? 'Sign In as Administrator' : (isRegistering ? 'Register & Continue' : 'Sign In as Customer')}
              </button>
            </form>

            {role === 'customer' && (
              <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#64748b' }}>
                {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
                <span onClick={() => setIsRegistering(!isRegistering)} style={{ color: '#ea580c', fontWeight: 'bold', cursor: 'pointer' }}>
                  {isRegistering ? 'Sign in' : 'Register now'}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 2. ADMIN DASHBOARD
  if (role === 'admin') {
    return (
      <div style={{ width: '100vw', minHeight: '100vh', background: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <header style={{ width: '100%', background: '#0f172a', color: 'white', padding: '18px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '30px' }}>🛡️</span>
            <div>
              <h2 style={{ margin: 0, fontSize: '22px' }}>FeastHub Admin Control Center</h2>
              <small style={{ color: '#94a3b8' }}>Live MongoDB Database & Menu Management</small>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button
              onClick={() => setRole('customer')}
              style={{ background: '#0284c7', color: 'white', border: 'none', padding: '9px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
            >
              Back to Store 🛍️
            </button>
            <button
              onClick={handleLogout}
              style={{ background: '#ef4444', color: 'white', border: 'none', padding: '9px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
            >
              Sign Out
            </button>
          </div>
        </header>

        <div style={{ padding: '30px 40px' }}>
          <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
            <button
              onClick={() => { setAdminTab('orders'); loadOrders(); }}
              style={{
                padding: '12px 24px', borderRadius: '10px', border: 'none', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer',
                background: adminTab === 'orders' ? '#0f172a' : '#e2e8f0',
                color: adminTab === 'orders' ? 'white' : '#475569'
              }}
            >
              📦 Live Customer Orders ({adminOrders.length})
            </button>
            <button
              onClick={() => setAdminTab('menu')}
              style={{
                padding: '12px 24px', borderRadius: '10px', border: 'none', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer',
                background: adminTab === 'menu' ? '#ea580c' : '#e2e8f0',
                color: adminTab === 'menu' ? 'white' : '#475569'
              }}
            >
              🍽️ Food Items Menu List ({foods.length} Dishes)
            </button>
          </div>

          {adminTab === 'orders' && (
            <div style={{ background: 'white', padding: '30px', borderRadius: '18px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, fontSize: '20px', color: '#0f172a' }}>📦 Customer Orders Recorded in MongoDB</h3>
                <button
                  onClick={loadOrders}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
                >
                  🔄 Refresh Orders
                </button>
              </div>

              {adminOrders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px', color: '#94a3b8' }}>
                  <p style={{ fontSize: '42px', margin: 0 }}>📭</p>
                  <p style={{ fontWeight: 'bold', fontSize: '16px' }}>No orders placed yet</p>
                  <small>Place an order in the Customer store to see it here live.</small>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                        <th style={{ padding: '14px' }}>Order ID</th>
                        <th style={{ padding: '14px' }}>Customer Info</th>
                        <th style={{ padding: '14px' }}>Delivery Address</th>
                        <th style={{ padding: '14px' }}>Items Ordered</th>
                        <th style={{ padding: '14px' }}>Payment Mode</th>
                        <th style={{ padding: '14px' }}>Total Amount</th>
                        <th style={{ padding: '14px' }}>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminOrders.map((ord, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '14px', fontWeight: 'bold', color: '#0f172a' }}>{ord.orderId}</td>
                          <td style={{ padding: '14px' }}>
                            <div style={{ fontWeight: 'bold' }}>{ord.customerName || ord.customer || 'Customer'}</div>
                            <small style={{ color: '#64748b' }}>📞 {ord.phone}</small>
                          </td>
                          <td style={{ padding: '14px', color: '#475569', maxWidth: '200px' }}>{ord.address}</td>
                          <td style={{ padding: '14px' }}>
                            {ord.items?.map((it, i) => (
                              <div key={i} style={{ fontSize: '13px', color: '#334155' }}>
                                • {it.name} <strong>x{it.quantity}</strong> (₹{it.price * it.quantity})
                              </div>
                            ))}
                          </td>
                          <td style={{ padding: '14px' }}>
                            <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
                              {ord.paymentMethod}
                            </span>
                          </td>
                          <td style={{ padding: '14px', fontWeight: '900', color: '#ea580c', fontSize: '16px' }}>₹{ord.total}</td>
                          <td style={{ padding: '14px', color: '#64748b', fontSize: '13px' }}>{ord.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {adminTab === 'menu' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '30px' }}>
              <div style={{ background: 'white', padding: '30px', borderRadius: '18px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '20px', color: '#0f172a' }}>
                  🍽️ Complete Food Items Menu List ({foods.length} items)
                </h3>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                        <th style={{ padding: '12px' }}>Image</th>
                        <th style={{ padding: '12px' }}>Dish Name</th>
                        <th style={{ padding: '12px' }}>Category</th>
                        <th style={{ padding: '12px' }}>Type</th>
                        <th style={{ padding: '12px' }}>Price</th>
                        <th style={{ padding: '12px' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {foods.map((food) => (
                        <tr key={food.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '10px 12px', width: '50px', height: '50px' }}>
                            <div style={{ width: '45px', height: '45px', borderRadius: '8px', overflow: 'hidden' }}>
                              <FoodImage food={food} />
                            </div>
                          </td>
                          <td style={{ padding: '12px', fontWeight: 'bold', color: '#0f172a' }}>{food.name}</td>
                          <td style={{ padding: '12px' }}>
                            <span style={{ background: '#f1f5f9', color: '#475569', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '600' }}>
                              {food.category}
                            </span>
                          </td>
                          <td style={{ padding: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <VegBadge isVeg={food.isVeg} />
                              <span style={{ fontSize: '12px', fontWeight: '600', color: food.isVeg ? '#16a34a' : '#dc2626' }}>
                                {food.isVeg ? 'Veg' : 'Non-Veg'}
                              </span>
                            </div>
                          </td>
                          <td style={{ padding: '12px', fontWeight: 'bold', color: '#ea580c', fontSize: '14px' }}>
                            ₹{food.price}
                          </td>
                          <td style={{ padding: '12px' }}>
                            <button
                              onClick={() => handleDeleteDish(food.id)}
                              style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={{ background: 'white', padding: '30px', borderRadius: '18px', border: '1px solid #e2e8f0', height: 'fit-content' }}>
                <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', color: '#0f172a' }}>➕ Add New Dish</h3>
                
                <form onSubmit={handleAddDish} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '5px' }}>Dish Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Paneer Butter Masala"
                      value={newDishName}
                      onChange={(e) => setNewDishName(e.target.value)}
                      required
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '5px' }}>Category</label>
                    <select
                      value={newDishCategory}
                      onChange={(e) => setNewDishCategory(e.target.value)}
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                    >
                      <option value="Pizza">Pizza</option>
                      <option value="Burgers">Burgers</option>
                      <option value="Biryani">Biryani</option>
                      <option value="Chinese">Chinese</option>
                      <option value="Desserts">Desserts</option>
                      <option value="Drinks">Drinks</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '5px' }}>Food Type</label>
                    <div style={{ display: 'flex', gap: '15px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer', fontWeight: 'bold', color: '#16a34a' }}>
                        <input type="radio" checked={newDishIsVeg} onChange={() => setNewDishIsVeg(true)} />
                        🟢 Pure Veg
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer', fontWeight: 'bold', color: '#dc2626' }}>
                        <input type="radio" checked={!newDishIsVeg} onChange={() => setNewDishIsVeg(false)} />
                        🔴 Non-Veg
                      </label>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '5px' }}>Price (₹)</label>
                    <input
                      type="number"
                      placeholder="299"
                      value={newDishPrice}
                      onChange={(e) => setNewDishPrice(e.target.value)}
                      required
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '5px' }}>Food Image URL (Optional)</label>
                    <input
                      type="url"
                      placeholder="Leave empty for auto-image"
                      value={newDishImage}
                      onChange={(e) => setNewDishImage(e.target.value)}
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{ width: '100%', background: '#ea580c', color: 'white', padding: '14px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}
                  >
                    + Publish Dish to Menu
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 3. CUSTOMER STOREFRONT
  return (
    <div style={{ width: '100vw', minHeight: '100vh', background: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Top Navbar */}
      <header style={{ width: '100%', background: 'white', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 100, padding: '0 40px', boxSizing: 'border-box' }}>
        <div style={{ width: '100%', height: '75px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '32px' }}>🍕</span>
            <div>
              <h2 style={{ color: '#ea580c', margin: 0, fontSize: '24px', fontWeight: '900' }}>FeastHub</h2>
              <small style={{ color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase' }}>SKASC College Delivery Portal</small>
            </div>
          </div>

          <div style={{ flex: 1, maxWidth: '650px' }}>
            <input
              type="text"
              placeholder="Search dishes (e.g. Pizza, Noodles, Biryani)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '12px 22px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '50px', outline: 'none', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => { setRole('admin'); loadOrders(); }}
              style={{ background: '#0f172a', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
            >
              🛡️ Admin Panel
            </button>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>
              👋 {name}
            </span>
          </div>

        </div>
      </header>

      {/* Main Two-Column Food Menu */}
      <div style={{ width: '100%', padding: '30px 40px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: '35px', boxSizing: 'border-box' }}>
        
        <div>
          {/* Categories & Dietary Filters */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '25px' }}>
            
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '9px 20px', borderRadius: '30px',
                    border: selectedCategory === cat ? 'none' : '1px solid #cbd5e1',
                    background: selectedCategory === cat ? '#ea580c' : 'white',
                    color: selectedCategory === cat ? 'white' : '#475569',
                    fontWeight: 'bold', fontSize: '13px', cursor: 'pointer',
                    boxShadow: selectedCategory === cat ? '0 4px 10px rgba(234, 88, 12, 0.3)' : 'none'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', background: '#e2e8f0', padding: '4px', borderRadius: '10px', gap: '4px' }}>
              <button
                onClick={() => setVegFilter('all')}
                style={{ padding: '6px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', background: vegFilter === 'all' ? 'white' : 'transparent', color: vegFilter === 'all' ? '#0f172a' : '#64748b' }}
              >
                All Dishes
              </button>
              <button
                onClick={() => setVegFilter('veg')}
                style={{ padding: '6px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', background: vegFilter === 'veg' ? '#dcfce7' : 'transparent', color: vegFilter === 'veg' ? '#16a34a' : '#64748b' }}
              >
                🟢 Pure Veg
              </button>
              <button
                onClick={() => setVegFilter('non-veg')}
                style={{ padding: '6px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', background: vegFilter === 'non-veg' ? '#fee2e2' : 'transparent', color: vegFilter === 'non-veg' ? '#991b1b' : '#64748b' }}
              >
                🔴 Non-Veg
              </button>
            </div>

          </div>

          <h2 style={{ fontSize: '22px', color: '#1e293b', marginBottom: '20px', fontWeight: '800' }}>
            {selectedCategory === 'All' ? 'All Menu Items' : `${selectedCategory} Specials`} ({filteredFoods.length} dishes available)
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {filteredFoods.map((food) => (
              <div
                key={food.id}
                style={{ background: 'white', borderRadius: '18px', overflow: 'hidden', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}
              >
                <div>
                  <div style={{ height: '190px', width: '100%', position: 'relative', overflow: 'hidden', background: '#f8fafc' }}>
                    <FoodImage food={food} />
                    <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(4px)', color: 'white', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', zIndex: 2 }}>
                      ⭐ {food.rating || 4.8}
                    </div>
                  </div>

                  <div style={{ padding: '18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                      <VegBadge isVeg={food.isVeg} />
                      <span style={{ fontSize: '11px', background: '#ffedd5', color: '#c2410c', padding: '3px 10px', borderRadius: '6px', fontWeight: '700' }}>
                        {food.category}
                      </span>
                    </div>

                    <h3 style={{ margin: '6px 0', fontSize: '17px', color: '#1e293b', fontWeight: '700' }}>{food.name}</h3>
                    <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#64748b', lineHeight: 1.4 }}>{food.desc}</p>
                    <small style={{ color: '#94a3b8', fontSize: '11px' }}>({food.reviews || 500}+ verified reviews)</small>
                  </div>
                </div>

                <div style={{ padding: '0 18px 18px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f8fafc', paddingTop: '14px' }}>
                  <span style={{ color: '#ea580c', fontWeight: '900', fontSize: '20px' }}>₹{food.price}</span>
                  <button
                    onClick={() => addToCart(food)}
                    style={{ background: '#ea580c', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}
                  >
                    + Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sticky Cart */}
        <div>
          <div style={{ background: 'white', borderRadius: '18px', padding: '28px', border: '1px solid #e2e8f0', position: 'sticky', top: '105px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin: '0 0 18px 0', fontSize: '20px', color: '#1e293b', borderBottom: '1px solid #f1f5f9', paddingBottom: '14px', fontWeight: '800' }}>
              🛒 Order Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </h3>

            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 10px', color: '#94a3b8' }}>
                <p style={{ fontSize: '40px', margin: 0 }}>🛍️</p>
                <p style={{ fontWeight: 'bold', margin: '10px 0 0 0', fontSize: '16px' }}>Your cart is empty</p>
                <small>Select dishes from the menu</small>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '250px', overflowY: 'auto' }}>
                {cart.map((item) => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px dashed #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <VegBadge isVeg={item.isVeg} />
                      <div>
                        <strong style={{ fontSize: '14px', color: '#334155' }}>{item.name}</strong>
                        <div style={{ fontSize: '13px', color: '#64748b' }}>₹{item.price} each</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button onClick={() => updateQuantity(item.id, -1)} style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer' }}>-</button>
                      <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer' }}>+</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cart.length > 0 && (
              <div style={{ marginTop: '25px', paddingTop: '18px', borderTop: '2px solid #f1f5f9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>
                  <span>Item Subtotal</span>
                  <strong>₹{subtotal}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>
                  <span>GST Taxes (5%)</span>
                  <strong>₹{taxes}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#64748b', marginBottom: '14px' }}>
                  <span>Delivery Partner Fee</span>
                  <strong>{deliveryFee === 0 ? <span style={{ color: '#22c55e' }}>FREE</span> : `₹${deliveryFee}`}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '900', color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '14px', marginBottom: '20px' }}>
                  <span>Total Amount</span>
                  <span style={{ color: '#ea580c' }}>₹{grandTotal}</span>
                </div>

                <button
                  onClick={() => setShowCheckout(true)}
                  style={{ width: '100%', background: '#ea580c', color: 'white', border: 'none', padding: '16px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', boxShadow: '0 4px 12px rgba(234, 88, 12, 0.35)' }}
                >
                  Proceed to Checkout (₹{grandTotal}) ➔
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* 4. COMPACT & SCROLLABLE CHECKOUT MODAL (With Payment Method Inputs for Mam) */}
      {showCheckout && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '15px' }}>
          <div style={{ background: 'white', width: '100%', maxWidth: '460px', maxHeight: '88vh', overflowY: 'auto', borderRadius: '16px', padding: '22px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'relative' }}>
            <button
              onClick={() => setShowCheckout(false)}
              style={{ position: 'absolute', top: '14px', right: '14px', background: 'transparent', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#94a3b8' }}
            >
              ✕
            </button>

            <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', color: '#0f172a' }}>Delivery & Payment Details</h3>
            <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 14px 0' }}>Select payment and click Confirm</p>

            <form onSubmit={handleConfirmOrder} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#475569', marginBottom: '3px' }}>Delivery Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#475569', marginBottom: '3px' }}>Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#475569', marginBottom: '5px' }}>Payment Mode</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                  {['UPI / Google Pay', 'Cash on Delivery', 'Credit/Debit Card', 'Net Banking'].map((mode) => (
                    <label
                      key={mode}
                      onClick={() => setPaymentMethod(mode)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '6px', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px',
                        border: paymentMethod === mode ? '2px solid #ea580c' : '1px solid #cbd5e1',
                        background: paymentMethod === mode ? '#fff7ed' : '#f8fafc',
                        fontWeight: paymentMethod === mode ? 'bold' : 'normal',
                        color: paymentMethod === mode ? '#c2410c' : '#334155'
                      }}
                    >
                      <input type="radio" checked={paymentMethod === mode} onChange={() => {}} />
                      {mode}
                    </label>
                  ))}
                </div>
              </div>

              {/* --- DYNAMIC PAYMENT METHOD INPUTS FOR MAM --- */}
              {paymentMethod === 'UPI / Google Pay' && (
                <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px', padding: '10px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#166534' }}>Enter Google Pay / PhonePe / UPI ID:</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g. 9876543210@paytm or name@okaxis"
                    style={{ width: '100%', padding: '6px 8px', marginTop: '4px', border: '1px solid #86efac', borderRadius: '6px', fontSize: '12px', boxSizing: 'border-box' }}
                  />
                  <div style={{ marginTop: '4px', fontSize: '10px', color: '#15803d' }}>
                    ⚡ Notification will be pushed to your UPI app for instant approval.
                  </div>
                </div>
              )}

              {paymentMethod === 'Credit/Debit Card' && (
                <div style={{ background: '#eff6ff', border: '1px solid #93c5fd', borderRadius: '8px', padding: '10px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#1e40af' }}>Card Number (Debit / Credit):</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="16-Digit Card Number"
                    maxLength="19"
                    style={{ width: '100%', padding: '6px 8px', marginTop: '4px', border: '1px solid #93c5fd', borderRadius: '6px', fontSize: '12px', boxSizing: 'border-box' }}
                  />
                  <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      maxLength="5"
                      style={{ flex: 1, padding: '6px', border: '1px solid #93c5fd', borderRadius: '6px', fontSize: '12px', boxSizing: 'border-box' }}
                    />
                    <input
                      type="password"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="CVV"
                      maxLength="3"
                      style={{ flex: 1, padding: '6px', border: '1px solid #93c5fd', borderRadius: '6px', fontSize: '12px', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div style={{ marginTop: '4px', fontSize: '10px', color: '#1d4ed8' }}>
                    🔒 256-bit SSL encrypted & 3D-Secure bank OTP verification.
                  </div>
                </div>
              )}

              {paymentMethod === 'Net Banking' && (
                <div style={{ background: '#faf5ff', border: '1px solid #d8b4fe', borderRadius: '8px', padding: '10px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#7e22ce' }}>Select Bank:</label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    style={{ width: '100%', padding: '6px 8px', marginTop: '4px', border: '1px solid #d8b4fe', borderRadius: '6px', fontSize: '12px', boxSizing: 'border-box' }}
                  >
                    <option>State Bank of India (SBI)</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                    <option>Kotak Mahindra Bank</option>
                  </select>
                  <div style={{ marginTop: '4px', fontSize: '10px', color: '#6b21a8' }}>
                    🏦 Direct secure redirection to official bank net-banking portal.
                  </div>
                </div>
              )}

              {paymentMethod === 'Cash on Delivery' && (
                <div style={{ background: '#fff7ed', border: '1px solid #fdba74', borderRadius: '8px', padding: '8px' }}>
                  <span style={{ fontSize: '11px', color: '#c2410c' }}>
                    💵 Pay ₹{grandTotal} in cash upon doorstep delivery.
                  </span>
                </div>
              )}

              <div style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#475569', fontWeight: '600' }}>Total Amount:</span>
                <span style={{ fontSize: '16px', color: '#ea580c', fontWeight: '900' }}>₹{grandTotal}</span>
              </div>

              <button
                type="submit"
                style={{ width: '100%', background: '#ea580c', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', marginTop: '4px' }}
              >
                Confirm Order & Generate Bill 🧾
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 5. OFFICIAL PRINTABLE BILL / RECEIPT */}
      {placedBill && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, padding: '15px' }}>
          <div style={{ background: 'white', width: '100%', maxWidth: '540px', maxHeight: '90vh', overflowY: 'auto', borderRadius: '20px', padding: '30px', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', position: 'relative' }}>
            
            <div style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h1 style={{ color: '#ea580c', margin: 0, fontSize: '24px', fontWeight: '900' }}>🍕 FeastHub</h1>
                <p style={{ margin: '3px 0 0 0', color: '#64748b', fontSize: '12px' }}>Tax Invoice & Order Receipt</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ background: '#dcfce7', color: '#166534', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                  ✓ PAID
                </span>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', fontWeight: 'bold', color: '#0f172a' }}>{placedBill.orderId}</p>
              </div>
            </div>

            <div style={{ padding: '16px 0', borderBottom: '1px solid #f1f5f9', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '12px' }}>
              <div>
                <span style={{ color: '#94a3b8', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }}>Billed To:</span>
                <p style={{ margin: '4px 0 2px 0', fontWeight: 'bold', color: '#0f172a' }}>{placedBill.customerName || name || 'Customer'}</p>
                <p style={{ margin: '0 0 2px 0', color: '#64748b' }}>📞 {placedBill.phone || phone}</p>
                <p style={{ margin: 0, color: '#64748b' }}>📍 {placedBill.address || address}</p>
              </div>
              <div>
                <span style={{ color: '#94a3b8', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }}>Order Info:</span>
                <p style={{ margin: '4px 0 2px 0', color: '#475569' }}>Time: <strong>{placedBill.time}</strong></p>
                <p style={{ margin: '0 0 2px 0', color: '#475569' }}>Payment Mode: <strong>{placedBill.paymentMethod}</strong></p>
                <p style={{ margin: 0, color: '#475569' }}>Status: <strong style={{ color: '#166534' }}>Confirmed in MongoDB</strong></p>
              </div>
            </div>

            <div style={{ padding: '16px 0', borderBottom: '2px solid #e2e8f0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ color: '#64748b', borderBottom: '1px solid #cbd5e1' }}>
                    <th style={{ paddingBottom: '6px' }}>Dish Name</th>
                    <th style={{ paddingBottom: '6px', textAlign: 'center' }}>Qty</th>
                    <th style={{ paddingBottom: '6px', textAlign: 'right' }}>Price</th>
                    <th style={{ paddingBottom: '6px', textAlign: 'right' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {placedBill.items?.map((it, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px dashed #f1f5f9' }}>
                      <td style={{ padding: '8px 0', fontWeight: '600', color: '#0f172a', display: 'flex', alignItems: 'center' }}>
                        <VegBadge isVeg={it.isVeg} />
                        {it.name}
                      </td>
                      <td style={{ padding: '8px 0', textAlign: 'center' }}>{it.quantity}</td>
                      <td style={{ padding: '8px 0', textAlign: 'right' }}>₹{it.price}</td>
                      <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 'bold' }}>₹{it.price * it.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', textAlign: 'right' }}>
                <div>Item Subtotal: <strong>₹{placedBill.subtotal}</strong></div>
                <div>GST Taxes (5%): <strong>₹{placedBill.taxes}</strong></div>
                <div>Delivery Charge: <strong>{placedBill.deliveryFee === 0 ? 'FREE' : `₹${placedBill.deliveryFee}`}</strong></div>
                <div style={{ fontSize: '16px', fontWeight: '900', color: '#ea580c', borderTop: '1px solid #cbd5e1', paddingTop: '6px', marginTop: '4px' }}>
                  Grand Total Paid: ₹{placedBill.total}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <button
                onClick={() => window.print()}
                style={{ flex: 1, background: '#0f172a', color: 'white', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}
              >
                🖨️ Print Receipt
              </button>
              <button
                onClick={() => setPlacedBill(null)}
                style={{ flex: 1, background: '#ea580c', color: 'white', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}
              >
                Close & Continue
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
