# Machine Learning Studies

**Guided ML coursework & practical notebooks** · Python · pandas · NumPy · scikit-learn

This repository collects the machine-learning exercises I practiced while following a course. It covers regression, classification, tree-based ensembles, data preprocessing, evaluation and a small model-serving example.

**Scope and ownership:** These notebooks are **guided learning exercises**, not a collection of independently designed, production-ready ML projects. The code and historical results are preserved as learning material, with explanatory notes and targeted corrections. I use them to strengthen my understanding before developing independent end-to-end projects.

## Topics

| Area | Contents |
| --- | --- |
| Supervised learning | Linear/polynomial/logistic regression, KNN, SVM, decision trees |
| Ensembles | Random Forest, AdaBoost, Gradient Boosting, XGBoost, LightGBM |
| Regularization | Ridge, Lasso, ElasticNet |
| Preprocessing | Feature scaling, missing-data examples, encoding in modeling notebooks |
| Evaluation | Train/test split, confusion matrices, classification metrics, regression metrics, hyperparameter search |
| Model serving | [`mlops/deploy_1`](mlops/deploy_1/README.md): FastAPI diamond-price prediction demo |

## Study notebooks

The links below refer to the original folder names, retained to avoid breaking code paths. Each notebook starts with a brief description. To run the examples, open a notebook from its own folder so relative paths to data files resolve correctly.

### AdaBoost

- [`adaboost/classifier/main.ipynb`](adaboost/classifier/main.ipynb)
- [`adaboost/regressor/main.ipynb`](adaboost/regressor/main.ipynb)

### Decision Trees

- [`decision_trees/classifier/main.ipynb`](decision_trees/classifier/main.ipynb)
- [`decision_trees/regressor/main.ipynb`](decision_trees/regressor/main.ipynb)

### Gradient Boosting

- [`gradient_boosting/classifier/main.ipynb`](gradient_boosting/classifier/main.ipynb)
- [`gradient_boosting/regressor/main.ipynb`](gradient_boosting/regressor/main.ipynb)

### LightGBM

- [`lightgbm/classifier/main.ipynb`](lightgbm/classifier/main.ipynb)
- [`lightgbm/regressor/main.ipynb`](lightgbm/regressor/main.ipynb)

### Linear Regression

- [`lineer_regression/mpg_linear_regression/mpg_lr.ipynb`](lineer_regression/mpg_linear_regression/mpg_lr.ipynb)
- [`lineer_regression/multiple_grades/multiple_linear_regression.ipynb`](lineer_regression/multiple_grades/multiple_linear_regression.ipynb)
- [`lineer_regression/study_score/simple_linear_regression.ipynb`](lineer_regression/study_score/simple_linear_regression.ipynb)
- [`lineer_regression/tips_linear_regression/size_linear_regression.ipynb`](lineer_regression/tips_linear_regression/size_linear_regression.ipynb)
- [`lineer_regression/tips_linear_regression/tips_multiple_linear_regression.ipynb`](lineer_regression/tips_linear_regression/tips_multiple_linear_regression.ipynb)

### Logistic Regression / KNN / SVM

- [`logistic_regression/ibm_hr_analytic_employee_attrition&performance/KNN/KNNClassifier/main.ipynb`](logistic_regression/ibm_hr_analytic_employee_attrition&performance/KNN/KNNClassifier/main.ipynb)
- [`logistic_regression/ibm_hr_analytic_employee_attrition&performance/KNN/KNNRegressor/main.ipynb`](logistic_regression/ibm_hr_analytic_employee_attrition&performance/KNN/KNNRegressor/main.ipynb)
- [`logistic_regression/ibm_hr_analytic_employee_attrition&performance/logistic_regression.ipynb`](logistic_regression/ibm_hr_analytic_employee_attrition&performance/logistic_regression.ipynb)
- [`logistic_regression/ibm_hr_analytic_employee_attrition&performance/support_vector_machine.ipynb`](logistic_regression/ibm_hr_analytic_employee_attrition&performance/support_vector_machine.ipynb)
- [`logistic_regression/logistic_regression_advanced/logistic_reg_advanced.ipynb`](logistic_regression/logistic_regression_advanced/logistic_reg_advanced.ipynb)
- [`logistic_regression/logistic_regression_intro/logistic_reg_intro.ipynb`](logistic_regression/logistic_regression_intro/logistic_reg_intro.ipynb)
- [`logistic_regression/logistic_regression_multiclass/logistic_reg_multiclass.ipynb`](logistic_regression/logistic_regression_multiclass/logistic_reg_multiclass.ipynb)

### ML deployment

- [`mlops/deploy_1/main.ipynb`](mlops/deploy_1/main.ipynb)

### Polynomial Regression

- [`polynomial_regression/diamonds_polynomial_regression/diamonds_pl.ipynb`](polynomial_regression/diamonds_polynomial_regression/diamonds_pl.ipynb)
- [`polynomial_regression/mpg_polynomial_regression/mpg_pl.ipynb`](polynomial_regression/mpg_polynomial_regression/mpg_pl.ipynb)
- [`polynomial_regression/polynomial_regression_study/study.ipynb`](polynomial_regression/polynomial_regression_study/study.ipynb)

### Random Forest

- [`random_forest/classifier/main.ipynb`](random_forest/classifier/main.ipynb)
- [`random_forest/regressor/main.ipynb`](random_forest/regressor/main.ipynb)

### Ridge, Lasso & ElasticNet

- [`ridge_lasso_elasticnet/ridge_lasso_elasticnet.ipynb`](ridge_lasso_elasticnet/ridge_lasso_elasticnet.ipynb)

### Scaling methods

- [`scaler_differences/scaler_differences.ipynb`](scaler_differences/scaler_differences.ipynb)

### Applied data studies

- [`stuides/online_retail/main.ipynb`](stuides/online_retail/main.ipynb)
- [`stuides/telco_customer_churn/main.ipynb`](stuides/telco_customer_churn/main.ipynb)

### Vehicle data analysis

- [`vehicle_dataset/main.ipynb`](vehicle_dataset/main.ipynb)

### XGBoost

- [`xgboost/classifier/main.ipynb`](xgboost/classifier/main.ipynb)
- [`xgboost/regressor/main.ipynb`](xgboost/regressor/main.ipynb)

## Getting started

1. Create and activate a Python virtual environment (Python 3.11/3.12 may be a practical starting point, but exact compatibility is **not guaranteed**).
2. Install the main notebook dependencies: `python -m pip install -r requirements-notebooks.txt`.
3. Open Jupyter: `python -m jupyter notebook`.
4. Navigate into the desired notebook's directory and run cells in order. Some notebooks may need additional adjustments depending on installed package versions.
5. To run the FastAPI example, follow [`mlops/deploy_1/README.md`](mlops/deploy_1/README.md).

### Data and reproducibility

- Some saved notebook outputs are **historical**, and were not all regenerated. Evaluation cells with corrected metric argument order have their old outputs cleared.
- The unfinished `mlops/deploy_2` has intentionally been excluded.
- This cleanup does not establish independent test-set validity or remove all possible data leakage in the original exercises.
- Dataset files are excluded from this repository. To reproduce the notebooks, download the corresponding datasets separately and place them in the expected directories.
