from flask import Flask, render_template, jsonify
import json
import datetime

app = Flask(__name__)

@app.route('/')
def index():
    # Load events from events.json
    with open('events.json', 'r', encoding='utf-8') as f:
        events_data = json.load(f)

    # Calculate the number of days until December 1st
    today = datetime.datetime.now().date()

    december_1 = datetime.date(today.year, 12, 1)
    days_until_december_1 = (december_1 - today).days

    # Filter out national holidays
    working_day_events = [event["start"] for event in events_data if "color" not in event and datetime.datetime.strptime(event["start"], "%Y-%m-%d").date() >= today]


    num_working_days = len(working_day_events) #- len(national_holidays)

    return render_template('index.html', num_working_days=num_working_days)

@app.route('/events')
def events():
    with open('events.json', 'r', encoding='utf-8') as f:
        events_data = json.load(f)
    
    num_events = len(events_data)  
    
    response = {
        'num_events': num_events,
        'events': events_data 
    }
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
