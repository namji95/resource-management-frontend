SELECT *
FROM OrderDetails as od
JOIN Products as pd ON od.ProductId = pd.ProductId;
where productID = "12312309"
and qty > 5
and seq in (select seq from orderDetails )
Group by OrderSeq having crdate > date('2022-01-01')
limit 10, 100;

SELECT *
FROM OrderDetails as od
JOIN Products as pd ON od.ProductId = pd.ProductId;


https://www.w3schools.com/sql/trysql.asp?filename=trysql_select_all

이게 정규화

