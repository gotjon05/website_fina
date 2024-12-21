---
title: Facts that Fuel Student Performance
platform: DataCamp
difficulty: Medium
tags:
  - Case Statements
  - 
  - 
category: SQL
---

## Factors that Fuel Student Performance ##

`1.`
Do more study hours and extracurricular activities lead to better scores? Analyze how studying more than 10 hours per week, while also participating in extracurricular activities, impacts exam performance.  
   The output should include two columns:`hours_studied`, `avg_exam_score`. Group and sort the results by `hours_studied` in descending order.

**Requirements**  
- Create an aggregate of `avg_exam_score` grouped by `hours_studied` 
- Filter by students who studied more than 10 hours per week and participate in extracurricular activities.

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
- To create ranges of hours studied, i need to create case statements	
- Aggregate of avg studied score by hours studied range


```sql
SELECT
	CASE WHEN hours_studied >= 1 AND hours_studied <= 5 THEN '1-5 hours'
	WHEN hours_studied >= 6 AND hours_studied <= 10 THEN '6-10 hours'
	WHEN hours_studied >= 11 AND hours_studied <= 15 THEN '11-15 hours'
	ELSE "16+ hours"
	END AS hours_studied_range,
		AVG(hours_studied) AS avg_exam_score
FROM
	student_performance
GROUP BY
	hours_studied_range

```
			
`3.`
A teacher wants to show their students their relative rank in the class, without revealing their exam scores to each other. Use a window function to assign ranks based on exam_score, ensuring that students with the same exam score share the same rank and no ranks are skipped. Return the columns attendance, hours_studied, sleep_hours, tutoring_sessions, and exam_rank. The students with the highest exam score should be at the top of the results, so order your query by exam_rank in ascending order. Limit your query to 30 students.





















