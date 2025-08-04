from flask import Flask, jsonify
from flask_cors import CORS
from sqlalchemy import create_engine
import pandas as pd

app = Flask(__name__)
CORS(app)  # Allow frontend access

# Connect to SQLite DB
engine = create_engine("sqlite:///my_database.db")

@app.route('/api/orders', methods=['GET'])
def get_orders():
    df = pd.read_sql("SELECT * FROM orders", con=engine)
    return jsonify(df.to_dict(orient='records'))

@app.route('/api/users', methods=['GET'])
def get_users():
    df = pd.read_sql("SELECT * FROM users", con=engine)
    return jsonify(df.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

