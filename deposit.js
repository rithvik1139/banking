function Deposit(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [amountD, setAmountD]   = React.useState('');
  const [balance, setBalance]   = React.useState(0);
  const ctx = React.useContext(UserContext);  

  function getCurrentDate(separator='/'){

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }

  function validate(field, label){
      if (!field) {
        setStatus('Error: ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      if (amountD < 0){
        setStatus('Error: amount deposited must be greater than 0');
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      if (isNaN(amountD)){
        setStatus('Error: amount deposited must be a number');
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
  }

  function handleDeposit(){
    console.log(amountD);
    if (!validate(amountD, 'enter deposit amount')) return;
    if (!validate(name,     'enter your name'))     return;

    ctx.users[ctx.currentUser].balance += parseFloat(amountD);
    setBalance(ctx.users[ctx.currentUser].balance);

    const record = {
      date: getCurrentDate(),
      type: "deposit",
      amount: amountD,
      balance: ctx.users[ctx.currentUser].balance,
      name: name
    }

    ctx.users[ctx.currentUser].transactions.push({record});
    console.log(JSON.stringify(ctx.users));
    setShow(false);
  }    

  function clearForm(){
    setName('');
    setAmountD('');
    setShow(true);
  }

  return (
    <Card
      bgcolor="primary"
      header="Deposit"
      status={status}
      body={show ? (  
              <>
              Name<br/>
              <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
              Account Balance: $ {JSON.stringify(ctx.users[ctx.currentUser].balance)}<br/>
              Deposit Amount<br/>
              <input type="input" className="form-control" id="amountD" placeholder="Deposit Amount" value={amountD} onChange={e => setAmountD(e.currentTarget.value)} /><br/>
              <button type="submit" className="btn btn-light" disabled={!amountD} onClick={handleDeposit}>Deposit</button>
              </>
            ):(
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Deposit More Money</button>
              </>
            )}
    />
  )
}