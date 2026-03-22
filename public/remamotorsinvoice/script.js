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

    // Show the invoice content so we can grab its HTML
    document.querySelector('.invoice-content').style.display = 'block';

    // Get the invoice HTML content
    var invoiceHTML = document.querySelector('.printable-area').innerHTML;
    var headerImgSrc = document.querySelector('header img').src;

    // Open a new window at desktop width for proper print rendering
    var printWindow = window.open('', '_blank', 'width=800,height=1100');

    printWindow.document.write('<!DOCTYPE html><html><head>');
    printWindow.document.write('<meta charset="UTF-8">');
    printWindow.document.write('<meta name="viewport" content="width=1024">');
    printWindow.document.write('<title>\u200B</title>');
    printWindow.document.write('<style>');
    printWindow.document.write('\
        @page { size: A4; margin: 10mm; margin-top: 10mm; margin-bottom: 10mm; }\
        * { box-sizing: border-box; }\
        body {\
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;\
            margin: 0; padding: 20px; color: #212529;\
            font-size: 10pt; line-height: 1.4;\
            width: 100%; max-width: 800px;\
        }\
        header {\
            margin-bottom: 15px;\
            border-bottom: 2px solid #dee2e6;\
            padding-bottom: 10px;\
            width: 100%;\
        }\
        header img {\
            width: 100%; height: auto; display: block;\
        }\
        table {\
            width: 100%; border-collapse: collapse;\
            margin-bottom: 15px; table-layout: fixed;\
        }\
        th, td {\
            border: 1px solid #dee2e6; text-align: left;\
            padding: 8px 10px; vertical-align: top;\
            word-wrap: break-word; overflow-wrap: break-word;\
            font-size: 10pt; line-height: 1.3;\
        }\
        th {\
            background-color: #f8f9fa; font-weight: 600;\
            font-size: 10pt; text-transform: uppercase;\
            letter-spacing: 0.5px;\
            -webkit-print-color-adjust: exact; print-color-adjust: exact;\
        }\
        .item-description td:first-child { width: 30%; }\
        .total-row td {\
            font-weight: bold; font-size: 12pt;\
            background-color: #e9ecef;\
            -webkit-print-color-adjust: exact; print-color-adjust: exact;\
        }\
        .payment-details {\
            margin-top: 20px; padding: 15px;\
            border: 1px solid #dee2e6;\
            background-color: #f8f9fa; border-radius: 5px;\
            -webkit-print-color-adjust: exact; print-color-adjust: exact;\
        }\
        .payment-details h2 {\
            margin-top: 0; font-size: 13pt; font-weight: 600;\
            border-bottom: 1px solid #dee2e6;\
            padding-bottom: 8px; margin-bottom: 12px;\
        }\
        .payment-details p { margin: 6px 0; font-size: 10pt; }\
        .payment-details strong { font-weight: 600; }\
        .invoice-content { display: block; }\
        @media print {\
            body { padding: 0; margin: 0; }\
            @page { margin: 10mm; }\
        }\
    ');
    printWindow.document.write('</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(invoiceHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();

    // Wait for content (especially the header image) to load before printing
    var img = printWindow.document.querySelector('header img');
    function doPrint() {
        setTimeout(function() {
            printWindow.focus();
            printWindow.print();
        }, 500);
    }

    if (img && !img.complete) {
        img.onload = doPrint;
        img.onerror = doPrint;
    } else {
        doPrint();
    }
}
