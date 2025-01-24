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


## dates
| Column       | Description                                  |
|------------- |--------------------------------------------- |
| `company_id`   | A unique ID for the company.                 |
| `date_joined` | The date that the company became a unicorn.  |
| `year_founded` | The year that the company was founded.       |

## funding
| Column           | Description                                  |
|----------------- |--------------------------------------------- |
| `company_id`       | A unique ID for the company.                 |
| `valuation`        | Company value in US dollars.                 |
| `funding`          | The amount of funding raised in US dollars.  |
| `select_investors` | A list of key investors in the company.      |

## industries
| Column       | Description                                  |
|------------- |--------------------------------------------- |
| `company_id`   | A unique ID for the company.                 |
| `industry`     | The industry that the company operates in.   |

## companies
| Column       | Description                                       |
|------------- |-------------------------------------------------- |
| `company_id`   | A unique ID for the company.                      |
| `company`      | The name of the company.                          |
| `city`         | The city where the company is headquartered.      |
| `country`      | The country where the company is headquartered.   |
| `continent`    | The continent where the company is headquartered. |

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
        EXTRACT(YEAR FROM d.date_joined) IN (2019, 2020, 2021)
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
        AVG(f.valuation) AS average_valuation_billions
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
    d.date_joined AS year, 
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

ATTEMPT 2:

I had a bunch of JOIN errors because i thought that if i joined a table with an CTE, i would have access to all the columns from both tables if I joined that CTE in another CTE. When a CTE (or subquery) involves aggregation, the rows are summarized, and only the columns explicitly selected and grouped are available in the CTE output.

I expected best_performing to Filter the dataset to include only the top industries (based on unicorn count in 2019–2021).
Act as a global filter for main query so that only rows belonging to these industries and the year range (2019–2021) would make it into the final query.
best_performing CTE only limits the industries, not the individual rows in the subsequent tables. The joins only limit the data to the industries in best_performing. They don’t restrict by year unless explicitly filtered.
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
        EXTRACT(YEAR FROM d.date_joined) IN (2019, 2020, 2021)
    GROUP BY
         industry
    ORDER BY 
        count_unicorns DESC
    LIMIT
        3
),
-- need to fix Join between best_performing and funding 
-- i didnt correctly calculate the average valuation, converted to billions of dollars and rounded to two decimal places'
-- I didnt include it in count_and_avg because its a non-aggregate and i dont want to group by it. 
-- I also realized that im asked to group by industry and year, so i might as well include it here as a non-aggregate. This simplifys so much!
-- SQL processes group by before select, so i cant reference alias in select for group by
SELECT
    bf.industry AS industry, 
    EXTRACT(YEAR FROM d.date_joined) AS year,
    COUNT(f.company_id) AS num_unicorns,
    ROUND(AVG(f.valuation)/ 1e9,2) AS average_valuation_billions
FROM
    best_performing AS bf
JOIN 
    industries as i ON i.industry = bf.industry
JOIN
    funding AS f ON f.company_id = i.company_id 
JOIN
    dates AS d ON d.company_id = f.company_id
WHERE 
    EXTRACT(YEAR FROM d.date_joined) IN (2019, 2020, 2021)
GROUP BY 
    bf.industry, 
    EXTRACT(YEAR FROM d.date_joined)
ORDER BY
    year DESC, 
    num_unicorns DESC;

```
