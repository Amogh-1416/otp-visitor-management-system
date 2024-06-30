from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime
import random
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException




app = Flask(__name__)
CORS(app)

TWILIO_ACCOUNT_SID = "TWILIO_ACCOUNT_SID"
TWILIO_PHONE_NUMBER = "TWILIO_PHONE_NUMBER"
TWILIO_AUTH_TOKEN = "TWILIO_AUTH_TOKEN"


client = MongoClient("MONGO_CONNECTION_URI")
db = client['vms']
visitor_collection = db['visitors']
resident_collection = db['residents']
print("connected to db")

print("not connected to db")


twilio_client = Client(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN)


@app.route("/security-check")
def otp_check():
    return "hello"


@app.route("/api/visitorinfo", methods = ['POST','GET'])
def visitor_info():
    
    data = request.get_json()
    print(data)
    visitor_name = data['name']
    visitor_phone = data['phone']
    visitor_purpose = data['purpose']
    visitor_visiting_house = data['house_number']
    current_time = datetime.now().time().isoformat()
    current_date = datetime.now().date().isoformat()

    visitor_data = {
        'name' : visitor_name,
        'phone' : visitor_phone,
        'purpose' : visitor_purpose,
        'houseNumber' : visitor_visiting_house,
        'date' : current_date,
        'time' : current_time,
    }
    print(visitor_data['time'])

    visitor_collection.insert_one(visitor_data)
    
    try:
        otp = str(random.randint(1000,9999))
        print(visitor_visiting_house)
        
        resident_info = resident_collection.find_one({"houseNumber": visitor_visiting_house})
        if resident_info is not None:
            resident_phone = resident_info.get("phone")
            message = twilio_client.messages.create(
                body = f"{visitor_name} is waiting to visit you. If you are okay with that, share this {otp} with them.",
                from_ = TWILIO_PHONE_NUMBER,
                to = resident_phone,
            )
        print(resident_info)
        # resident_phone = resident_info['phone']
    except TwilioRestException as e:
        print(e)

    return jsonify({"message": "OTP sent successfully"},{"otp": otp}), 200

if __name__ == "__main__":
    app.run(debug=True)