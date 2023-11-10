from flask import (
    Flask, request, session, jsonify, render_template, redirect, url_for
)
import os
from decouple import config
from datetime import timedelta
from flask_cors import CORS
import psycopg2
from flask_babel import Babel, get_locale

app = Flask(__name__, template_folder="templates")
cors = CORS(app)

# Load database credentials and other configurations from the .env file
DATABASE_NAME = config('DATABASE_NAME')
DATABASE_USER = config('DATABASE_USER')
DATABASE_PASSWORD = config('DATABASE_PASSWORD')
DATABASE_HOST = config('DATABASE_HOST')
DATABASE_PORT = config('DATABASE_PORT')
SECRET_KEY = config('SECRET_KEY')

DATABASE_URL = os.environ.get("DATABASE_URL")
SECRET_KEY = config('SECRET_KEY')

app.config['SECRET_KEY'] = SECRET_KEY
app.permanent_session_lifetime = timedelta(days=5)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_PERMANENT'] = True
app.config['BABEL_DEFAULT_LOCALE'] = 'en'
app.config['BABEL_DEFAULT_TIMEZONE'] = 'UTC'

babel = Babel(app)


@babel.localeselector
def select_locale():
    return session.get('language', 'en')

@babel.timezoneselector
def select_timezone():
    return 'UTC'  # You can set a default timezone or determine it dynamically

# Pass the get_locale function to the template context
@app.context_processor
def inject_get_locale():
    return dict(get_locale=get_locale)
@app.template_filter('get_locale')
def get_locale_filter():
    return get_locale()
# Your locale and timezone selectors
@babel.localeselector
def get_locale():
    if 'language' in session:
        return session['language']
    return request.accept_languages.best_match(['en', 'es'])


@babel.timezoneselector
def get_timezone():
    return 'UTC'  # You can set a default timezone or determine it dynamically

# Import statements (existing imports)

@app.route('/', methods=['GET', 'POST'])
def intro():
    language = session.get('language', 'en')

    if request.method == 'POST':
        return redirect(url_for('user_info'))

    return render_template('intro.html', language=language)


@app.route('/user_info', methods=['GET', 'POST'])
def user_info():
    language = session.get('language', 'en')
    locale = get_locale()

    if "user_id" not in session:
        if request.method == "POST":
            age = request.form['age']
            gender = request.form['gender']
            hand = request.form['hand']
            device = request.form['device']

            # Ensure age is within the range of 0 to 99
            age = max(0, min(99, int(age)))
            conn = psycopg2.connect('DATABASE_URL')

            #conn = psycopg2.connect(
            #database=DATABASE_NAME,
            #user=DATABASE_USER,
            #password=DATABASE_PASSWORD,
            #host=DATABASE_HOST,
            #port=DATABASE_PORT
            #)
            cur = conn.cursor()

            cur.execute(
                """INSERT INTO user_info(age, gender, hand, touchscreen_device) VALUES(%s, %s, %s, %s)""",
                (age, gender, hand, device)
            )
            conn.commit()

            cur.execute("""SELECT * FROM user_info ORDER BY user_id DESC""")
            user_id = cur.fetchone()[0]
            conn.close()

            age = int(age)

            session['user_id'] = user_id
            session['age'] = age
            session['gender'] = gender
            session['hand'] = hand
            session['device'] = device

            return redirect(url_for("swipe_gesture"))
        return render_template('user_info.html', language=language, locale=locale)
    else:
        session.pop('user_id', None)
        return render_template('user_info.html', language=language, session=session, locale=locale)

@app.route('/change_language/<language>', methods=['GET'])
def change_language(language):
    if language == 'en' or language == 'es':
        session['locale'] = language
    return redirect(request.referrer)
@app.route('/swipe_gesture', methods=['GET', 'POST'])
def swipe_gesture():
    # Get the selected language from the session or set a default language
    language = session.get('language', 'en')

    if 'user_id' not in session:
        return redirect(url_for('user_info'))

    if request.method == 'POST':
        user_input = request.form['user_input']

        # Initialize default values for swipe gesture data
        left_to_right = 0.0
        right_to_left = 0.0
        scroll_up = 0.0
        scroll_down = 0.0
        zoom_in = 0.0
        zoom_out = 0.0
        swipe_width = 0.0
        swiping_repetitions_x_coordinate = 0.0
        swiping_repetitions_y_coordinate = 0.0
        total_number_of_clicks = 0.0
        x_coordinate_clicks = 0.0
        y_coordinate_clicks = 0.0
        total_time_taken = 0.0
        velocity = 0.0
        device_screen_width = 0.0
        max_swipe_speed = 0.0
        min_swipe_speed = 0.0
        finger_size = 0.0
        hand_movement = 0.0
        device_orientation = 0.0
        grasp = 0.0

        try:
            # Extract swipe gesture data from form fields
            # Extract and validate float fields
            left_to_right = float(request.form.get('left_to_right', 0.0))
            right_to_left = float(request.form.get('right_to_left', 0.0))
            scroll_up = float(request.form.get('scroll_up', 0.0))
            scroll_down = float(request.form.get('scroll_down', 0.0))
            zoom_in = float(request.form.get('zoom_in', 0.0))
            zoom_out = float(request.form.get('zoom_out', 0.0))
            swipe_width = float(request.form.get('swipe_width', 0.0))
            swiping_repetitions_x_coordinate = float(request.form.get('swiping_repetitions_x_coordinate', 0.0))
            swiping_repetitions_y_coordinate = float(request.form.get('swiping_repetitions_y_coordinate', 0.0))
            total_number_of_clicks = float(request.form.get('total_number_of_clicks', 0.0))
            x_coordinate_clicks = float(request.form.get('x_coordinate_clicks', 0.0))
            y_coordinate_clicks = float(request.form.get('y_coordinate_clicks', 0.0))
            total_time_taken = float(request.form.get('total_time_taken', 0.0))
            velocity = float(request.form.get('velocity', 0.0))
            device_screen_width = float(request.form.get('device_screen_width', 0.0))
            max_swipe_speed = float(request.form.get('max_swipe_speed', 0.0))
            min_swipe_speed = float(request.form.get('min_swipe_speed', 0.0))
            finger_size = float(request.form.get('finger_size', 0.0))
            hand_movement = float(request.form.get('hand_movement', 0.0))
            device_orientation = float(request.form.get('device_orientation', 0.0))
            grasp = float(request.form.get('grasp', 0.0))


        except ValueError:
            # Handle cases where form fields are not integers
            pass

        # Get the user_id from the session
        user_id = session['user_id']

        # Store the swipe gesture data in the database
        conn = psycopg2.connect('DATABASE_URL')
        #conn = psycopg2.connect(
           # database=DATABASE_NAME,
           # user=DATABASE_USER,
           # password=DATABASE_PASSWORD,
           # host=DATABASE_HOST,
           # port=DATABASE_PORT
        #)
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

        return redirect(url_for('thank_you'))  # Redirect to the "Thank you" page

    return render_template('swipe_gesture.html', language=language)



@app.route('/swipe_data', methods=['POST'])
def handle_swipe_data_real_time():
    try:
        print("Received a POST request at /swipe_data")  # Debugging statement

        # Access the form data from the request
        user_id = session.get('user_id')  # Assuming you have user_id in the session

        # Extract and validate float fields
        left_to_right = float(request.form.get('left_to_right', 0.0)) if request.form.get('left_to_right') else 0.0
        right_to_left = float(request.form.get('right_to_left', 0.0)) if request.form.get('right_to_left') else 0.0
        scroll_up = float(request.form.get('scroll_up', 0.0)) if request.form.get('scroll_up') else 0.0
        scroll_down = float(request.form.get('scroll_down', 0.0)) if request.form.get('scroll_down') else 0.0
        zoom_in = float(request.form.get('zoom_in', 0.0)) if request.form.get('zoom_in') else 0.0
        zoom_out = float(request.form.get('zoom_out', 0.0)) if request.form.get('zoom_out') else 0.0
        swipe_width = float(request.form.get('swipe_width', 0.0)) if request.form.get('swipe_width') else 0.0
        swiping_repetitions_x_coordinate = float(request.form.get('swiping_repetitions_x_coordinate', 0.0)) if request.form.get('swiping_repetitions_x_coordinate') else 0.0
        swiping_repetitions_y_coordinate = float(request.form.get('swiping_repetitions_y_coordinate', 0.0)) if request.form.get('swiping_repetitions_y_coordinate') else 0.0
        total_number_of_clicks = float(request.form.get('total_number_of_clicks', 0.0)) if request.form.get('total_number_of_clicks') else 0.0
        x_coordinate_clicks = float(request.form.get('x_coordinate_clicks', 0.0)) if request.form.get('x_coordinate_clicks') else 0.0
        y_coordinate_clicks = float(request.form.get('y_coordinate_clicks', 0.0)) if request.form.get('y_coordinate_clicks') else 0.0
        total_time_taken = float(request.form.get('total_time_taken', 0.0)) if request.form.get('total_time_taken') else 0.0
        velocity = float(request.form.get('velocity', 0.0)) if request.form.get('velocity') else 0.0
        device_screen_width = float(request.form.get('device_screen_width', 0.0)) if request.form.get('device_screen_width') else 0.0
        max_swipe_speed = float(request.form.get('max_swipe_speed', 0.0)) if request.form.get('max_swipe_speed') else 0.0
        min_swipe_speed = float(request.form.get('min_swipe_speed', 0.0)) if request.form.get('min_swipe_speed') else 0.0
        finger_size = float(request.form.get('finger_size', 0.0)) if request.form.get('finger_size') else 0.0
        hand_movement = float(request.form.get('hand_movement', 0.0)) if request.form.get('hand_movement') else 0.0
        device_orientation = float(request.form.get('device_orientation', 0.0)) if request.form.get('device_orientation') else 0.0
        grasp = float(request.form.get('grasp', 0.0)) if request.form.get('grasp') else 0.0

        # Now, you can perform database insertion or any other processing with the received data
        conn = psycopg2.connect('DATABASE_URL')
        #conn = psycopg2.connect(
            #database=DATABASE_NAME,
            #user=DATABASE_USER,
           # password=DATABASE_PASSWORD,
           # host=DATABASE_HOST,
           # port=DATABASE_PORT
        #)
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

        response_data = {'status': 'success', 'message': 'Data received and processed successfully.'}
        return jsonify(response_data)
    except Exception as e:
        print(f"Error processing swipe data: {str(e)}")
        response_data = {'status': 'error', 'message': 'Error processing swipe data.'}
        return jsonify(response_data), 500  # Return a 500 Internal Server Error status code

@app.route('/thank_you')
def thank_you():
    # Get the selected language from the session or set a default language
    language = session.get('language', 'en')

    return render_template('thank_you.html', language=language)

if __name__ == "__main__":
    app.run(debug=True, port=5000, use_reloader=False)
