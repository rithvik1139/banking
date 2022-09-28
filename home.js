function Home(){
  return (
    <Card
      txtcolor="black"
      header="RK Bank"
      title="Welcome to RK Bank"
      text="You can create an account as well as deposit and withdraw money here!"
      body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
    />    
  );  
}
