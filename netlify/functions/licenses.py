import sqlite3
import json
import os

def handler(event, context):
    # Check admin token
    token = event.get('headers', {}).get('x-admin-token')
    if token not in ["noveos34", "v34beyond"]:
        return {
            "statusCode": 401,
            "body": json.dumps({"detail": "Unauthorized access attempt logged."})
        }

    # Connect to the database
    # In Netlify, the file might be in the root of the project
    db_path = os.path.join(os.getcwd(), 'nove_os.db')
    
    try:
        conn = sqlite3.connect(db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        cursor.execute("SELECT * FROM licenses")
        rows = cursor.fetchall()
        
        licenses = []
        for row in rows:
            licenses.append({
                "license_key": row["license_key"],
                "plan": row["plan"],
                "customer_name": row["customer_name"],
                "customer_email": row["customer_email"],
                "is_active": bool(row["is_active"]),
                "valid_until": row["valid_until"]
            })
            
        conn.close()
        
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps(licenses)
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"detail": str(e)})
        }
