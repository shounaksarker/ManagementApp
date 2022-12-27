import { useRef } from "react";
import { Button } from "react-bootstrap";
import ReactToPrint from "react-to-print";

const TotalExpense = ({ expenseProps, totalExpense }: any) => {
  const chk = (p: any) => {
    if (p) {
      if (p.type === "TempDev") {
        return <td>Temple Development</td>;
      }
      if (p.type === "FuneralDev") {
        return <td>Crematorium Development</td>;
      }
      if (p.type === "EmployeeSalary") {
        return <td>Salary and allowances</td>;
      }
      if (p.type === "DailyPuja") {
        return <td>Daily/Weekly Pray</td>;
      }
      if (p.type === "Appayon") {
        return <td>Entertainment meetings</td>;
      }
      if (p.type === "Prosasonik") {
        return <td>Administrative and Legal</td>;
      }
      if (p.type === "ProcharProkashona") {
        return <td>Publicity, publication and travel</td>;
      }
      if (p.type === "OfficeCost") {
        return <td>Publicity, publication and travel</td>;
      }
      if (p.type === "SebamulokDan") {
        return <td>Social welfare work and charitable donations</td>;
      }
      if (p.type === "UtilityBill") {
        return <td>Electricity, gas, telephone</td>;
      }
      if (p.type === "BibidhExpense") {
        return <td>Misc</td>;
      }
      if (p.type === "SpecialFunction") {
        return <td>Special event</td>;
      }
    }
  };
  //printing functionality
  const componentRef = useRef(null);
  return (
    <div>
      <ReactToPrint
        trigger={() => <Button variant="secondary">Print Expense</Button>}
        content={() => componentRef.current}
        documentTitle="খরচ"
        pageStyle="print"
      />
      <div ref={componentRef}>
        <table className="table table-striped mt-3 ">
          <thead>
            <tr>
              <th scope="col">Type of Expense</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenseProps?.map((p: any, i: any) => {
              return (
                p.amount > 0 && (
                  <tr key={i}>
                    <td>{p?.name}</td>
                    <td>{p?.amount}</td>
                  </tr>
                )
              );
            })}
          </tbody>
        </table>
        <h5 style={{ overflow: "hidden" }}>Total Expense: {totalExpense}</h5>
      </div>
    </div>
  );
};

export default TotalExpense;
