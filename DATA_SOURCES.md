# Dataset Availability

The CSV, TSV and Excel datasets used during these **guided machine-learning exercises** are not included in this public repository.

## Reproducing a notebook

1. Locate the original dataset from its publisher or course materials.
2. Check the dataset's licence and download terms.
3. Place the file in the directory and with the filename expected by that notebook (see its first Markdown cell and `pd.read_csv(...)` calls).
4. Run the notebook cells in sequence from that directory.

## Limitations

- The datasets were provided as part of local study materials. Their original source URLs and redistribution permissions have **not** been individually verified.
- Public availability of a dataset does not automatically grant permission to redistribute it.
- A dataset with the same filename may have different columns or rows. Reproducing the saved results therefore requires the corresponding original data and compatible library versions.
- The model artifact in `mlops/deploy_1/` is part of a course exercise; its runtime behaviour has not been independently verified here.

This document records the availability status; it is **not** a claim that the notebooks are fully reproducible without the original data.
