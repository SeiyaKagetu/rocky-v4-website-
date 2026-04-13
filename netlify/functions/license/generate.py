import sqlite3
import json
import os
import secrets
import datetime

def handler(event, context):
    # Check admin token
    token = event.get('headers', {}).get('x-admin-token')
    if token not in ["noveos34", "v34beyond"]:
        return {
            "statusCode": 401,
            "body": json.dumps({"detail": "Unauthorized access attempt logged."})
        }

    if event.get('httpMethod') != 'POST':
        return {
            "statusCode": 405,
            "body": json.dumps({"detail": "Method not allowed."})
        }

    try:
        body = json.loads(event.get('body', '{}'))
        plan = body.get('plan', 'personal')
        customer_name = body.get('customer_name', 'Unknown')
        customer_email = body.get('customer_email', 'unknown@example.com')
        months = body.get('months', 12)
        
        # Generate a key like "7168-E703-8ECA-8891"
        def gen_part():
            return secrets.token_hex(2).upper()
        
        license_key = f"{gen_part()}-{gen_part()}-{gen_part()}-{gen_part()}"
        
        # Calculate dates
        now = datetime.datetime.now().strftime('%Y-%m-%dT%H:%M:%S')
        valid_until = (datetime.datetime.now() + datetime.timedelta(days=30*months)).strftime('%Y-%m-%dT%H:%M:%S')
        
        db_path = os.path.join(os.getcwd(), 'nove_os.db')
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Insert license
        cursor.execute("""
            INSERT INTO licenses (license_key, plan, customer_name, customer_email, server_limit, valid_from, valid_until, is_active)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (license_key, plan, customer_name, customer_email, 10, now, valid_until, 1))
        
        conn.commit()
        conn.close()
        
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({"license_key": license_key})
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"detail": str(e)})
        }
