from flask import Flask, render_template, jsonify
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

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
