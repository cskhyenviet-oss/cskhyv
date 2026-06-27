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
        'Hình thức liên hệ'
      ]);
      // In đậm dòng tiêu đề
      ws.getRange(1, 1, 1, 6).setFontWeight('bold');
    }

    // Thời gian hiện tại
    const timestamp = new Date();
    
    // Lấy dữ liệu từ request (từ form gửi lên qua FormData)
    const fullname = e.parameter.fullname || '';
    const phone = e.parameter.phone || '';
    const email = e.parameter.email || '';
    const product = e.parameter.product || '';
    const contactMethod = e.parameter.contact_method || '';

    // Thêm dòng mới vào Google Sheet
    ws.appendRow([
      timestamp,
      fullname,
      phone,
      email,
      product,
      contactMethod
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
