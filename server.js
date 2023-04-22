// Import required dependencies
const express = require('express');
const bodyParser = require('body-parser');

// Create Express app
const app = express();

// Set up body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Define route for loan calculation
app.post('/calculateLoan', (req, res) => {
  // Retrieve input values from request body
  const amount = req.body.amount;
  const frequency = req.body.frequency;
  const period = req.body.period;
  const start = req.body.start;
  const interestType = req.body.interestType;

  // Perform validation on input values
  // TODO: Implement validation logic to ensure input values are valid

  // Calculate loan instalments based on interest type
  let rate, interest, totalAmount;
  if (interestType === "reducing") {
    // Perform reducing balance interest calculation
    rate = (period > 0) ? 22 : 25; // Check if period is greater than 0 to determine the rate
    interest = (amount * rate * period) / (100 * frequency);
    totalAmount = amount + interest;
  } else if (interestType === "flat") {
    // Perform flat rate interest calculation
    rate = (period > 0) ? 20 : 18; // Check if period is greater than 0 to determine the rate
    interest = (amount * rate * period) / (100 * frequency);
    totalAmount = amount + interest;
  }

  // Calculate additional fees
  const processingFees = amount * 0.03;
  const exciseDuty = processingFees * 0.2;
  const legalFees = 10000;

  // Calculate take home amount
  const takeHomeAmount = totalAmount - processingFees - exciseDuty - legalFees;

  // Prepare response data
  const response = {
    interest: interest,
    totalAmount: totalAmount,
    processingFees: processingFees,
    exciseDuty: exciseDuty,
    legalFees: legalFees,
    takeHomeAmount: takeHomeAmount
  };

  // Send JSON response
  res.json(response);
});

// Start server and listen on specified port
const port = 3000; // Change this to the desired port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});    