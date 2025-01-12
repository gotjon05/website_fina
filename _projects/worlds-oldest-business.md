---
title: Uncovering World’s Oldest Business
platform: DataCamp
difficulty: Medium
tags:
  - Joining Tables
  - CTE
category: SQL
---

# Uncovering World’s Oldest Business
### 1. What is the oldest business on each continent? Save your query as a DataFrame oldest_business_continent with four columns: continent, country, business, and year_founded in any order.

I need to find the aggregate minimum of year, grouped by continent with the required columns: continent, country, business, and year_founded 

Since I only want to calculate the minimum year (year_founded) grouped by continent and also need to keep the non-aggregate columns (country and business), I will first calculate the minimum year_founded for each continent using a CTE. I will then use the results of the CTE as a filter in the main query, matching on both continent and year_founded, to retrieve the continent, country, business, and year_founded for each continent's oldest business.

```sql
WITH year_min AS (
SELECT      
    c.continent, 
    MIN(b.year_founded) AS min_year
FROM
    businesses AS b
JOIN
    countries AS c ON c.country_code = b.country_code
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
    countries AS c ON c.country_code = b.country_code
JOIN
    year_min ON c.continent = year_min.continent AND
    b.year_founded = year_min.min_year;
```

### 2. How many countries per continent lack data on the oldest businesses? Does including new_businesses change this? Count the number of countries per continent missing business data, including new_businesses; store the results in a DataFrame count_missing with columns continent and countries_without_businesses.
Requirements
1. count oldest_buisness per continent from the countries table
2. lack new_buisness data from the buisness or new_buisness table. 



Some countries may only have data in the businesses table. Others may only have data in the new_businesses table.

Steps i need to take:
1. Identify 

```


```