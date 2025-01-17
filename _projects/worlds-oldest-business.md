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

### 2. How many countries per continent lack data on the oldest businesses? Does including new_businesses change this? Count the number of countries per continent missing business data, including new_businesses; store the results in a DataFrame count_missing with columns continent and countries_without_businesses

The problem was confusing because i wasnt sure if the author wanted me to find countries per continent that lacked a relationship with buisness table or lacked oldest buisness. I will attempt both solutions.

Countries per Continent that lack a relationship with the buisness table:
-I will need to left merge to identify what exists in the country table and not in the buisness table 
-Group by continent to count by continent and use an aggregate function with a nonaggregate 
-count by country_code because each country has a country_code with a cooresponding country_code from the buisness table 

```sql
SELECT
    continent, COUNT(c.country_code) AS countries_without_businesses
FROM
    countries AS c
LEFT JOIN
    businesses AS b ON c.country_code = b.country_code
WHERE 
    year_founded IS NULL
GROUP BY
    continent
```

### 3. Which business categories are best suited to last many years, and on what continent are they? Store your answer in a DataFrame oldest_by_continent_category with the oldest founding year for each continent and category combination. It should contain three columns: continent, category, and year_founded, in that order.

I need to find the oldest founding year for each continent and category combination -- this sounds straightforward by grouping with continent and category and finding the min year

```sql
SELECT
    continent, 
    category, 
    min(year_founded) AS year_founded
FROM
    businesses AS b
JOIN
    countries AS c ON c.country_code = b.country_code
JOIN
    categories as ca ON b.category_code = ca.category_code
GROUP BY
    continent,
    category


```