import { useRef } from "react";
import { Button } from "react-bootstrap";
import ReactToPrint from "react-to-print";

const TotalIncome = ({ totalIncome, paymentProps }: any) => {
  //printing functionality
  const componentRef = useRef(null);

  return (
    <div>
      <ReactToPrint
        trigger={() => <Button variant="secondary">Print income</Button>}
        content={() => componentRef.current}
        documentTitle="Income"
        pageStyle="print"
      />
      <div ref={componentRef}>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th scope="col">Type of Income</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {paymentProps?.map((p: any, i: any) => {
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
        <h5 style={{ overflow: "hidden" }}>Total Income: {totalIncome}</h5>
      </div>
    </div>
  );
};

export default TotalIncome;
