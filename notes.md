**TOC:**

- [1. Tips for nodeJS and ExpressJS.](#1-tips-for-nodejs-and-expressjs)
- [2. File operating with fs (File System)](#2-file-operating-with-fs-file-system)
- [3. CRUD with GET, PUT, POST \& DELETE](#3-crud-with-get-put-post--delete)
  - [3.1. req.querry/req.params \& req.body](#31-reqquerryreqparams--reqbody)
  - [3.2. HTTP response status codes:](#32-http-response-status-codes)
- [4. Middlewares](#4-middlewares)
- [5. Authentication and Authorization with JWT](#5-authentication-and-authorization-with-jwt)
  - [5.1. Authentication](#51-authentication)
- [6. SSR (Server side rendering) \& CSR (Client side rendering)](#6-ssr-server-side-rendering--csr-client-side-rendering)
- [7. Database with MongoDB](#7-database-with-mongodb)

---

# 1. Tips for nodeJS and ExpressJS.

- npm init -y: instant package create without answering any package.json questions.

- package.json config:
  + "type": "module" = ES6 import/export syntax.
   
  + "start": "nodemon index.js" //use "npm start" command in terminal to run app with nodemon. Có thể sử dụng thêm flag --inspect để enable node debugger console.

- localhost = 127.0.0.1 by default.

---

# 2. File operating with fs (File System)

- Thư viện fs cho phép thao tác đọc/ghi trực tiếp đến file dữ liệu. Do đó khi sử dụng các method writeFile, cần lưu ý thêm flag -a (append: ghi thêm) để tránh ghi đè dữ liệu cũ.

- Có thể sử dụng kèm thư viện path để việc khai báo đường dẫn dễ dàng hơn.

---

# 3. CRUD with GET, PUT, POST & DELETE

## 3.1. req.querry/req.params & req.body

- Thực chất, tên gọi của request method cũng chỉ mang tính chất hình thức. Ta có thể viết logic bên trong để nó xử lý bất kỳ thao tác nào. Ví dụ, có thể chỉ cần sử dụng duy nhất method GET nhưng vẫn có thể thực hiện CRUD.

- **GET, DELETE method**: các bộ lọc/điều kiện được truyền qua req.querry và req.params để trả kết quả tương ứng cho client, còn req.body không chứa data nào.

- **PUT, PATCH, POST method**: là các phương thức được gửi đến server để thay đổi DB bằng data tương ứng chứa trong req.body. Các request này cũng chứa thông tin về bộ lọc/điều kiện trong req.querry/req.params để xác định đối tượng nào trong DB sẽ được thay đổi.

_Hàm fetch() là một cách gửi request có phương thức mặc định là GET_

**Exp:**

  Cho data `user = {id: 1, name: "Zoker"}`

  >PUT: /user/id=1&name=Tin

  + PUT là method để update 1 data có sẵn.
  
  + id=1 là req.querry để xác định (filter/identify) đối tượng cần update.
  
  + name=Tin là data được chứa trong req.body, dùng để update username hiện tại từ "Zoker" thành "Tin".

  >POST /user/id=2&name=Tin

  + POST là method để thêm data mới vào DB.
  
  + Cả id=2 và name=Tin đều được chứa trong req.body, là data sẽ được dùng để thêm mới vào DB hiện có.

_Khi truyền các querry và params vào method, cần gán chúng vào
req.querry/req.params và req.body một cách phù hợp với method đó để có thể lọc ra đúng đối tượng cần thay đổi và thực hiện thao tác thay đổi._

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

## 3.2. HTTP response status codes:

- Là code để thông báo trạng thái xử lý request, được gửi trả về clients trong res.headers.

See [Codes list](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

---

# 4. Middlewares

- Là các chương trình con đứng giữa quá trình lấy và gửi dữ liệu về cho client, thường dùng để thực hiện một logic lặp đi lặp lại trong các request, hoặc phổ biến hơn là để xác thực người dùng.

---

# 5. Authentication and Authorization with JWT

[See Docs here.](https://jwt.io/)

- Mô hình web hiện đại có thể bao gồm nhiều server hoạt động cùng lúc để cung cấp các micro-service khác nhau, khiến phương thức session authorization không còn hiệu quả. Bởi vì với mỗi req, load-balancer chỉ điều hướng req đó đến 1 server duy nhất để xử lý và thông tin người dùng cũng chỉ được lưu trữ tại server này. Khi có một req mới cần được xử lý tại server khác, cần phải chuyển thông tin người dùng từ server trước đó sang để có thể xử lý req mới (bằng cách nhập lại thông tin người dùng một cách thủ công, hoặc phải viết các logic phức tap để chia sẽ thông tin này giữa các server). Vấn đề này sẽ được giải quyết nhờ JWT.

## 5.1. Authentication

**- Flow:**

1. Khi người dùng đăng nhập, server xác thực xem tài khoản có khớp với dữ liệu người dùng (username, pasword, ... đã đăng ký) từ DB hay không. Nếu hợp lệ, server sẽ cấp cho client một token để xác nhận rằng client có quyền truy cập (bán vé vào cửa). Token này được tạo ra bằng cách mã hóa dữ liệu được kết hợp từ **(thông tin người dùng + secret key + các option mã hóa)**.

  >`jxt.sign(userPayload, SECRET_KEY, encodeOptions);`

2. Khi đã đăng nhập thành công và được cấp token, với mỗi request gửi đi sau đó, client cần đính kèm theo token này trong req.headers (muốn sử dụng dịch vụ thì phải trình vé). Server sẽ tiến hành decode token, nếu hợp lệ thì request sẽ được xử lý.

  >`jwt.verify();'

- Token cần được bảo mật tuyệt đối. Để tăng khả năng bảo mật, có thể set expiration duration cho token.

- Mặc định, 'Authorization' chính là trường trong Header để client đính kèm token khi gửi request. Khi dùng `jwt.verify()` để decode token, ta sẽ nhận lại được toàn bộ data đã dùng để mã hóa thành token để sử dụng cho những mục đích khác (như dịch mã token, lấy id người dùng để lọc data, ...). Trường này thường có định dạng là một bearer string: 

 >'Bearer <YOUR_TOKEN>'
  [See more here.](https://www.rfc-editor.org/rfc/rfc6750)

- Cách lấy token và lưu token từ front-end? fetch(), axios, cookies.

# 6. SSR (Server side rendering) & CSR (Client side rendering)

- Thuật ngữ chỉ nơi render code (html). Với các trang sử dụng cách thức SSR, server sẽ trả về toàn bộ code htlm cấu trúc và nội dung của trang web. Còn các trang CSR, server chỉ trả về code html dạng khung/template tối giản (hay thẻ div/main trống), sau đó browser phải đọc các file script, .js (ví dụ script FE viết bằng reactJS) để append nội dung chi tiết vào khung html để render ra trang web đầy đủ.

- SSR chứa đầy đủ nội dung trang sẽ hỗ trợ tốt hơn cho việc tối ưu search engine (SEO). Ngoài ra, lần truy cập (request) đầu tiên tới các trang SSR cũng có tốc độ nhanh hơn so với CSR (do chỉ cần đọc và render, so với đọc -> thực thi script JS -> rồi mới render), nhưng mỗi khi chuyển trang sẽ chậm hơn do phải load lại toàn bộ. Thời gian phát triển tổng thể của SSR cũng sẽ nhanh hơn với các ứng dụng, trang quy mô nhỏ/đơn giản.

- CSR sẽ đem đến UX mượt và nhanh hơn khi chuyển trang/tương tác, do việc render lại trang được thực hiện trên chính browser của client, nhưng truy cập lần đầu sẽ chậm hơn so với SSR.

---

# 7. Database with MongoDB

- Là một dạng document, NoSQL và open-source database.
- 