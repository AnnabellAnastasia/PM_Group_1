from flask import Flask
from dotenv import load_dotenv
import os
import psycopg2

load_dotenv()
app = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(
        dbname=os.getenv('DB_NAME'),  
        user=os.getenv('DB_USER'),           
        password=os.getenv('DB_PASSWORD'),  
        host=os.getenv('DB_HOST'),          
        port=os.getenv('DB_PORT')              
    )
    return conn

@app.route('/api/admin_access', methods=['GET'])
def get_admin_access():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT name, password FROM admin_access;')
    admin_access_data = cur.fetchall()
    cur.close()
    conn.close()
    
    # Convert the data to a list of dictionaries
    results = [{"name": row[0], "password": row[1]} for row in admin_access_data]
    
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
