# Hướng dẫn sử dụng Markdown cho Bác sĩ

## Tổng quan

Markdown là một ngôn ngữ đánh dấu văn bản đơn giản giúp bạn tạo ra những bài viết đẹp và có cấu trúc. Đặc biệt hữu ích cho việc viết các bài viết y khoa chuyên nghiệp.

## 📚 Mục lục

1. [Cú pháp cơ bản](#cú-pháp-cơ-bản)
2. [Định dạng văn bản](#định-dạng-văn-bản)
3. [Danh sách và liệt kê](#danh-sách-và-liệt-kê)
4. [Liên kết và hình ảnh](#liên-kết-và-hình-ảnh)
5. [Bảng biểu](#bảng-biểu)
6. [Trích dẫn và ghi chú](#trích-dẫn-và-ghi-chú)
7. [Code và công thức](#code-và-công-thức)
8. [Mẹo cho bài viết y khoa](#mẹo-cho-bài-viết-y-khoa)
9. [Template mẫu](#template-mẫu)

---

## Cú pháp cơ bản

### Tiêu đề

```markdown
# Tiêu đề cấp 1 (Tiêu đề chính)
## Tiêu đề cấp 2 (Phần lớn)
### Tiêu đề cấp 3 (Phần nhỏ)
#### Tiêu đề cấp 4 (Chi tiết)
```

**Kết quả:**
# Tiêu đề cấp 1
## Tiêu đề cấp 2
### Tiêu đề cấp 3

---

## Định dạng văn bản

### In đậm, in nghiêng

```markdown
**Văn bản in đậm** - dùng cho từ khóa quan trọng
*Văn bản in nghiêng* - dùng cho thuật ngữ y học
***Vừa đậm vừa nghiêng*** - dùng cho điều đặc biệt quan trọng
~~Văn bản gạch ngang~~ - dùng cho thông tin đã lỗi thời
<u>Văn bản gạch chân</u> - dùng để nhấn mạnh
```

**Kết quả:**
- **Văn bản in đậm**
- *Văn bản in nghiêng*
- ***Vừa đậm vừa nghiêng***
- ~~Văn bản gạch ngang~~

### Ví dụ y khoa:

```markdown
**HIV** (*Human Immunodeficiency Virus*) là một loại ***retrovirus*** 
gây ra hội chứng suy giảm miễn dịch mắc phải (**AIDS**).
```

---

## Danh sách và liệt kê

### Danh sách không thứ tự

```markdown
- Triệu chứng giai đoạn cấp tính:
  - Sốt cao
  - Đau đầu
  - Phát ban da
  - Sưng hạch bạch huyết
- Triệu chứng giai đoạn mãn tính:
  - Sụt cân không rõ nguyên nhân
  - Mệt mỏi kéo dài
  - Nhiễm trùng cơ hội
```

### Danh sách có thứ tự

```markdown
1. **Giai đoạn 1:** Nhiễm HIV cấp tính (2-4 tuần)
2. **Giai đoạn 2:** Nhiễm HIV mãn tính không triệu chứng (2-10 năm)
3. **Giai đoạn 3:** AIDS (CD4 < 200 cells/μL)
```

### Checklist (danh sách có thể tích)

```markdown
#### Checklist theo dõi bệnh nhân:
- [x] Xét nghiệm CD4
- [x] Xét nghiệm Viral Load
- [ ] Tư vấn tuân thủ điều trị
- [ ] Đánh giá tác dụng phụ
- [ ] Lên lịch hẹn tái khám
```

---

## Liên kết và hình ảnh

### Liên kết

```markdown
Tham khảo thêm tại [Bộ Y tế](https://moh.gov.vn)
Xem hướng dẫn WHO tại [đây](https://www.who.int/hiv)

Hoặc hiển thị URL trực tiếp: https://moh.gov.vn
```

### Hình ảnh

```markdown
![Mô tả hình ảnh](URL-hình-ảnh)

Ví dụ:
![Sơ đồ tác động HIV](https://example.com/hiv-diagram.png)
```

---

## Bảng biểu

### Bảng cơ bản

```markdown
| Thuốc | Liều lượng | Tần suất | Thời gian uống |
|-------|------------|----------|----------------|
| Efavirenz | 600mg | 1 lần/ngày | Trước khi ngủ |
| Tenofovir | 300mg | 1 lần/ngày | Cùng thức ăn |
| Emtricitabine | 200mg | 1 lần/ngày | Bất kỳ lúc nào |
```

### Bảng chỉ số xét nghiệm

```markdown
| Chỉ số | Giá trị bình thường | Ý nghĩa | Ghi chú |
|--------|-------------------|---------|---------|
| CD4 | > 500 cells/μL | Miễn dịch tốt | Theo dõi 6 tháng/lần |
| Viral Load | < 50 copies/mL | Không phát hiện | Mục tiêu điều trị |
| Hemoglobin | 12-16 g/dL | Không thiếu máu | Theo dõi tác dụng phụ |
```

---

## Trích dẫn và ghi chú

### Trích dẫn quan trọng

```markdown
> **⚠️ Lưu ý quan trọng:**
> Không được tự ý ngừng thuốc ARV. Việc ngừng thuốc có thể 
> dẫn đến kháng thuốc và tiến triển nhanh của bệnh.

> **📋 Ghi nhớ:**
> "Undetectable = Untransmittable" - Khi viral load không 
> phát hiện được, nguy cơ lây truyền sẽ bằng 0.
```

### Cảnh báo đặc biệt

```markdown
> **🚨 CẢNH BÁO:**
> - Thuốc Efavirenz có thể gây ảo giác, mơ mộng lạ
> - Khuyến cáo uống trước khi ngủ
> - Tránh lái xe trong 4 tuần đầu điều trị
```

---

## Code và công thức

### Tên thuốc và liều lượng

```markdown
Phác đồ điều trị: `TDF/FTC/EFV`
Liều lượng: `Tenofovir 300mg + Emtricitabine 200mg + Efavirenz 600mg`
```

### Kết quả xét nghiệm

```markdown
Kết quả xét nghiệm:
```
Họ tên: Nguyễn Văn A
Ngày sinh: 01/01/1990
Ngày xét nghiệm: 15/12/2024

- CD4 Count: 350 cells/μL (↑ so với lần trước: 280)
- Viral Load: < 50 copies/mL (Undetectable)
- Hemoglobin: 13.2 g/dL (Bình thường)
```
```

### Công thức tính

```markdown
Liều thuốc theo cân nặng:
```
Công thức: Liều (mg) = Cân nặng (kg) × 15mg/kg
Ví dụ: Bệnh nhân 60kg → Liều = 60 × 15 = 900mg/ngày
```
```

---

## Mẹo cho bài viết y khoa

### 1. Cấu trúc bài viết chuẩn

```markdown
# Tiêu đề bài viết

## Tóm tắt
Mô tả ngắn gọn nội dung chính...

## Mục lục
1. [Định nghĩa](#định-nghĩa)
2. [Nguyên nhân](#nguyên-nhân)
3. [Triệu chứng](#triệu-chứng)
4. [Chẩn đoán](#chẩn-đoán)
5. [Điều trị](#điều-trị)
6. [Phòng ngừa](#phòng-ngừa)

## Nội dung chính
...

## Kết luận
...

## Tài liệu tham khảo
...
```

### 2. Sử dụng biểu tượng (Emoji)

```markdown
⚠️ Cảnh báo
📋 Ghi chú
💊 Thuốc
🔬 Xét nghiệm
📊 Thống kê
✅ Khuyến nghị
❌ Không nên
📞 Liên hệ khẩn cấp
```

### 3. Màu sắc và highlight

```markdown
- **🔴 Mức độ cao:** CD4 < 200 cells/μL
- **🟡 Mức độ trung bình:** CD4 200-500 cells/μL  
- **🟢 Mức độ bình thường:** CD4 > 500 cells/μL
```

---

## Template mẫu

### Template 1: Bài viết tổng quan về bệnh

```markdown
# [Tên bệnh]: Hướng dẫn toàn diện

## 📋 Tóm tắt
**[Tên bệnh]** là...

## 🎯 Mục tiêu bài viết
Sau khi đọc bài viết này, độc giả sẽ hiểu được:
- Định nghĩa và nguyên nhân của [tên bệnh]
- Các triệu chứng đặc trưng
- Phương pháp chẩn đoán hiện đại
- Các lựa chọn điều trị hiệu quả

## 📚 Mục lục
1. [Định nghĩa](#định-nghĩa)
2. [Dịch tễ học](#dịch-tễ-học)
3. [Nguyên nhân](#nguyên-nhân)
4. [Cơ chế bệnh sinh](#cơ-chế-bệnh-sinh)
5. [Triệu chứng lâm sàng](#triệu-chứng-lâm-sàng)
6. [Chẩn đoán](#chẩn-đoán)
7. [Điều trị](#điều-trị)
8. [Tiên lượng](#tiên-lượng)
9. [Phòng ngừa](#phòng-ngừa)

## 1. Định nghĩa {#định-nghĩa}
**[Tên bệnh]** là...

### Phân loại
- **Loại 1:** ...
- **Loại 2:** ...

## 2. Dịch tễ học {#dịch-tễ-học}
| Đặc điểm | Thống kê |
|----------|----------|
| Tỷ lệ mắc | ... |
| Độ tuổi hay gặp | ... |
| Tỷ lệ nam/nữ | ... |

## 3. Nguyên nhân {#nguyên-nhân}
### Nguyên nhân chính:
1. **Nguyên nhân A:** ...
2. **Nguyên nhân B:** ...

### Yếu tố nguy cơ:
- Yếu tố di truyền
- Yếu tố môi trường
- Yếu tố lối sống

## 4. Triệu chứng lâm sàng {#triệu-chứng-lâm-sàng}
### Triệu chứng sớm:
- Triệu chứng 1
- Triệu chứng 2

### Triệu chứng muộn:
- Triệu chứng A
- Triệu chứng B

> **⚠️ Lưu ý:** Khi xuất hiện [triệu chứng nguy hiểm], 
> cần đến cơ sở y tế ngay lập tức.

## 5. Chẩn đoán {#chẩn-đoán}
### Xét nghiệm cần thiết:
| Xét nghiệm | Mục đích | Giá trị bình thường |
|------------|----------|-------------------|
| Xét nghiệm A | Chẩn đoán xác định | ... |
| Xét nghiệm B | Theo dõi điều trị | ... |

### Chẩn đoán phân biệt:
- Bệnh A
- Bệnh B

## 6. Điều trị {#điều-trị}
### Điều trị không dùng thuốc:
1. **Thay đổi lối sống:**
   - Chế độ ăn
   - Tập thể dục
   - Tránh các yếu tố nguy cơ

### Điều trị bằng thuốc:
#### Thuốc hàng đầu:
```
Thuốc A: Liều lượng, cách dùng
Thuốc B: Liều lượng, cách dùng
```

#### Thuốc dự phòng:
- Thuốc C: Khi nào dùng
- Thuốc D: Lưu ý đặc biệt

### Theo dõi điều trị:
- **Tuần 1-2:** Đánh giá tác dụng phụ
- **Tháng 1:** Kiểm tra đáp ứng điều trị
- **Tháng 3-6:** Điều chỉnh liều nếu cần

## 7. Tiên lượng {#tiên-lượng}
- **Tiên lượng tốt:** Khi...
- **Tiên lượng cần theo dõi:** Khi...
- **Tiên lượng xấu:** Khi...

## 8. Phòng ngừa {#phòng-ngừa}
### Phòng ngừa bậc 1 (Chưa mắc bệnh):
- Biện pháp A
- Biện pháp B

### Phòng ngừa bậc 2 (Đã mắc bệnh):
- Ngăn ngừa biến chứng
- Theo dõi định kỳ

## 🔗 Tài liệu tham khảo
1. [Tên tài liệu 1](link)
2. [Tên tài liệu 2](link)
3. Bộ Y tế - Hướng dẫn chẩn đoán và điều trị [tên bệnh]

---

**👨‍⚕️ Tác giả:** BS. [Tên bác sĩ] - [Chuyên khoa], [Bệnh viện]
**📅 Ngày cập nhật:** [Ngày/tháng/năm]
**📞 Liên hệ:** [Thông tin liên hệ nếu cần]

> **💡 Lưu ý:** Bài viết này chỉ mang tính chất tham khảo. 
> Vui lòng tham khảo ý kiến bác sĩ chuyên khoa để có chẩn đoán 
> và điều trị chính xác.
```

### Template 2: Bài viết về thuốc

```markdown
# [Tên thuốc]: Hướng dẫn sử dụng cho bệnh nhân

## 📋 Thông tin cơ bản
- **Tên hoạt chất:** [Tên generic]
- **Tên thương mại:** [Các tên thương mại]
- **Nhóm thuốc:** [Phân loại dược lý]
- **Hình thức:** Viên nén/Viên nang/Dung dịch

## 💊 Công dụng
**[Tên thuốc]** được sử dụng để:
- Điều trị [bệnh A]
- Phòng ngừa [biến chứng B]
- Hỗ trợ [điều kiện C]

## 📏 Liều lượng và cách dùng

### Liều thường dùng:
| Đối tượng | Liều lượng | Tần suất | Ghi chú |
|-----------|------------|----------|---------|
| Người lớn | [X] mg | [Y] lần/ngày | [Lưu ý] |
| Trẻ em | [Z] mg/kg | [Y] lần/ngày | [Lưu ý] |

### Cách sử dụng:
```
✅ NÊN:
- Uống cùng với thức ăn
- Uống vào thời gian cố định hàng ngày
- Nuốt nguyên viên, không nhai

❌ KHÔNG NÊN:
- Uống cùng với [tương tác]
- Ngừng thuốc đột ngột
- Tăng/giảm liều tự ý
```

## ⚠️ Tác dụng phụ

### Tác dụng phụ thường gặp (1-10%):
- Buồn nôn, nôn
- Đau đầu
- Chóng mặt

### Tác dụng phụ hiếm gặp (<1%):
- [Tác dụng nghiêm trọng A]
- [Tác dụng nghiêm trọng B]

> **🚨 Cần đến viện ngay khi có:**
> - Dấu hiệu dị ứng (phát ban, khó thở)
> - [Triệu chứng nghiêm trọng]

## 🚫 Chống chỉ định
- Dị ứng với [thành phần]
- [Bệnh lý A]
- [Tình trạng B]

## 🤝 Tương tác thuốc
| Thuốc | Mức độ | Hậu quả | Xử lý |
|-------|--------|---------|-------|
| Thuốc A | Nghiêm trọng | [Tác hại] | Tránh dùng chung |
| Thuốc B | Trung bình | [Tác hại] | Theo dõi chặt |

## 👶 Sử dụng ở nhóm đặc biệt

### Phụ nữ có thai:
- **Loại:** [A/B/C/D/X]
- **Khuyến cáo:** [Lời khuyên cụ thể]

### Phụ nữ cho con bú:
- **An toàn:** Có/Không
- **Lưu ý:** [Chi tiết]

### Người cao tuổi:
- **Điều chỉnh liều:** Có/Không
- **Theo dõi:** [Những gì cần theo dõi]

## 💾 Bảo quản
- **Nhiệt độ:** [Độ C]
- **Độ ẩm:** Tránh ẩm ướt
- **Ánh sáng:** Tránh ánh sáng trực tiếp
- **Hạn sử dụng:** [Thời gian] sau khi mở

## 🔔 Lưu ý quan trọng
> **💡 Nhắc nhở:**
> - Không chia sẻ thuốc với người khác
> - Mang theo danh sách thuốc khi đi khám
> - Báo cáo tất cả tác dụng phụ cho bác sĩ

---

**📞 Liên hệ khẩn cấp:** [Số điện thoại]
**🏥 Bệnh viện:** [Tên bệnh viện]
**👨‍⚕️ Bác sĩ tư vấn:** [Tên bác sĩ]
```

---

## 🎯 Checklist hoàn thành bài viết

Trước khi đăng bài, hãy kiểm tra:

- [ ] **Cấu trúc:** Có tiêu đề rõ ràng, mục lục, kết luận
- [ ] **Nội dung:** Thông tin chính xác, cập nhật, dễ hiểu
- [ ] **Định dạng:** Sử dụng markdown đúng cách
- [ ] **Hình ảnh:** Có alt text, kích thước phù hợp
- [ ] **Liên kết:** Tất cả link đều hoạt động
- [ ] **Tham khảo:** Có nguồn uy tín, đáng tin cậy
- [ ] **Đối tượng:** Phù hợp với độc giả mục tiêu
- [ ] **Chính tả:** Đã kiểm tra lỗi chính tả, ngữ pháp

---

**✨ Chúc bạn viết được những bài viết y khoa chất lượng cao!**
