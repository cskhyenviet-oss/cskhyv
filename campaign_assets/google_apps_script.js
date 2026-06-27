const SHEET_ID = '16AuwusbhchBM9Hm2_hRXRGPXfrSEGWrmx8e6mie-TEo';
const SHEET_NAME = 'YV-Landing-Page';

function doPost(e) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let ws = ss.getSheetByName(SHEET_NAME);
    
    // Nếu trang tính chưa tồn tại thì tạo mới và thêm tiêu đề
    if (!ws) {
      ws = ss.insertSheet(SHEET_NAME);
      ws.appendRow([
        'Thời gian', 
        'Tên', 
        'SĐT', 
        'Email', 
        'Sản phẩm bạn đang quan tâm', 
        'Hình thức liên hệ',
        'Mã SO',
        'Mã theo dõi giao hàng',
        'Số tiền chuyển khoản',
        'Số tiền COD'
      ]);
      // In đậm dòng tiêu đề
      ws.getRange(1, 1, 1, 10).setFontWeight('bold');
    }

    // Thời gian hiện tại
    const timestamp = new Date();
    
    // Lấy dữ liệu từ request (từ form gửi lên qua FormData)
    const fullname = e.parameter.fullname || '';
    // Thêm dấu nháy đơn vào trước SĐT để Google Sheet không tự xóa số 0
    const phone = e.parameter.phone ? "'" + e.parameter.phone : '';
    const email = e.parameter.email || '';
    const product = e.parameter.product || '';
    const contactMethod = e.parameter.contact_method || '';

    // Lấy số tiền tương ứng với sản phẩm
    let price = "0đ";
    switch (product) {
      case "Combo Xem Bóng Khỏe": price = "480.000đ"; break;
      case "Combo Gia Đình Mùa Bóng": price = "350.000đ"; break;
      case "Quà Tặng Đối Tác": price = "650.000đ"; break;
      case "Nạp Năng Lượng": price = "550.000đ"; break;
      case "VIP World Cup Set": price = "1.200.000đ"; break;
      case "Xem Đá Đủ Vị": price = "720.000đ"; break;
      case "Bụng Khỏe Thức Khuya": price = "450.000đ"; break;
      case "Hồi Phục Thần Tốc": price = "680.000đ"; break;
      case "Thức Trọn Mùa Bóng": price = "299.000đ"; break;
      case "Khác": price = "Liên hệ tư vấn"; break;
      default: price = "";
    }

    // Tạo mã SO ngẫu nhiên (SO + 8 số)
    const random8Digits = Math.floor(10000000 + Math.random() * 90000000);
    const soCode = "SO" + random8Digits;
    
    // Gán số tiền
    const transferAmount = "";
    const codAmount = price;
    const trackingCode = "";

    // Thêm dòng mới vào Google Sheet (10 cột)
    ws.appendRow([
      timestamp,
      fullname,
      phone,
      email,
      product,
      contactMethod,
      soCode,
      trackingCode,
      transferAmount,
      codAmount
    ]);

    // Trả về JSON thành công để frontend nhận biết
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': ws.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Trả về JSON chứa lỗi nếu có
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Web App đang hoạt động. Vui lòng sử dụng phương thức POST từ Form trên Landing Page để gửi dữ liệu.");
}
