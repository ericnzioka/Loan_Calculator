import React, { useState } from "react";
import axios from "axios";
import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-dt/js/dataTables.dataTables.min.js";
import jsPDF from "jspdf";
import "jspdf-autotable";

function LoanCalculator() {
  const [amountToBorrow, setAmountToBorrow] = useState(0);
  const [processingFees, setProcessingFees] = useState(0);
  const [exciseDuty, setExciseDuty] = useState(0);
  const [legalFees, setLegalFees] = useState(0);
  const [loanPeriod, setLoanPeriod] = useState(0);
  const [emailAddress, setEmailAddress] = useState("");

  const [instalments, setInstalments] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loanData = {
      amountToBorrow,
      processingFees,
      exciseDuty,
      legalFees,
      loanPeriod,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/calculate",
        loanData
      );
      const instalmentsData = response.data;
      setInstalments(instalmentsData);

      $("#instalments-table").DataTable({
        destroy: true,
        data: instalmentsData,
        columns: [
          { title: "Month" },
          { title: "Bank A - Flat Rate" },
          { title: "Bank A - Reducing Balance" },
          { title: "Bank B - Flat Rate" },
          { title: "Bank B - Reducing Balance" },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text("Loan Instalments", 10, 10);
    doc.autoTable({
      head: [["Month", "Bank A - Flat Rate", "Bank A - Reducing Balance", "Bank B - Flat Rate", "Bank B - Reducing Balance"]],
      body: instalments,
    });
    doc.save("loan_instalments.pdf");
  };

  const handleEmail = async () => {
    const loanData = {
      amountToBorrow,
      processingFees,
      exciseDuty,
      legalFees,
      loanPeriod,
      instalments,
      emailAddress,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/email",
        loanData
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Amount to Borrow:
          <input
            type="number"
            value={amountToBorrow}
            onChange={(e) => setAmountToBorrow(e.target.value)}
          />
        </label>
        <br />
        <label>
          Processing Fees:
          <input
            type="number"
            value={processingFees}
            onChange={(e) => setProcessingFees(e.target.value)}
          />
        </label>
        <br />
        <label>
          Excise Duty:
          <input
            type="number"
            value={exciseDuty}
            onChange={(e) => setExciseDuty(e.target.value)}
          />
        </label>
        <br />
        <label>
        Legal Fees:
        <input
            type="number"
            value={legalFees}
            onChange={(e) => setLegalFees(e.target.value)}
        />
        </label>
            <label>
              Loan Period (Months):
              <input
                type="number"
                value={loanPeriod}
                onChange={(e) => setLoanPeriod(e.target.value)}
              />
            </label>
            <br />
            <label>
              Email Address:
              <input
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </label>
            <br />
            <button type="submit">Calculate Instalments</button>
          </form>
          <br />
          <table id="instalments-table" className="display"></table>
          {instalments.length > 0 && (
            <div>
              <button onClick={handleDownload}>Download as PDF</button>
              <br />
              <label>
                Email Loan Instalments:
                <button onClick={handleEmail}>Send</button>
              </label>
            </div>
          )}
        </div>
);
}

export default LoanCalculator;        