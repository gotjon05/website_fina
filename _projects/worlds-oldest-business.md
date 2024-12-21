---
title: Uncovering World’s Oldest Business
platform: DataCamp
difficulty: Medium
tags:
  - 
  - 
  - 
category: SQL
---

## Uncovering World’s Oldest Business ##
`1.` 
What is the oldest business on each continent? Save your query as a DataFrame oldest_business_continent with four columns: continent, country, business, and year_founded in any order.

## Requirements ##
- Aggregate of the oldest business by continent

## Pseudocode ##
Objective: I need to create aggregate view of continent, country, business based on MIN of year_founded

1. Need to JOIN businesses and countries table to get all the required columns
2. I need to Group by continent to see each min(year_founded) per continent 

Attempt 1: I forgot that all non-aggregate columns need to be included in group by clause. Since i only want to group by continent, i will need to find the oldest continent in a subquery to keep the original column requirements in the main query. 

```sql
SELECT
    c.continent,
    MIN(b.year_founded)
FROM
    businesses AS b
JOIN
    countries AS c
    ON c.country_code = b. country_code
GROUP BY
    c.continent
```

SOLUTION: I can create a CTE to find oldest continent or a subquery 

1. I need to create a CTE that will allow me to group by only continent, so i will include only year_founded and continent columns. 
2. JOIN the CTE with the main table which will only keep min(year_founded) rows to match with the CTE

```sql
USING oldest_cont AS (
SELECT
    c.continent,
    MIN(b.year_founded) AS min_year
FROM
    businesses AS b
JOIN
    countries AS c
    ON c.country_code = b. country_code
GROUP BY
    c.continent

)

SELECT
    c.continent,
    c.country,
    b.business,
    b.year_founded
FROM
    businesses AS b
JOIN
    countries AS c
    ON c.country_code = b. country_code
JOIN
    oldest_cont AS oldest
    ON oldest.continent = b.continent AND oldest.min_year = b.year_founded
```