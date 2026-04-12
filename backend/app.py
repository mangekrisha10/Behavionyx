def extract_features(key_times):
    if len(key_times) < 2:
        return [0, 0]

    intervals = np.diff(key_times)

    if len(intervals) == 0:
        return [0, 0]

    return [float(np.mean(intervals)), float(np.std(intervals))]


@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.json

        if not data or 'keyTimes' not in data:
            return jsonify({"prediction": 0, "risk": 50})

        key_times = data['keyTimes']

        features = extract_features(key_times)

        prediction = model.predict([features])[0]
        prob = model.predict_proba([features])[0][1]

        risk = int((1 - prob) * 100)

        return jsonify({
            "prediction": int(prediction),
            "risk": risk
        })

    except Exception as e:
        print("🔥 ERROR:", e)
        return jsonify({
            "prediction": 0,
            "risk": 50
        })