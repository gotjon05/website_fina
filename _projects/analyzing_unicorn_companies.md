---
title: Analyzing Unicorn Companies
platform: DataCamp
difficulty: Hard
tags:
  - 
category: SQL
---


Your task is to first identify the three best-performing industries based on the number of new unicorns created in 2019, 2020, and 2021 combined.
From those industries (1), you will need to find the number of unicorns within these industries (2), the year that they became a unicorn (3), and their average valuation, converted to billions of dollars and rounded to two decimal places (4).With the above information you can then finish your query to return a table containing industry, year, num_unicorns, and average_valuation_billions. For readability, the firm have asked you to sort your results by year and number of unicorns, both in descending order.

Requirements
-Required columns: industry, year, num_unicorns, and average_valuation_billions
-three best-performing industries based on the number of new unicorns created in 2019, 2020, and 2021 combined
-Of the three best-performing industries - number of unicorns within these industries (2), the year that they became a unicorn (3), and their average valuation, converted to billions of dollars and rounded to two decimal places
-sort your results by year and number of unicorns, both in descending order.

Steps:
-Going to create a best_performing cte that identifies the three best performing industries and use it as a filter for main query
-in the main query, i will have the fields: industry, year, num_unicorns, and average_valuation_billions and sort accordingly 



```sql
-- industry filter for main query -- will JOIN industry field 
WITH best_performing AS (
    SELECT 
        industry, COUNT(i.company_id) AS count_unicorns
    FROM
        industries as i
    JOIN
        dates AS d ON d.company_id = i.company_id 
    WHERE
        EXTRACT(YEAR FROM d.year_founded) IN (2019, 2020, 2021)
    GROUP BY
         industry
    ORDER BY 
        count_unicorns DESC
    LIMIT
        3
),

-- Ive created a filter for only industries of interest. i'm left with two non aggregate columns and the aggregate columns COUNT and AVG. I need to have a seperate cte so i can group by industry only for COUNT AND AVG. i DONT want to group by time 
count_and_avg AS (
    SELECT
        bf.industry, 
        COUNT(f.company_id) AS num_unicorns,
        AVG(f.funding) AS average_valuation_billions
    FROM
        best_performing AS bf
    JOIN
        funding AS f ON f.industry = bf.industry 
    GROUP BY 
        bf.industry
),

-- Now i need to put everything together. Everything is accounted for except year which i will retrieve from date

SELECT
    count_and_avg.industry, 
    d.year_founded AS year, 
    count_and_avg.num_unicorns, 
    count_and_avg.average_valuation_billions
FROM 
    count_and_avg
JOIN
    dates AS d ON d.company_id = count_and_avg.company_id
ORDER BY
    year DESC, 
    num_unicorns DESC;

```

ATTEMPT 2: My approach was correct. But 


```sql
WITH best_performing AS (
    SELECT 
        industry, COUNT(i.company_id) AS count_unicorns
    FROM
        industries as i
    JOIN
        dates AS d ON d.company_id = i.company_id 
    WHERE
        EXTRACT(YEAR FROM d.year_founded) IN (2019, 2020, 2021)
    GROUP BY
         industry
    ORDER BY 
        count_unicorns DESC
    LIMIT
        3
),

count_and_avg AS (
    SELECT
        bf.industry, 
        COUNT(f.company_id) AS num_unicorns,
        AVG(f.funding) AS average_valuation_billions
    FROM
        best_performing AS bf
    JOIN
        funding AS f ON f.industry = bf.industry 
    GROUP BY 
        bf.industry
),

SELECT
    count_and_avg.industry, 
    d.year_founded AS year, 
    count_and_avg.num_unicorns, 
    count_and_avg.average_valuation_billions
FROM 
    count_and_avg
JOIN
    dates AS d ON d.company_id = count_and_avg.company_id
ORDER BY
    year DESC, 
    num_unicorns DESC;

```