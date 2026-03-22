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

    // Print the invoice
    window.print();
}