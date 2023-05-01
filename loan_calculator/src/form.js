import { Form, Button } from 'react-bootstrap';

const LoanForm = () => {
  return (
    <Form>
      <Form.Group controlId="amount">
        <Form.Label>Amount to borrow</Form.Label>
        <Form.Control type="number" placeholder="Enter amount" />
      </Form.Group>

      <Form.Group controlId="frequency">
        <Form.Label>Payment frequency</Form.Label>
        <Form.Control as="select">
          <option>Annually</option>
          <option>Quarterly</option>
          <option>Monthly</option>
          <option>Every 6 Months</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="period">
        <Form.Label>Loan period</Form.Label>
        <Form.Control type="number" placeholder="Enter period in months" />
      </Form.Group>

      <Form.Group controlId="start-date">
        <Form.Label>Start date</Form.Label>
        <Form.Control type="date" />
      </Form.Group>

      <Form.Group controlId="interest-type">
        <Form.Label>Interest Type</Form.Label>
        <Form.Control as="select">
          <option>Reducing balance</option>
          <option>Flat rate</option>
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit">
        Calculate instalments
      </Button>
    </Form>
  );
};

export default LoanForm;