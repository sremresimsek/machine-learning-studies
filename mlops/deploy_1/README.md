# Diamond Price Prediction — Guided Deployment Exercise

This course-based example uses a trained **SVR model** to estimate diamond prices from nine tabular features, with a **FastAPI** backend and a small HTML/CSS/JavaScript front end. The project owner has tested the app locally; it remains **a learning exercise, not a production-grade pricing service**.

## Files

- `main.ipynb`: data filtering, categorical encoding, model training, evaluation and serialization.
- `diamonds.csv`: local study dataset required to rerun the training notebook; **not included in this repository** (see [`DATA_SOURCES.md`](../../DATA_SOURCES.md)).
- `diamond_model_complete.pkl`: pretrained model bundle used by the API.
- `app.py`, `templates/`, `static/`: FastAPI server and browser UI.
- `requirements.txt`: requirements originally specified for the web application.

## Run locally

Use a Python environment compatible with the pinned dependencies in `requirements.txt`.

```bash
cd mlops/deploy_1
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
python -m pip install -r requirements.txt
python -m uvicorn app:main --reload
```

Open <http://127.0.0.1:8000> for the UI, or <http://127.0.0.1:8000/docs> for the API docs.

Example prediction payload:

```json
{"carat":0.23,"cut":"Ideal","color":"E","clarity":"SI2","depth":61.5,"table":55,"x":3.95,"y":3.98,"z":2.43}
```

API call example:

```bash
curl -X POST http://127.0.0.1:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"carat":0.23,"cut":"Ideal","color":"E","clarity":"SI2","depth":61.5,"table":55,"x":3.95,"y":3.98,"z":2.43}'
```

> **Important:** Pickle files can execute arbitrary code when loaded. Load `diamond_model_complete.pkl` only if you trust its origin. This archive contains the model from the user's original local project; this package does not independently audit the model bytes.

## What changed during cleanup

The app now resolves assets and the pickle path relative to `app.py` instead of the shell's working directory. Unsupported categorical labels get a client error (HTTP 422) rather than an unhandled exception. The prediction is converted to a built-in Python float so that it serializes cleanly to JSON.

## Limitations

- The project owner reported successfully running and testing the FastAPI application locally in November 2026; no automated test suite or deployment verification is claimed.
- The numeric input range is currently validated in the HTML form; the API's Pydantic schema does not fully enforce domain constraints.
- Use the included training notebook to study how the model was created. Reported notebook metrics are historical educational outputs, not independent production validation.
- The training dataset is excluded from this public repository; its provenance and licence have not been independently verified. Model compatibility may vary with Python/scikit-learn versions.
