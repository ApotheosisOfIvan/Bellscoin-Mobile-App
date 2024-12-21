import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function Home({ connectWallet, walletAddress }) {
  return (
    <div>
      <h1>Welcome to Bellscoin Insured Wallet</h1>
      <p>Your trusted blockchain wallet for secure transactions and insured deposits.</p>
      {!walletAddress ? (
        <button className="App-button" onClick={connectWallet}>
          Connect Wallet
        </button>
      ) : (
        <p>Wallet Connected: {walletAddress}</p>
      )}
      <Link to="/dashboard">
        <button className="App-button">Get Started</button>
      </Link>
    </div>
  );
}

function Dashboard({ walletAddress, activePlans, transactions, addProtection }) {
  const plans = [
    {
      id: 1,
      name: "Wallet Drain Protection",
      description: "Protects against unauthorized access or wallet drains.",
      cost: "10 BELLS",
      monthlyFee: 10,
      coverage: "$1,000",
    },
    {
      id: 2,
      name: "Accidental Transfer Protection",
      description: "Covers accidental token transfers to incompatible networks.",
      cost: "25 BELLS",
      monthlyFee: 25,
      coverage: "$5,000",
    },
    {
      id: 3,
      name: "Lost Private Key Recovery",
      description: "Assistance with recovering lost private keys or losses incurred.",
      cost: "50 BELLS",
      monthlyFee: 50,
      coverage: "$10,000",
    },
  ];

  const isPlanActive = (planId) => activePlans.includes(planId);

  const calculateMonthlyObligation = () => {
    return activePlans.reduce((sum, planId) => {
      const plan = plans.find((p) => p.id === planId);
      return sum + (plan ? plan.monthlyFee : 0);
    }, 0);
  };

  return (
    <div className="Dashboard">
      <div className="Dashboard-card">
        <h3>Wallet Balance</h3>
        <p>{walletAddress ? "$0.00" : "Please connect your wallet"}</p>
      </div>
      <div className="Dashboard-card">
        <h3>Insurance Plans</h3>
        {plans.map((plan) => (
          <div
            key={plan.id}
            style={{
              marginBottom: "20px",
              backgroundColor: isPlanActive(plan.id) ? "#e0ffe0" : "white",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <h4>{plan.name}</h4>
            <p>Cost: {plan.cost}</p>
            <p>Monthly Fee: {plan.monthlyFee} BELLS</p>
            <p>Coverage: {plan.coverage}</p>
            <p>Status: {isPlanActive(plan.id) ? "Active" : "Not Active"}</p>
            {!isPlanActive(plan.id) && (
              <button onClick={() => addProtection(plan.name, plan.monthlyFee)}>
                Add Protection
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="Dashboard-card">
        <h3>Total Monthly Obligations</h3>
        <p>{calculateMonthlyObligation()} BELLS</p>
      </div>
      <div className="Dashboard-card">
        <h3>Transaction History</h3>
        {transactions.length > 0 ? (
          <ul>
            {transactions.map((txn, index) => (
              <li key={index}>
                {txn.date}: {txn.description} - {txn.amount} BELLS
              </li>
            ))}
          </ul>
        ) : (
          <p>No transactions yet</p>
        )}
      </div>
    </div>
  );
}

function App() {
  const [activePlans, setActivePlans] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [walletAddress, setWalletAddress] = useState(null);

  const addProtection = (plan, cost) => {
    if (!activePlans.includes(plan)) {
      setActivePlans([...activePlans, plan]);
      setTransactions([
        ...transactions,
        { date: new Date().toLocaleDateString(), description: `Added ${plan}`, amount: cost },
      ]);
      alert(`${plan} added successfully!`);
    } else {
      alert(`${plan} is already active.`);
    }
  };

  const connectWallet = () => {
    const mockWalletAddress = "0x1234...abcd";
    setWalletAddress(mockWalletAddress);
    alert("Wallet connected!");
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Bellscoin Insured Wallet</h1>
        </header>
        <Routes>
          <Route
            path="/"
            element={<Home connectWallet={connectWallet} walletAddress={walletAddress} />}
          />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                walletAddress={walletAddress}
                activePlans={activePlans}
                transactions={transactions}
                addProtection={addProtection}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
