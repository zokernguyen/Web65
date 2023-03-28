**TOC:**
- [1. Tips for nodeJS and ExpressJS.](#1-tips-for-nodejs-and-expressjs)
- [2. File operating with fs (File System)](#2-file-operating-with-fs-file-system)
- [3. CRUD with GET, PUT, POST \& DELETE](#3-crud-with-get-put-post--delete)
  - [3.1. 3.1 req.querry/req.params \& req.body](#31-31-reqquerryreqparams--reqbody)
- [3.2 HTTP response status codes:](#32-http-response-status-codes)
- [4. Middlewares](#4-middlewares)
- [5. SSR (Server side rendering) \& CSR (Client side rendering)](#5-ssr-server-side-rendering--csr-client-side-rendering)
- [6. Database with MongoDB](#6-database-with-mongodb)

-----

# 1. Tips for nodeJS and ExpressJS.

- npm init -y: instant package create without answering any package.json questions.
- package.json config:
  + "type": "module" = ES6 import/export syntax.
  + "start": "nodemon index.js" //use "npm start" command in terminal to run app with nodemon. Có thể sử dụng thêm flag --inspect để enable node debugger console. 
- localhost = 127.0.0.1 by default.

-----
# 2. File operating with fs (File System)


-----
# 3. CRUD with GET, PUT, POST & DELETE

## 3.1. 3.1 req.querry/req.params & req.body
- Thực chất, request method cũng chỉ là tên gọi bên ngoài, ta có thể viết logic bên trong để nó xử lý bất kỳ thao tác nào. Ví dụ, có thể chỉ cần sử dụng duy nhất method GET nhưng vẫn có thể thực hiện CRUD.

- **GET, DELETE method**: các bộ lọc/điều kiện được truyền qua req.querry và req.params để trả kết quả tương ứng cho client, còn req.body không hề chứa data nào ({}).

- **PUT, PATCH, POST method** - là các phương thức được gửi đến server để thay đổi DB bằng data tương ứng chứa trong req.body. Các request này cũng chứa thông tin về bộ lọc/điều kiện trong req.querry/req.params để xác định đối tượng nào trong DB sẽ được thay đổi.

*Hàm fetch() là một cách gửi request có phương thức mặc định là GET*

**Exp:**

    Cho data `user = {id: 1, name: "Zoker"}`

    PUT: /user/id=1&name=Tin

    + PUT là method để update 1 data có sẵn.
    + id=1 là req.querry để xác định (filter/identify) đối tượng cần update.
    + name=Tin là data được chứa trong req.body, dùng để update username hiện tại từ "Zoker" thành "Tin".

    POST /user/id=2&name=Tin

    + POST là method để thêm data mới vào DB.
    + cả id=2 và name=Tin đều được chứa trong req.body, là data sẽ được dùng để thêm mới vào DB hiện có.

_Khi truyền các querry và params vào method, cần gán chúng vào req.querry/req.params và req.body một cách phù hợp với method đó để có thể lọc ra đúng đối tượng cần thay đổi và thực hiện thao tác thay đổi._

**Exp:**

```
  "/user/:id?name=<...>"

  app.put('/users/:id', (req, res) => {

  const idToUpdate = req.params.id;
  //extract "id" param from URL, assign it to "idToUpdate" and add it into the req.params obj, use to filter/identify which data will be updated.

  const newName = req.body.name;
  //extract "name", assign it to "newName" and add it into the req.body obj, use as the data to update.

  // find the user with the given ID and update their name
  const user = users.find(user => user.id === parseInt(idToUpdate));
  if (user) {
      user.name = newName;
      res.status(200).send(user);
  } else {
      res.status(404).send('User not found');
  }
  });
```
 
 # 3.2 HTTP response status codes:

 See [Codes list](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
 
 -----
 # 4. Middlewares
 
 -----
 # 5. SSR (Server side rendering) & CSR (Client side rendering)

- Thuật ngữ chỉ nơi render code (html). Với các trang sử dụng cách thức SSR, server sẽ trả về toàn bộ code htlm cấu trúc và nội dung của trang web. Còn các trang CSR, server chỉ trả về code html dạng khung/template tối giản (hay thẻ div/main trống), sau đó browser phải đọc các file script, .js (ví dụ script FE viết bằng reactJS) để append nội dung chi tiết vào khung html để render ra trang web đầy đủ.

- SSR chứa đầy đủ nội dung trang sẽ hỗ trợ tốt hơn cho việc tối ưu search engine (SEO). Ngoài ra, lần truy cập (request) đầu tiên tới các trang SSR cũng có tốc độ nhanh hơn so với CSR (do chỉ cần đọc và render, so với đọc -> thực thi script JS -> rồi mới render), nhưng mỗi khi chuyển trang sẽ chậm hơn do phải load lại toàn bộ. Thời gian phát triển tổng thể của SSR cũng sẽ nhanh hơn với các ứng dụng, trang quy mô nhỏ/đơn giản.

- CSR sẽ đem đến UX mượt và nhanh hơn khi chuyển trang/tương tác, do việc render lại trang được thực hiện trên chính browser của client, nhưng truy cập lần đầu sẽ chậm hơn so với SSR.

-----
# 6. Database with MongoDB
