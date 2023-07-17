import VCard from "vcard-creator";

export function SaveCard(name, company, position, email, phone, address) {
  const myVCard = new VCard();

  // Some variables
  const lastname = "";
  const firstname = name;
  const additional = "";
  const prefix = "";
  const suffix = "";

  myVCard
    // Add personal data
    .addName(firstname, lastname, additional, prefix, suffix)
    // Add work data
    .addCompany(company)
    .addJobtitle(position)
    .addEmail(email)
    .addPhoneNumber(phone, "PREF;WORK")
    .addAddress(address);

  // Tạo Blob từ nội dung vCard
  const blob = new Blob([myVCard], { type: "text/vcard" });

  // Tạo URL để tải xuống tệp tin vCard
  const url = window.URL.createObjectURL(blob);

  // Tạo một thẻ <a> ẩn để thực hiện tải xuống
  const downloadLink = document.createElement("a");

  downloadLink.href = url;
  downloadLink.download = "contact.vcf";
  downloadLink.rel = "noopener noreferrer";
  // Thêm thẻ <a> vào DOM và tự động kích hoạt sự kiện click để tải xuống
  document.body.appendChild(downloadLink);

  downloadLink.click();

  // Xóa thẻ <a> sau khi tải xuống hoàn tất
  //document.body.removeChild(downloadLink);
}
