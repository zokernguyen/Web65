1. Truy vấn tất cả những nhà hàng:
> {}

2. Truy vấn tất cả các nhà hàng có zipcode là 11209: 
> {"address.zipcode":"11209"}

3. Truy vấn tất cả những nhà hàng chuyên về ẩm thực Mỹ:
> {cuisine: "American "}

4. Truy vấn tất cả các nhà hàng nằm ở quận Brooklyn: 
> {borough: "Brooklyn"}

5. Truy vấn tất cả các nhà hàng nằm ở quận Manhattan: 
> {borough: "Manhattan"}

6. Truy vấn tất cả nhà hàng về gà ở quận Manhattan: 
> {borough: "Manhattan", cuisine: "Chicken"}
 
7. Truy vấn tất cả nhà hàng nằm ở trên phố Wall Street: 
> {"address.street": "Wall Street"}

8.  Truy vấn tất cả những nhà hàng có trên 3 đánh giá: 
> {$expr: {$gt: [{$size: "$grades"}, 3]}}    
    $expr: cho phép sử dụng biểu thức để so sánh
    $size: kích thước (ở đây là chiều dài mảng)

9. Truy vấn tất cả những nhà hàng có đánh giá với số điểm loại B:
> {"grades.grade": "B"}

10.  Truy vấn tất cả những nhà hàng có đánh giá với số điểm trên 10:
> {"grades.score": {$gt: 10}}