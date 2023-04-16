- [1. Tips for nodeJS and ExpressJS.](#1-tips-for-nodejs-and-expressjs)
- [2. File operating with fs(File System)](#2-file-operating-with-fsfile-system)
- [3. CRUD with GET, PUT, POST \& DELETE](#3-crud-with-get-put-post--delete)
- [3.1. req object, req.query, req.params \& req.body](#31-req-object-reqquery-reqparams--reqbody)
- [3.2. Sử dụng req.params/req.query và req.body để gửi thông tin yêu cầu](#32-sử-dụng-reqparamsreqquery-và-reqbody-để-gửi-thông-tin-yêu-cầu)
- [3.3. HTTP response status codes:](#33-http-response-status-codes)
- [4. Middlewares](#4-middlewares)
- [5. Authentication and Authorization with JWT](#5-authentication-and-authorization-with-jwt)
- [5.1. Authentication](#51-authentication)
- [5.2 Authorization (phân quyền)](#52-authorization-phân-quyền)
- [5.3 Refresh access token.](#53-refresh-access-token)
- [6. SSR (Server side rendering) \& CSR (Client side rendering)](#6-ssr-server-side-rendering--csr-client-side-rendering)
- [7.1. MongoDB 101](#71-mongodb-101)
- [7.2 Filter data - MongoDB operators](#72-filter-data---mongodb-operators)
- [7.3 CRUD with MongoDB:](#73-crud-with-mongodb)
- [8. NextJS](#8-nextjs)
- [Important](#important)

---

# 1. Tips for nodeJS and ExpressJS.

- npm init - y: instant package create without answering any package.json questions.

- package.json config:

  + "type": "module" = ES6 import /export syntax.
  
  + "start": "nodemon index.js" //use "npm start" command in terminal to run app with nodemon. Có thể sử dụng thêm flag --inspect để enable node debugger console.

- localhost = 127.0.0.1 by default.

- Lỗi ERR_HTTP_HEADERS_SENT: do gửi đi quá nhiều status khác nhau trong headers, fix bằng cách thêm return vào trước res. khi chack điều kiện logic.

---

# 2. File operating with fs(File System)

- Thư viện fs cho phép thao tác đọc / ghi trực tiếp đến file dữ liệu.Do đó khi sử dụng các method writeFile, cần lưu ý thêm flag - a(append: ghi thêm) để tránh ghi đè dữ liệu cũ.

- Có thể sử dụng kèm thư viện path để việc khai báo đường dẫn dễ dàng hơn.

---

# 3. CRUD with GET, PUT, POST & DELETE

# 3.1. req object, req.query, req.params & req.body

- Mỗi yêu cầu gửi đi sẽ có 1 req object, chứa thông tin và dữ liệu của yêu cầu để server xử lý.

>Exp in Code:
    req = {
    method: 'GET',
    url: '/user/123?name=john',
    headers: {
      accept: 'application/json',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36'
    },
    params: {
      id: '123'
    },
    query: {
      name: 'john'
    },
    body: {
      // request body data (e.g., JSON payload or form data)
    },
    cookies: {
      // cookies sent with the request
    },
    signedCookies: {
      // signed cookies sent with the request
    },
    protocol: 'http',
    secure: false,
    ip: '127.0.0.1',
    path: '/user/123',
    hostname: 'localhost',
    app: {
    // reference to the Express.js app object
    }
    // other properties and methods depending on the middleware and configuration used
    }

# 3.2. Sử dụng req.params/req.query và req.body để gửi thông tin yêu cầu

- **GET, DELETE method**: các bộ lọc / điều kiện được truyền qua req.query và req.params để trả kết quả tương ứng cho client, còn req.body không chứa data nào.

- **PUT, PATCH, POST method**: là các phương thức được gửi đến server để thay đổi DB bằng data tương ứng chứa trong req.body.Các request này cũng chứa thông tin về bộ lọc / điều kiện trong req.query / req.params để xác định đối tượng nào trong DB sẽ được thay đổi.

_Thực chất, tên gọi của request method cũng chỉ mang tính chất hình thức.Ta có thể viết logic bên trong để nó xử lý bất kỳ thao tác nào. Ta hoàn toàn có thể sử dụng duy nhất method GET để thực hiện các thao tác CRUD._

_Hàm fetch() là một cách gửi request có phương thức mặc định là GET_

  >Exp:

  _Cho data`user = {id: 1, name: "Zoker"}`_

  > PUT: .../user/id=1&name=Tin (using query)

  + PUT là method để update 1 data có sẵn.
  + id=1 là req.query để xác định(filter / identify) đối tượng cần update.
  + name=Tin là data được chứa trong req.body, dùng để update username hiện tại từ "Zoker" thành "Tin".

  > POST: .../user/id=2&name=Tin (using query)

  + POST là method để thêm data mới vào DB.
  + Cả id = 2 và name = Tin đều được chứa trong req.body, là data sẽ được dùng để thêm mới vào DB hiện có.

- Khi truyền các query và params vào method, cần gán chúng vào
req.query / req.params và req.body một cách phù hợp với method đó để có thể lọc ra đúng đối tượng cần thay đổi và thực hiện thao tác thay đổi.

>Exp in code:

    ".../user/:id?name=<...>"

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

# 3.3. HTTP response status codes:

- Là code để thông báo trạng thái xử lý request, được gửi trả về clients trong res.headers.

  See[Codes list](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

---

# 4. Middlewares

  - Là các chương trình con đứng giữa quá trình lấy và gửi dữ liệu về cho client, thường dùng để thực hiện một logic lặp đi lặp lại trong các request, hoặc phổ biến hơn là để xác thực người dùng.

---

# 5. Authentication and Authorization with JWT

[See Docs here.](https://jwt.io/)

- Mô hình web hiện đại có thể bao gồm nhiều server hoạt động cùng lúc để cung cấp các micro - service khác nhau, khiến phương thức session authorization không còn hiệu quả.Bởi vì với mỗi req, load - balancer chỉ điều hướng req đó đến 1 server duy nhất để xử lý và thông tin người dùng cũng chỉ được lưu trữ tại server này.Khi có một req mới cần được xử lý tại server khác, cần phải chuyển thông tin người dùng từ server trước đó sang để có thể xử lý req mới(bằng cách nhập lại thông tin người dùng một cách thủ công, hoặc phải viết các logic phức tap để chia sẽ thông tin này giữa các server). Vấn đề này sẽ được giải quyết nhờ JWT.

# 5.1. Authentication

  **Flow:**

1. Khi người dùng đăng nhập, server xác thực xem tài khoản có khớp với dữ liệu người dùng(username, pasword, ...đã đăng ký) từ DB hay không.Nếu hợp lệ, server sẽ cấp cho client một token để xác nhận rằng client có quyền truy cập(bán vé vào cửa).Token này được tạo ra bằng cách mã hóa dữ liệu được kết hợp từ ** (thông tin người dùng + secret key + các option mã hóa)**.

  > `jxt.sign(userPayload, SECRET_KEY, encodeOptions);`

2. Khi đã đăng nhập thành công và được cấp token, với mỗi request gửi đi sau đó, client cần đính kèm theo token này trong req.headers(muốn sử dụng dịch vụ thì phải trình vé).Server sẽ tiến hành decode token, nếu hợp lệ thì request sẽ được xử lý.

  > `jwt.verify();'

- Token cần được bảo mật tuyệt đối. Để tăng khả năng bảo mật, có thể set expiration duration cho token.
- Mặc định, 'Authorization' chính là trường dữ liệu trong Header mà client dùng để đính kèm token khi gửi request. Khi dùng `jwt.verify()` để decode token, ta sẽ nhận lại được toàn bộ data đã dùng để mã hóa thành token để sử dụng cho những mục đích khác (như dịch mã token, lấy id người dùng để lọc data, ...). Trường này thường có định dạng là một bearer string: 

 >'Bearer <YOUR_TOKEN>'
 [See more here.](https://www.rfc-editor.org/rfc/rfc6750)

- Cách lấy token và lưu token từ front-end? fetch(), axios, cookies.

# 5.2 Authorization (phân quyền)

- Vì payload dùng để tạo ra token hoàn toàn do dev định nghĩa, ta có thể kèm theo thông tin về role (admin/basic user/permission level...) vào token. Ở các request có liên quan đến phân quyền (vd: chỉnh sửa, xóa thông tin, profile của user), có thể verify token và trích xuất ra thông tin về role của người thực hiện request, từ đó có thể cấp quyền/từ chối thao tác đó

# 5.3 Refresh access token.

- Thông thường để tăng tính bảo mật, access token chỉ tồn tại trong thời gian rất ngắn, và user sẽ phải liên tục cung cấp access token mới trong quá trình tương tác với ứng dụng. Nếu việc xác thực người dùng chỉ phụ thược duy nhất vào access token, cũng đồng nghĩa với việc user sẽ phải liên tục đăng nhập lại để lấy được token mới. Vấn đề này sẽ được giải quyết khi sử dụng thêm refresh token.

- Refresh token cũng được tạo ra dựa trên thông tin xác thực của người dùng (user payload), nhưng được combine cùng 1 secret key khác và có thời gian tồn tại lâu hơn hẳn so với access token. Mỗi khi access token hết hạn, ứng dụng sẽ verify refresh token để lấy ra user payload và dùng chúng để sign một access token mới. Với access token mới này, user có thể tiếp tục thao tác trên ứng dụng mà không phải đăng nhập lại. Như vậy, refresh token có đến 2 nhiệm vụ: kiểm tra xem ai là người đang muốn làm mới token (bằng cách verify refresh token để đối chiếu xem user payload trong refresh token có giống với user payload của access token đang dùng hay không) và sau đó dùng payload hợp lệ để tạo token mới.

_Cùng với access token mới, một refresh token mới cũng sẽ được tạo ra để đảm bảo tối đa tính bảo mật (các token xác thực liên tục bị thay đổi). Nghĩa là, thời gian tồn tại kéo dài của refresh token có ý nghĩa về mặt kỹ thuật là nhằm đảm bảo luôn có một khóa xác thực có hiệu lực để người dùng thao tác với ứng dụng; còn trong quá trình sử dụng nó sẽ luôn thay đổi cùng với access token. Ví dụ: user có thể đăng nhập và thoải mái sử dụng ứng dụng trong một phiên làm việc kéo dài nhiều giờ là nhờ refresh token liên tục tạo lại access token mới. Ở phiên làm việc tiếp theo cách đó nhiều ngày (khi access token cũ đã hết hạn từ lâu), nếu refresh token vẫn chưa hết hạn, nó ngay lập tức tạo được một access token mới để user sử dụng ứng dụng mà không phải đăng nhập lại_

- Có thể sử dụng kết hợp nhiều cách thức để tăng thêm tính bảo mật cho refresh token, ví dụ lưu nó vào HTTPOnly Cookies, Redis, Redux store...

---

# 6. SSR (Server side rendering) & CSR (Client side rendering)

- Thuật ngữ chỉ nơi render code (html). Với các trang sử dụng cách thức SSR, server sẽ trả về toàn bộ code htlm cấu trúc và nội dung của trang web. Còn các trang CSR, server chỉ trả về code html dạng khung/template tối giản (hay thẻ div/main trống), sau đó browser phải đọc các file script, .js (ví dụ script FE viết bằng reactJS) để append nội dung chi tiết vào khung html để render ra trang web đầy đủ.

- SSR chứa đầy đủ nội dung trang sẽ hỗ trợ tốt hơn cho việc tối ưu search engine (SEO). Ngoài ra, lần truy cập (request) đầu tiên tới các trang SSR cũng có tốc độ nhanh hơn so với CSR (do chỉ cần đọc và render, so với đọc -> thực thi script JS -> rồi mới render), nhưng mỗi khi chuyển trang sẽ chậm hơn do phải load lại toàn bộ. Thời gian phát triển tổng thể của SSR cũng sẽ nhanh hơn với các ứng dụng, trang quy mô nhỏ/đơn giản.

- CSR sẽ đem đến UX mượt và nhanh hơn khi chuyển trang/tương tác, do việc render lại trang được thực hiện trên chính browser của client, nhưng truy cập lần đầu sẽ chậm hơn so với SSR.

---

# 7.1. MongoDB 101

- Là một dạng document, NoSQL và open-source database.

- SQL database: Database dạng bảng (Excel hoặc sheets).

  + Primary Key - khóa chính.

  + Foreign key - khóa ngoại (nội dung của một trường dữ liệu), để tham chiếu dữ liệu giữa các bảng => tính quan hệ của Relationship Database Manage System/ RDBMS.

- Cấu trúc dữ liệu của Mongo:

  + Table => Colection | Column => Field | Row => Document (object/JSON)

  + SQl chỉ cho phép lưu 1 giá trị duy nhất với mỗi ô dữ liệu (lưu theo chiều ngang); còn với document của Mongo, dữ liệu có thể được lưu một cách tự do, không bị ràng buộc bởi id hay phải đáp ứng số trường dữ liệu như kiểu bảng của SQL, miễn sao nó có format là 1 object JS (lưu theo chiều dọc) => Hệ csdl phi quan hệ.

# 7.2 Filter data - MongoDB operators

- Các toán tử của Mongo được bắt đầu bằng ký tự '$'.

- Cần đặt toán tử so sánh vào 1 cặp {}
  >vd: {qty: {$gt: 3}} => lọc các doc có qty > 3.

- Toán tử liên quan tới lọc phần tử trong mảng:
  >{ $expr: { $eq: [ { $arrayElemAt: [ "$grades.score", 0 ] }, 3 ] } }

# 7.3 CRUD with MongoDB:

- Để sử dụng constructer ObjectId, cần từ khóa "new".

---

# 8. NextJS

-CSS module: file css cần được đặt tên theo dạng <...>.module.css, cần được import dưới dạng biến vào component và được sử dụng như một cặp key-value trong object.
# Important

App development progress

- Setup server,
- Define routes/router with mock data,
- Handle error cases,
- Config + connect to DB to actually handle errors.