function AllData() {
  const ctx = React.useContext(UserContext);

  return (
    <div className="row">
      <div className="col-sm-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">RK Bank Transaction Data</h5>
            <table className="card-text">
              <thead>
                <tr>
                  <th> Date</th>
                  <th> Type</th>
                  <th> Amount</th>
                  <th> Balance</th>
                  <th> Name</th>
                </tr>
              </thead>
              <tbody>
                {ctx.users[ctx.currentUser].transactions.map((trans) => (
                  <tr>
                    <td> {trans.record.date} </td>
                    <td> {trans.record.type}</td>
                    <td> {trans.record.amount}</td>
                    <td> {trans.record.balance}</td>
                    <td> {trans.record.name} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="col-sm-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Create Account Data</h5>
            <table className="card-text">
              <thead>
                <tr>
                  <th> Name</th>
                  <th> Email</th>
                  <th> Password</th>
                </tr>
              </thead>
              <tbody>
                {ctx.users.map((info) => (
                  <tr>
                    <td> {info.name} </td>
                    <td> {info.email}</td>
                    <td> {info.password}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  );
}
