from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
if __name__ == "__main__":
  app.run(debug=True)
CORS(app)

@app.route('/calculate', methods=['GET'])
def calculate_instalments():
  loan_data = request.get_json()
  amount = loan_data['amount']
  frequency = loan_data['frequency']
  period = loan_data['period']
  start_date = loan_data['start_date']
  interest_type = loan_data['interest_type']

  processing_fees = amount * 0.03
  excise_duty = processing_fees * 0.2
  legal_fees = 10000
  loan_amount = amount + processing_fees + excise_duty + legal_fees

  if interest_type == 'Flat Rate':
    bank_a_interest_rate = 0.2
    bank_b_interest_rate = 0.18
  elif interest_type == 'Reducing Balance':
    bank_a_interest_rate = 0.22
    bank_b_interest_rate = 0.25

  num_payments = period * frequency

  bank_a_interest_per_year = loan_amount * bank_a_interest_rate
  bank_a_interest_per_payment = bank_a_interest_per_year / num_payments
  bank_a_total_payment = (loan_amount + bank_a_interest_per_year) / num_payments

  bank_b_interest_per_year = loan_amount * bank_b_interest_rate
  bank_b_interest_per_payment = bank_b_interest_per_year / num_payments
  bank_b_total_payment = (loan_amount + bank_b_interest_per_year) / num_payments

  instalments = {
      'bank_a': {
          'interest_rate': bank_a_interest_rate * 100,
          'interest_per_payment': bank_a_interest_per_payment,
          'total_payment': bank_a_total_payment
      },
      'bank_b': {
          'interest_rate': bank_b_interest_rate * 100,
          'interest_per_payment': bank_b_interest_per_payment,
          'total_payment': bank_b_total_payment
      }
  }

  # Return calculated instalments as JSON response
  return jsonify(instalments)
