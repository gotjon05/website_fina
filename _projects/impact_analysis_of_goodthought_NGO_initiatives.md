---
title: Impact Analysis of GoodThought NGO Initiatives
platform: DataCamp
difficulty: Medium
tags:
  - R
  - dplyr
  - Data Manipulation
category: SQL
---

# Impact Analysis of GoodThought NGO Initiatives

---

## Task Overview

1. **List the top five assignments** based on the total value of donations, categorized by donor type.  
   - The output should include the following columns:
     1. `assignment_name`
     2. `region`
     3. `rounded_total_donation_amount` (rounded to two decimal places)
     4. `donor_type`
   - The results should be **sorted by `rounded_total_donation_amount` in descending order**.
   - Save the result as `highest_donation_assignments`.

---

## Key Requirements
- Sum of donations, rounded to 2 decimal places.
- Group by `donor_type`.
- Limit the output to the top 5 results, sorted in descending order.

---

## Pseudocode
1. Calculate t

