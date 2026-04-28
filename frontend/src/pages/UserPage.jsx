import React, { useState, useEffect } from "react";
import "../styles/UserPage.css";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AccountBox({ acc, type }) {
  const navigate = useNavigate();

  return (
    <div className="account-box">
      <span className={type === "real" ? "real" : "demo"}>
        <h3>{type}</h3>
      </span>
      <h3>Standard</h3>

      <p>Number: #{acc.account_id}</p>
      <p>
        Balance:{" "}
        <strong>
          {acc.balance ? parseFloat(acc.balance).toFixed(2) : "0.00"} USD
        </strong>
      </p>
      <p>Used Margin: {acc.used_margin || 0} USD</p>
      <p>Leverage: 1:{acc.leverage}</p>

      <button onClick={() => navigate("/MarketPage")}>Open</button>
    </div>
  );
}

function Dashboard({ onOpenAccount, accounts, loading }) {
  const [tab, setTab] = useState("real");

  const filteredAccounts = accounts.filter((acc, index) =>
    tab === "real" ? index === 0 : index !== 0
  );

  return (
    <main className="main-container">
      <section className="unit">
        <div className="account">
          <h1>My accounts</h1>

          <button className="addAccount" onClick={onOpenAccount}>
            + Open account
          </button>

          <div className="btnGroup">
            <button
              className={tab === "real" ? "active" : "unActive"}
              onClick={() => setTab("real")}
            >
              Real
            </button>

            <button
              className={tab === "demo" ? "active" : "unActive"}
              onClick={() => setTab("demo")}
            >
              Demo
            </button>
          </div>
        </div>
      </section>

      <div className="account-list">
        {loading ? (
          <p style={{ color: "#fff", padding: "20px" }}>Loading data...</p>
        ) : filteredAccounts.length > 0 ? (
          filteredAccounts.map((acc) => (
            <AccountBox key={acc.account_id} acc={acc} type={tab} />
          ))
        ) : (
          <p style={{ color: "#aaa", padding: "20px" }}>
            Chưa có tài khoản nào.
          </p>
        )}
      </div>

      <footer>
        <p>
          © 2026 Nova Trading Platform. All rights reserved. Trading involves
          risk. This website is designed to provide users with a modern and
          efficient trading experience.
        </p>
      </footer>
    </main>
  );
}

function OpenAccount({ setPage, setAccounts }) {
  const [radio, setRadio] = useState("");

  const handleButton = (e) => {
    e.preventDefault();
    if (!radio) {
      alert("Vui lòng chọn loại tài khoản");
      return;
    }

    const newAccount = {
      account_id: Math.floor(Math.random() * 100000),
      balance: 1000,
      used_margin: 0,
      leverage: 100,
    };

    setAccounts((prev) => [...prev, newAccount]);

    alert(`Mở tài khoản ${radio} thành công!`);
    setPage("dashboard");
  };

  return (
    <form className="open-account" onSubmit={handleButton}>
      <h1>Open account</h1>

      <label className="account-card">
        <div className="account-real" onClick={() => setRadio("real")}>
          <input
            type="radio"
            name="account"
            checked={radio === "real"}
            readOnly
          />
          <h2>Real</h2>
          <h3>Standard</h3>
          <p>Low minimum deposit with no commission</p>
          <p>Min deposit: 10 USD</p>
        </div>

        <div className="account-demo" onClick={() => setRadio("demo")}>
          <input
            type="radio"
            name="account"
            checked={radio === "demo"}
            readOnly
          />
          <h2>Demo</h2>
          <h3>Standard</h3>
          <p>Low minimum deposit with no commission</p>
          <p>Min deposit: 10 USD</p>
        </div>
      </label>

      <button className="continue" type="submit">
        Continue
      </button>

      <button
        type="button"
        className="back"
        onClick={() => setPage("dashboard")}
      >
        Back
      </button>
    </form>
  );
}

// Main Page
export default function UserPage() {
  const [accounts, setAccounts] = useState([]);
  const [page, setPage] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fakeData = [
      {
        account_id: 12345,
        balance: 5000,
        used_margin: 100,
        leverage: 100,
      },
    ];

    setAccounts(fakeData);
    setLoading(false);
  }, []);

  const renderPage = () => {
    switch (page) {
      case "openAccount":
        return (
          <OpenAccount
            setPage={setPage}
            setAccounts={setAccounts}
          />
        );

      default:
        return (
          <Dashboard
            onOpenAccount={() => setPage("openAccount")}
            accounts={accounts}
            loading={loading}
          />
        );
    }
  };

  return (
    <div className="userPage-container">
      <Header />

      <div className="user-container">
        <Sidebar />
        {renderPage()}
      </div>
    </div>
  );
}