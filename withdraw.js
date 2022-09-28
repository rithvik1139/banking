function Withdraw(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [amountW, setAmountW]   = React.useState('');
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
      if (amountW < 0){
        setStatus('Error: amount withdrawn must be greater than 0');
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      if (amountW > ctx.users[ctx.currentUser].balance){
        setStatus('Error: amount withdrawn cannot be greater than the account balance');
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      if (isNaN(amountW)){
        setStatus('Error: amount withdrawn must be a number');
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
  }

  function handleWithdraw(){
    console.log(amountW);
    if (!validate(amountW, 'insert withdraw amount')) return;
    if (!validate(name,     'enter your name'))     return;

    ctx.users[ctx.currentUser].balance -= parseFloat(amountW);
    setBalance(ctx.users[ctx.currentUser].balance);

    const record = {
      date: getCurrentDate(),
      type: "withdraw",
      amount: amountW,
      balance: ctx.users[ctx.currentUser].balance,
      name: name
    }

    ctx.users[ctx.currentUser].transactions.push({record});
    console.log(JSON.stringify(ctx.users));
    setShow(false);
  }    

  function clearForm(){
    setName('');
    setAmountW('');
    setShow(true);
  }

  return (
    <Card
      bgcolor="primary"
      header="Withdraw"
      status={status}
      body={show ? (  
              <>
              Name<br/>
              <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
              Account Balance: $ {JSON.stringify(ctx.users[ctx.currentUser].balance)}<br/>
              Withdraw Amount<br/>
              <input type="input" className="form-control" id="amountW" placeholder="Withdraw Amount" value={amountW} onChange={e => setAmountW(e.currentTarget.value)} /><br/>
              <button type="submit" className="btn btn-light" disabled={!amountW} onClick={handleWithdraw}>Withdraw</button>
              </>
            ):(
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Withdraw More Money</button>
              </>
            )}
    />
  )
}