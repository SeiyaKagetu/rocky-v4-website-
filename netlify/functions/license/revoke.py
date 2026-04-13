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

    if event.get('httpMethod') != 'POST':
        return {
            "statusCode": 405,
            "body": json.dumps({"detail": "Method not allowed."})
        }

    try:
        body = json.loads(event.get('body', '{}'))
        license_key = body.get('license_key')
        
        if not license_key:
            return {
                "statusCode": 400,
                "body": json.dumps({"detail": "Missing license_key."})
            }
        
        db_path = os.path.join(os.getcwd(), 'nove_os.db')
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Deactivate license
        cursor.execute("UPDATE licenses SET is_active = 0 WHERE license_key = ?", (license_key,))
        
        conn.commit()
        conn.close()
        
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({"status": "revoked"})
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"detail": str(e)})
        }
