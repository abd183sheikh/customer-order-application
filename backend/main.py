from flask import Flask, jsonify, request
from flask_cors import CORS
from sqlalchemy import create_engine
import pandas as pd

app = Flask(__name__)
CORS(app)

# Connect to SQLite DB
engine = create_engine("sqlite:///my_database.db")

# Get all orders
@app.route('/api/orders', methods=['GET'])
def get_orders():
    df = pd.read_sql("SELECT * FROM orders", con=engine)
    return jsonify(df.to_dict(orient='records'))

# Get orders by customer/user ID
@app.route('/api/orders/<customer_id>', methods=['GET'])
def get_orders_by_customer(customer_id):
    df = pd.read_sql("SELECT * FROM orders", con=engine)
    
    try:
        customer_id = int(customer_id)  # Ensure matching type
    except ValueError:
        return jsonify({'error': 'Invalid customer ID'}), 400

    customer_orders = df[df['user_id'] == customer_id]
    
    if customer_orders.empty:
        return jsonify({'error': 'Customer not found'}), 404
    
    return jsonify(customer_orders.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
