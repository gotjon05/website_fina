---
title: Facts that Fuel Student Performance
platform: DataCamp
difficulty: Medium
tags:
  - 
  - 
  - 
category: SQL
---

`1.`
Do more study hours and extracurricular activities lead to better scores? Analyze how studying more than 10 hours per week, while also participating in extracurricular activities, impacts exam performance.  
   The output should include two columns:`hours_studied`, `avg_exam_score`. Group and sort the results by `hours_studied` in descending order.

   **Requirements:**  
   Create an aggregate of `avg_exam_score` grouped by `hours_studied` of students who studied more than 10 hours per week and participate in extracurricular activities.

   ```sql
   SELECT
           AVG(exam_score) AS avg_exam_score, 
           hours_studied
   FROM
           student_performance
   WHERE
           hours_studied > 10 AND extracurricular_activities = 'Yes'
   GROUP BY
           hours_studied
   ORDER BY
           hours_studied DESC;
```
`2.`
Is there a sweet spot for study hours? Explore how different ranges of study hours impact exam performance by calculating the average exam score for each study range. Categorize students into four groups based on hours studied per week: 1-5 hours, 6-10 hours, 11-15 hours, and 16+ hours. The output should contain two columns: 1) hours_studied_range and 2) avg_exam_score. Group the results by hours_studied_range and sort them by avg_exam_score in descending order. Save the query as avg_exam_score_by_hours_studied_range.

	**Requirements**
	



