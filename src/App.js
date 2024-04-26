import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { RingLoader } from 'react-spinners';

function BtnDebug({ id, name, url, params, setLoadingSpin, setState }) {
  function handleClick() {
    setLoadingSpin(true);

    if (params) {
      console.log('call post method')
      axios.post('http://localhost:8081/' + url, params).then(response => {
        console.log(response.data);
      })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          setLoadingSpin(false);
        });
      return;
    } else {
      axios.get('http://localhost:8081/' + url).then(response => {
        setState(response.data);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setLoadingSpin(false);
      });
    }
  }
  return (
    <button
      id={id}
      onClick={handleClick}
    >
      {name}
    </button>
  );
}

function TableAccountsRender({ state }) {
  if (state == null) {
    return (
      <table id="accountTable" />
    );
  }
  return (
    <table id="accountTable">
      <thead>
        <tr>
          <th>PublicKey</th>
          <th>L2 - Balance</th>
          <th>L1 - Balance</th>
        </tr>
      </thead>
      <tbody>
        {state.accounts.map((item) => (
          <tr key={item.id}>
            <td>{item.publicKey}</td>
            <td>{item.balance}</td>
            <td>{item.l1_balance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function FormRender({ name, type, value, setState }) {
  function handleChange(event) {
    setState(event.target.value);
  };

  return (
    <div class="formGroup">
      <label htmlFor="name">{name}</label>
      <input type={type} value={value} onChange={handleChange} />
    </div>
  )
}


function App() {
  const [accounts, setAccounts] = useState(null);
  const [fromPk, setFrom] = useState('');
  const [amount, setAmount] = useState(0);
  const [toPk, setTo] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const params = {
    transaction: {
      from: fromPk,
      to: toPk,
      amount: amount
    }
  };
  const paramsFullDebug = {
    amount: amount,
  };

  return (
    <div className="App">
      <div id="header">
        <ul id="nav">
          <li><a href="#home">Home</a></li>
          <li><a href="#accounts">Account</a></li>
          <li><a href="#guide">Guide</a></li>
          <li><a href="">More</a>
            <ul class="subnav">
              <li><a href="">About</a></li>
              <li><a href="">Contact</a></li>
              <li><a href="">Privacy</a></li>
            </ul>
          </li>
        </ul>
      </div>
      <div id="home">
        <h1>Home</h1>
        <p>Layer 2 Zk-Rollups</p>
        <div class="container">
        <BtnDebug id="btnDebugDeposit" name="Debug Deposit" url="debug/deposit" params={params} setLoadingSpin={setLoading} />
        <BtnDebug id="btnDebugTransfer" name="Debug Transfer" url="debug/transfer" params={params} setLoadingSpin={setLoading} />
        <BtnDebug id="btnDebugWithdraw" name="Debug Withdraw" url="debug/withdraw" params={params} setLoadingSpin={setLoading} />
        </div>
        <div class="container">
        <BtnDebug id="btnDebugFullRegister" name="Debug Full Register" url="debug/full-register" params={paramsFullDebug} setLoadingSpin={setLoading} />
        <BtnDebug id="btnDebugFullTransfer" name="Debug Full Transfer" url="debug/full-transfer" params={paramsFullDebug} setLoadingSpin={setLoading} />
        <BtnDebug id="btnDebugFullWithdraw" name="Debug Full Withdraw" url="debug/full-withdraw" params={paramsFullDebug} setLoadingSpin={setLoading} />
        </div>
        <div class="container">
        <BtnDebug id="btnDebugFullExistence" name="Debug Full Existence" url="debug/full-existence" params={paramsFullDebug} setLoadingSpin={setLoading} />
        </div>
        <div class="container">
          <FormRender name="From Account" type="text" value={fromPk} setState={setFrom} />
          <FormRender name="Amount" type="number" value={amount} setState={setAmount} />
          <FormRender name="To Account" type="text" value={toPk} setState={setTo} />
        </div>
      </div>
      <div id="accounts">
        <h1>Accounts</h1>
        <p>List Accounts in Tree</p>
        <BtnDebug id="show-accounts" name="Show Accounts" url="status" setState={setAccounts} setLoadingSpin={setLoading} />
        {loading ? (
          <RingLoader color="#123abc" size={50} /> // Display a loading spinner while waiting for the request to complete
        ) : (
          <TableAccountsRender state={accounts} />
        )}
      </div>
      <div id="guide">
        <h1>Guide</h1>
        <p>Lorem ipsum dolor si</p>
      </div>
      <div id="footer"></div>
    </div>
  );
}

export default App;
