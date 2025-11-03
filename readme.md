# 🏨 ỨNG DỤNG ĐẶT PHÒNG KHÁCH SẠN – HOTEL BOOKING APP

---

## 1. Giới thiệu tổng quan

**Hotel Booking App** là ứng dụng di động giúp người dùng tìm kiếm, so sánh và đặt phòng khách sạn nhanh chóng, tiện lợi.
Ứng dụng được thiết kế theo hướng đa nền tảng (Android/iOS), cung cấp trải nghiệm trực quan, giao diện thân thiện và hệ thống quản lý đặt phòng hiện đại.

Với Hotel Booking App, người dùng có thể:
Dễ dàng tìm kiếm khách sạn theo vị trí, giá cả, tiện ích.
Đặt phòng và hủy phòng linh hoạt.
Xem bản đồ, định vị khách sạn.
Đánh giá, nhận xét, và xem phản hồi từ người khác.
Nhận thông báo nhắc nhở hoặc khuyến mãi.

---

## 2. Mục tiêu dự án

Mục tiêu của nhóm là xây dựng một ứng dụng đặt phòng khách sạn hiện đại và thông minh, giúp người dùng có thể tìm – chọn – đặt phòng – thanh toán trong cùng một nền tảng duy nhất.

Mục tiêu cụ thể:

* **Tìm kiếm & lọc khách sạn:** Cho phép người dùng tìm khách sạn theo tên, vị trí, mức giá, tiện ích, hoặc đánh giá.

* **Đặt phòng và thanh toán:** Cung cấp quy trình đặt phòng đơn giản, kèm xác nhận tức thì.

* **Hủy phòng linh hoạt:** Hỗ trợ hủy và cập nhật tình trạng phòng.

* **Đánh giá & nhận xét:** Cho phép người dùng viết review và xem đánh giá từ khách hàng khác.

* **Thông báo & nhắc nhở:** Cập nhật khuyến mãi, nhắc lịch check-in/check-out, hoặc thay đổi đặt phòng.

* **Tích hợp bản đồ & định vị:** Hiển thị vị trí khách sạn gần người dùng thông qua GPS.

## 3. Đối tượng sử dụng

Ứng dụng hướng đến:

* Người dùng có nhu cầu đặt phòng khách sạn, homestay, resort trong nước hoặc quốc tế.
* Độ tuổi từ 18 – 45, có điện thoại thông minh.
* Người thích du lịch, công tác, phượt, hoặc thuê phòng ngắn hạn.
* Các chủ khách sạn nhỏ muốn quản lý thông tin phòng, đặt chỗ, đánh giá dễ dàng.

---

## 4. Công nghệ sử dụng

Dự án sử dụng ngăn xếp công nghệ hiện đại, dễ mở rộng và triển khai thực tế:

* **Frontend**: React Native + TypeScript (Expo CLI)
* **Backend**: NestJS
* **Database**: MongoDB Atlas
* JWT Authentication – Xác thực và bảo mật tài khoản người dùng.
* Bản đồ & định vị: expo-location, react-native-maps

## 5. Các chức năng cốt lõi
### 5.1. Đăng nhập và bảo mật
* Đăng ký tài khoản: Bằng email và mật khẩu.
* Đăng nhập: Qua JWT Token, lưu trữ trên AsyncStorage.
* Phân quyền: Người dùng (User) và Quản trị viên (Admin).
* Bảo mật: Mã hóa mật khẩu (bcrypt), xác thực JWT trên mọi request.

### 5.2. Tìm kiếm và xem danh sách khách sạn
* Danh sách khách sạn: Lấy dữ liệu từ API NestJS.
* Lọc & tìm kiếm: Theo vị trí, giá phòng, xếp hạng, tiện ích,...
* Xem chi tiết: Hiển thị mô tả, ảnh, giá, tiện ích, bản đồ vị trí.

### 5.3. Đặt và hủy phòng
* Đặt phòng: Người dùng chọn ngày check-in/check-out, số lượng khách và loại phòng.
* Xác nhận đặt: Nhận thông tin đặt phòng và mã giao dịch.
* Hủy phòng: Cho phép hủy trong thời hạn quy định, cập nhật trạng thái booking.
* Lịch sử đặt phòng: Hiển thị danh sách các booking đã thực hiện.

### 5.4. Đánh giá và nhận xét
* Viết đánh giá: Gửi nhận xét và chấm điểm (1–5 sao).
* Xem đánh giá: Tổng hợp các review từ người dùng khác.
* Thống kê đánh giá: Trung bình sao, số lượt đánh giá.

### 5.5. Thông báo và nhắc nhở
* Thông báo đẩy (Push Notification): Nhắc lịch check-in/check-out, hoặc thông tin ưu đãi.
* Tùy chọn bật/tắt thông báo: Người dùng chủ động quản lý thông báo.
* Thông báo nội bộ (In-App): Hiển thị khi có thay đổi đặt phòng hoặc review mới.

### 5.6. Tích hợp bản đồ và định vị
* Định vị GPS: Lấy vị trí hiện tại của người dùng.
* Hiển thị khách sạn gần nhất: Dựa trên bán kính tìm kiếm.
* Xem vị trí khách sạn trên bản đồ: Mở Google Map hoặc bản đồ trong app.

### 6. Phân quyền người dùng
Hệ thống có hai loại tài khoản chính:

🧑‍💼 Admin
* Quản lý danh sách khách sạn, phòng, đánh giá.
* Duyệt hoặc xóa các đánh giá vi phạm.
* Theo dõi tổng số booking và người dùng.

👤 User
* Tìm kiếm, đặt phòng, hủy phòng.
* Viết nhận xét, đánh giá.
* Nhận thông báo, quản lý tài khoản cá nhân.