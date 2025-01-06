---
title: Uncovering World’s Oldest Business
platform: DataCamp
difficulty: Medium
tags:
  - Joining Tables
  - CTE
  - 
category: SQL
---

## Uncovering World’s Oldest Business ##
`1.` 
What is the oldest business on each continent? Save your query as a DataFrame oldest_business_continent with 
four columns: continent, country, business, and year_founded in any order.

## Requirements ##
- Aggregate of the oldest business by continent

## Pseudocode ##
Objective: I need to create aggregate view of continent, country, business based on MIN of year_founded

1. Need to JOIN businesses and countries table to get all the required columns
2. I need to Group by continent to see each min(year_founded) per continent 

Attempt 1: I forgot that all non-aggregate columns need to be included in group by clause. Since i only want to group
 by continent, i will need to find the oldest continent in a subquery to keep the original column requirements in the main query. 

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

## Alternative solution using Subquery instead of CTE ## 

With three required non-aggregate column: (c.country,b.business), i need to find the aggregate seperately in a subquery

Step 1: I need to get data from countries and buisnesses table 
Step 2: I derive the MIN year founded per continent in JOIN subquery. And use Join match year_founded and continent with main query


```sql
SELECT
    c.continent,
    c.country,
    b.business,
    b.year_founded
FROM  
    businesses AS b
JOIN
    countries AS c
    ON c.country_code = b.country_code
JOIN (
    SELECT
        c1.continent,
        MIN(b1.year_founded) AS min_year_founded

    FROM  
        businesses AS b1
    JOIN
        countries AS c1
        ON c1.country_code = b1.country_code
    GROUP BY
        c1.continent

) AS tmp ON b.year_founded = tmp.min_year_founded
         AND c.continent = tmp.continent
```


`2.` 
How many countries per continent lack data on the oldest businesses? Does including new_businesses change this? Count the number of countries per continent missing business data, including new_businesses; store the results in a DataFrame count_missing with columns continent and countries_without_businesses.

## Requirements ##
- Per Continent, count countries missing business data
- Required columns: continent and countries_without_business
- Group by continent since im finding the aggregate count 

Attempt 1: I got not results when i tried this with businesses and new_businesses

```sql
SELECT
    continent, COUNT(*) AS countries_without_business
FROM  
    businesses AS b
JOIN
    countries AS c
    ON c.country_code = b.country_code
HAVING
    MIN(business) IS NULL
GROUP BY
    continent
```

Attempt 2:
I made the mistake of using INNER JOIN instead of OUTER JOIN. Since im counting missing buisness data, i want to include all buisness data, even if it doesnt have a match with the countries table. When i use inner join, it gave me no missing buisness data since it matched only what existed between buisness and countries table.

Using MIN() is NULL in my filter has some very funky rules that dont give me the result i need.   

```sql
SELECT
    continent, COUNT(*) AS countries_without_business
FROM  
    businesses AS b
JOIN
    countries AS c
    ON c.country_code = b.country_code
HAVING
    MIN(business) IS NULL
GROUP BY
    continent
```