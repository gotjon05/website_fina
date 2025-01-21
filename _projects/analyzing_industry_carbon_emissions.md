---
title: Analyzing Industry Carbon Emissions
platform: DataCamp
difficulty: Easy
tags:
  - 
category: SQL
---

Using the product_emissions table, find the number of unique companies and their total carbon footprint PCF for each industry group, filtering for the most recent year in the database. The query should return three columns: industry_group, num_companies, and total_industry_footprint, with the last column being rounded to one decimal place. The results should be sorted by total_industry_footprint from highest to lowest values.

Requirements
-number of unique companies
-total carbon footprint PCF for each industry group for unique companies
-filtering for the most recent year 
-sorted by total_industry_footprint from highest to lowest values


Steps
count companies
Sum of carbon foot profit
I need to group by industry group
filter for distinct companies -- HAVING DISTINCT companies


Attempt 1:  HAVING is used to filter using aggregate functions and DISTINCT is not an aggregate function 

```sql
SELECT
    industry_group, 
    COUNT(*) AS num_companies,
    ROUND(SUM(carbon_footprint_pcf),1) AS total_industry_footprint
FROM
    product_emissions
GROUP BY
    industry_group
HAVING
    DISTINCT company
ORDER BY
    total_industry_footprint DESC
```

Attempt 2: 
HAVING clause requires a boolean expression -- didnt know this
And this didnt work either, i needed to use a subquery in the boolean expression
```sql
SELECT
    industry_group, 
    COUNT(DISTINCT company) AS num_companies,
    SUM(carbon_footprint_pcf) AS total_industry_footprint
FROM
    product_emissions   
GROUP BY
    industry_group
HAVING
     MAX(year) = MAX(year)
ORDER BY
    total_industry_footprint DESC
```

SOLUTION 

I had to use a subquery

```sql
SELECT
    industry_group, 
    COUNT(DISTINCT company) AS num_companies,
    ROUND(SUM(carbon_footprint_pcf),1) AS total_industry_footprint
FROM
    product_emissions
WHERE
    year = (SELECT MAX(year) FROM product_emissions)
GROUP BY
    industry_group
ORDER BY
    total_industry_footprint DESC
```