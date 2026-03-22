function fillInvoice() {
    // Validate the form first
    if (!document.getElementById("invoiceForm").checkValidity()) {
        document.getElementById("invoiceForm").reportValidity();
        return;
    }

    // Fill basic invoice details
    document.getElementById("invoiceDate").innerText = document.getElementById("date").value;
    document.getElementById("invoiceTo").innerText = document.getElementById("to").value;
    document.getElementById("invoiceABN").innerText = document.getElementById("abn").value;
    document.getElementById("invoiceAddress").innerText = document.getElementById("address").value;
    document.getElementById("invoiceDeliveredTo").innerText = "Delivered To: " + document.getElementById("deliveredTo").value;

    // Fill vehicle details
    document.getElementById("invoiceMake").innerText = document.getElementById("make").value;
    document.getElementById("invoiceModel").innerText = document.getElementById("model").value;
    document.getElementById("invoiceYear").innerText = document.getElementById("year").value;
    document.getElementById("invoiceRego").innerText = document.getElementById("rego").value;
    document.getElementById("invoiceVIN").innerText = document.getElementById("vin").value;
    document.getElementById("invoiceEngine").innerText = document.getElementById("engine").value;

    // Format odometer reading
    const odometer = parseFloat(document.getElementById("odometer").value) || 0;
    document.getElementById("invoiceOdometer").innerText = new Intl.NumberFormat("en-AU").format(odometer) + " KM";

    // Fill remaining vehicle details
    document.getElementById("invoiceColour").innerText = document.getElementById("colour").value;
    document.getElementById("invoiceBodyType").innerText = document.getElementById("bodyType").value;
    document.getElementById("invoiceTransmission").innerText = document.getElementById("transmission").value;
    document.getElementById("invoiceFuelType").innerText = document.getElementById("fuelType").value;

    // Format price and total
    const total = parseFloat(document.getElementById("total").value) || 0;
    const formatter = new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" });

    document.getElementById("invoiceTotal").innerText = formatter.format(total);

    // Password protection
    if ("Is@arfeh" !== prompt("Please enter the password to proceed:")) {
        alert("Incorrect password. The page will now reload.");
        location.reload();
        return;
    }

    // Show the invoice content
    document.querySelector('.invoice-content').style.display = 'block';

    // Get the invoice HTML content
    var invoiceHTML = document.querySelector('.printable-area').innerHTML;

    // Use a hidden iframe for reliable cross-device printing
    var existingFrame = document.getElementById('printFrame');
    if (existingFrame) existingFrame.remove();

    var iframe = document.createElement('iframe');
    iframe.id = 'printFrame';
    iframe.style.cssText = 'position:fixed; width:800px; height:1100px; left:-9999px; top:0; border:none;';
    document.body.appendChild(iframe);

    var doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write('\
<!DOCTYPE html>\
<html>\
<head>\
<meta charset="UTF-8">\
<title> </title>\
<style>\
@page {\
    size: A4;\
    margin: 8mm;\
}\
* {\
    box-sizing: border-box;\
    margin: 0;\
    padding: 0;\
}\
body {\
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;\
    margin: 0;\
    padding: 10px;\
    color: #212529;\
    font-size: 10pt;\
    line-height: 1.3;\
    width: 190mm;\
}\
header {\
    margin-bottom: 10px;\
    border-bottom: 2px solid #dee2e6;\
    padding-bottom: 6px;\
    width: 100%;\
}\
header img {\
    width: 100%;\
    height: auto;\
    display: block;\
}\
table {\
    width: 100%;\
    border-collapse: collapse;\
    margin-bottom: 8px;\
}\
th, td {\
    border: 1px solid #dee2e6;\
    text-align: left;\
    padding: 5px 8px;\
    vertical-align: top;\
    word-wrap: break-word;\
    overflow-wrap: break-word;\
    font-size: 10pt;\
    line-height: 1.2;\
}\
th {\
    background-color: #f8f9fa;\
    font-weight: 600;\
    font-size: 10pt;\
    text-transform: uppercase;\
    letter-spacing: 0.5px;\
    -webkit-print-color-adjust: exact;\
    print-color-adjust: exact;\
}\
.item-description td:first-child {\
    width: 30%;\
}\
.total-row td {\
    font-weight: bold;\
    font-size: 11pt;\
    background-color: #e9ecef;\
    -webkit-print-color-adjust: exact;\
    print-color-adjust: exact;\
}\
.payment-details {\
    margin-top: 10px;\
    padding: 10px;\
    border: 1px solid #dee2e6;\
    background-color: #f8f9fa;\
    border-radius: 5px;\
    -webkit-print-color-adjust: exact;\
    print-color-adjust: exact;\
}\
.payment-details h2 {\
    margin: 0 0 6px 0;\
    font-size: 11pt;\
    font-weight: 600;\
    border-bottom: 1px solid #dee2e6;\
    padding: 0 0 4px 0;\
}\
.payment-details p {\
    margin: 4px 0;\
    font-size: 10pt;\
    padding: 0;\
}\
.payment-details strong {\
    font-weight: 600;\
}\
.invoice-content {\
    display: block;\
    width: 100%;\
}\
</style>\
</head>\
<body>\
' + invoiceHTML + '\
</body>\
</html>');
    doc.close();

    // Wait for the image to load inside the iframe, then print
    var iframeImg = doc.querySelector('header img');

    function doPrint() {
        setTimeout(function() {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
        }, 600);
    }

    if (iframeImg && !iframeImg.complete) {
        iframeImg.onload = doPrint;
        iframeImg.onerror = doPrint;
    } else {
        doPrint();
    }
}
