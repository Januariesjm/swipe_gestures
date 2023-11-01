import json
import datetime
import os
from decouple import config
from datetime import timedelta
from flask_babel import Babel
import psycopg2
from flask import (Flask, request, session, url_for, redirect, render_template)

app = Flask(__name__, template_folder="templates")

DATABASE_NAME = config('DATABASE_NAME')
DATABASE_USER = config('DATABASE_USER')
DATABASE_PASSWORD = config('DATABASE_PASSWORD')
DATABASE_HOST = config('DATABASE_HOST')
DATABASE_PORT = config('DATABASE_PORT')
SECRET_KEY = config('SECRET_KEY')

app.config['SECRET_KEY'] = SECRET_KEY 
app.permanent_session_lifetime = timedelta(days=5)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_PERMANENT'] = True
app.config['BABEL_DEFAULT_LOCALE'] = 'en'

babel = Babel(app)
LANG = 'en'

@app.route('/user_info', methods=['GET', 'POST'])
def user_info():
    if "user_id" in session:
        return redirect(url_for("/user_info"))  # Redirect to the home page if the user is already logged in

    if request.method == "POST":
        age = request.form['age']
        gender = request.form['gender']
        hand = request.form['hand']
        device = request.form['device']

        # Store user data into the database
        conn = psycopg2.connect(
            database=DATABASE_NAME,
            user=DATABASE_USER,
            password=DATABASE_PASSWORD,
            host=DATABASE_HOST,
            port=DATABASE_PORT
        )
        cur = conn.cursor()

        cur.execute("""INSERT INTO user_info(age, gender, hand, touchscreen_device) VALUES(%s, %s, %s, %s)""",
                    (age, gender, hand, device))
        conn.commit()

        # Get the last saved user_id and pass it to the session
        cur.execute("""SELECT * FROM user_info ORDER BY user_id DESC""")
        user_id = cur.fetchone()[0]
        conn.close()

        age = int(age)

        session['user_id'] = user_id
        session['age'] = age
        session['gender'] = gender
        session['hand'] = hand
        session['device'] = device

        return redirect(url_for("swipe_gesture"))  # Redirect to the swipe_gesture page

    return render_template('user_info.html', language=LANG, session = session)



@app.route('/swipe_gesture', methods=['GET', 'POST'])
def swipe_gesture():
    if 'user_id' not in session:
        return redirect(url_for('user_info'))

    if request.method == 'POST':
        user_input = request.form['user_input']

        # Initialize default values for swipe gesture data
        left_to_right = 0
        right_to_left = 0
        scroll_up = 0
        scroll_down = 0
        zoom_in = 0
        zoom_out = 0
        swipe_width = 0
        swiping_repetitions_x_coordinate = 0
        swiping_repetitions_y_coordinate = 0
        total_number_of_clicks = 0
        x_coordinate_clicks = 0
        y_coordinate_clicks = 0
        total_time_taken = 0
        velocity = 0
        device_screen_width = 0
        max_swipe_speed = 0
        min_swipe_speed = 0
        finger_size = 0
        hand_movement = ''
        device_orientation = ''
        grasp = ''

        try:
            # Extract swipe gesture data from form fields
            left_to_right = int(request.form.get('left_to_right', 0))
            right_to_left = int(request.form.get('right_to_left', 0))
            scroll_up = int(request.form.get('scroll_up', 0))
            scroll_down = int(request.form.get('scroll_down', 0))
            zoom_in = int(request.form.get('zoom_in', 0))
            zoom_out = int(request.form.get('zoom_out', 0))
            swipe_width = int(request.form.get('swipe_width', 0))
            swiping_repetitions_x_coordinate = int(request.form.get('swiping_repetitions_x_coordinate', 0))
            swiping_repetitions_y_coordinate = int(request.form.get('swiping_repetitions_y_coordinate', 0))
            total_number_of_clicks = int(request.form.get('total_number_of_clicks', 0))
            x_coordinate_clicks = int(request.form.get('x_coordinate_clicks', 0))
            y_coordinate_clicks = int(request.form.get('y_coordinate_clicks', 0))
            total_time_taken = int(request.form.get('total_time_taken', 0))
            velocity = int(request.form.get('velocity', 0))
            device_screen_width = int(request.form.get('device_screen_width', 0))
            max_swipe_speed = int(request.form.get('max_swipe_speed', 0))
            min_swipe_speed = int(request.form.get('min_swipe_speed', 0))
            finger_size = int(request.form.get('finger_size', 0))
            hand_movement = request.form.get('hand_movement', '')
            device_orientation = request.form.get('device_orientation', '')
            grasp = request.form.get('grasp', '')
        except ValueError:
            # Handle cases where form fields are not integers

        # Get the user_id from the session
          user_id = session['user_id']

        # Store the swipe gesture data in the database
        conn = psycopg2.connect(
                database=DATABASE_NAME,
                user=DATABASE_USER,
                password=DATABASE_PASSWORD,
                host=DATABASE_HOST,
                port=DATABASE_PORT
        )
        cur = conn.cursor()

        cur.execute("""
            INSERT INTO swipe_gesture_data (
                user_id, left_to_right, right_to_left, scroll_up, scroll_down, zoom_in, zoom_out, swipe_width,
                swiping_repetitions_x_coordinate, swiping_repetitions_y_coordinate, total_number_of_clicks,
                x_coordinate_clicks, y_coordinate_clicks, total_time_taken, velocity, device_screen_width,
                max_swipe_speed, min_swipe_speed, finger_size, hand_movement, device_orientation, grasp
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            user_id, left_to_right, right_to_left, scroll_up, scroll_down, zoom_in, zoom_out, swipe_width,
            swiping_repetitions_x_coordinate, swiping_repetitions_y_coordinate, total_number_of_clicks,
            x_coordinate_clicks, y_coordinate_clicks, total_time_taken, velocity, device_screen_width,
            max_swipe_speed, min_swipe_speed, finger_size, hand_movement, device_orientation, grasp
        ))

        conn.commit()
        conn.close()

        return redirect(url_for('swipe_gesture'))  # Redirect back to the same page for the next image

    return render_template('swipe_gesture.html')


@app.route('/swipe_data', methods=['POST'])
def handle_swipe_data():
    print("Received a POST request at /swipe_data")  # Debugging statement

    data = request.get_json()
    print(data)  # Debugging statement

    # Your data processing code here

    return "Data received and processed successfully."

@app.route('/thank_you')
def thank_you():
    return render_template('thank_you.html')

 #if __name__ == "__main__":
    #app.run(debug=True, port=5000, use_reloader=False)
