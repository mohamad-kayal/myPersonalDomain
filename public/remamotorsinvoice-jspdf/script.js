// ===== Image Loading =====
function loadImageAsDataURL(url) {
    return new Promise(function(resolve, reject) {
        var img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = function() {
            var canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            canvas.getContext("2d").drawImage(img, 0, 0);
            resolve({ dataURL: canvas.toDataURL("image/png"), width: img.naturalWidth, height: img.naturalHeight });
        };
        img.onerror = function() { resolve(null); };
        img.src = url;
    });
}

// ===== Mobile Detection =====
function isMobile() {
    return window.matchMedia("(max-width: 768px)").matches;
}

// ===== Step Navigation =====
var _currentStep = 0;

function goToStep(step) {
    if (!isMobile()) return;
    _currentStep = step;

    var track = document.getElementById("stepsTrack");
    if (track) {
        track.style.transform = "translateX(-" + (step * 100) + "%)";
    }

    // Update tab active states
    var tabs = document.querySelectorAll(".step-tab");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.toggle("active", i === step);
    }

    // Scroll to top of form area
    var viewport = document.getElementById("stepsViewport");
    if (viewport) viewport.scrollIntoView({ behavior: "smooth", block: "start" });
}

function initStepNav() {
    var tabs = document.querySelectorAll(".step-tab");
    for (var i = 0; i < tabs.length; i++) {
        (function(index) {
            tabs[index].addEventListener("click", function(e) {
                e.preventDefault();
                goToStep(index);
            });
        })(i);
    }

    // Swipe gesture support
    initSwipeGestures();
}

function initSwipeGestures() {
    var viewport = document.getElementById("stepsViewport");
    if (!viewport) return;

    var startX = 0;
    var startY = 0;
    var isDragging = false;

    viewport.addEventListener("touchstart", function(e) {
        if (!isMobile()) return;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isDragging = true;
    }, { passive: true });

    viewport.addEventListener("touchend", function(e) {
        if (!isDragging || !isMobile()) return;
        isDragging = false;
        var endX = e.changedTouches[0].clientX;
        var endY = e.changedTouches[0].clientY;
        var diffX = startX - endX;
        var diffY = startY - endY;

        // Only trigger if horizontal swipe is dominant and exceeds threshold
        if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
            if (diffX > 0 && _currentStep < 2) {
                goToStep(_currentStep + 1);
            } else if (diffX < 0 && _currentStep > 0) {
                goToStep(_currentStep - 1);
            }
        }
    }, { passive: true });
}

function updateStepTabs() {
    if (!isMobile()) return;
    var panels = document.querySelectorAll(".step-panel");
    var tabs = document.querySelectorAll(".step-tab");

    for (var i = 0; i < panels.length; i++) {
        var fields = panels[i].querySelectorAll("[required]");
        var filled = 0;
        for (var j = 0; j < fields.length; j++) {
            var f = fields[j];
            if (f.tagName === "SELECT" ? f.value !== "" : f.value.trim() !== "") filled++;
        }
        if (tabs[i] && fields.length > 0 && filled === fields.length) {
            tabs[i].classList.add("complete");
        } else if (tabs[i]) {
            tabs[i].classList.remove("complete");
        }
    }
}

// ===== Form Initialization =====
document.addEventListener("DOMContentLoaded", initForm);

function initForm() {
    // Auto-fill today's date
    var dateInput = document.getElementById("date");
    if (dateInput && !dateInput.value) {
        dateInput.value = new Date().toISOString().split("T")[0];
    }

    // Load saved draft (may override date and other fields)
    loadDraft();

    // Set up input listeners for progress, validation, and draft saving
    var fields = document.querySelectorAll("#invoiceForm [required]");
    for (var i = 0; i < fields.length; i++) {
        (function(field) {
            // Create inline error message element
            var errorSpan = document.createElement("span");
            errorSpan.className = "field-error";
            var insertAfter = field.closest(".price-input-wrapper") || field;
            insertAfter.parentNode.insertBefore(errorSpan, insertAfter.nextSibling);

            field.addEventListener("input", function() {
                updateFieldState(field);
                updateProgress();
                updateStepTabs();
                debounceSave();
            });
            field.addEventListener("change", function() {
                updateFieldState(field);
                updateProgress();
                updateStepTabs();
                debounceSave();
            });
            field.addEventListener("blur", function() {
                var group = field.closest(".form-group");
                if (group) group.classList.add("touched");
                updateFieldState(field);
            });
            // Initialize current state
            updateFieldState(field);
        })(fields[i]);
    }

    // Auto-uppercase for VIN and Rego inputs
    var uppercaseInputs = document.querySelectorAll(".uppercase-input");
    for (var j = 0; j < uppercaseInputs.length; j++) {
        uppercaseInputs[j].addEventListener("input", function() {
            var start = this.selectionStart;
            var end = this.selectionEnd;
            this.value = this.value.toUpperCase();
            this.setSelectionRange(start, end);
        });
    }

    // Initialize step navigation for mobile
    initStepNav();

    // Initial progress calculation
    updateProgress();
    updateStepTabs();

    // Modal backdrop click to close
    var backdrop = document.getElementById("modalBackdrop");
    if (backdrop) {
        backdrop.addEventListener("click", function() {
            var modal = document.getElementById("passwordModal");
            if (modal) modal.classList.remove("active");
        });
    }

    // Bind section toggle headers
    var sectionHeaders = document.querySelectorAll("[data-toggle]");
    for (var sh = 0; sh < sectionHeaders.length; sh++) {
        (function(header) {
            header.addEventListener("click", function() {
                toggleSection(header.getAttribute("data-toggle"));
            });
        })(sectionHeaders[sh]);
    }

    // Bind step navigation buttons (prev/next)
    var stepBtns = document.querySelectorAll("[data-goto]");
    for (var sb = 0; sb < stepBtns.length; sb++) {
        (function(btn) {
            btn.addEventListener("click", function() {
                goToStep(parseInt(btn.getAttribute("data-goto"), 10));
            });
        })(stepBtns[sb]);
    }

    // Bind generate and clear buttons
    var generateBtn = document.getElementById("generateBtn");
    if (generateBtn) generateBtn.addEventListener("click", fillInvoice);

    var clearBtn = document.getElementById("clearBtn");
    if (clearBtn) clearBtn.addEventListener("click", clearDraft);

    // Bind success overlay buttons
    var newInvoiceBtn = document.getElementById("newInvoiceBtn");
    if (newInvoiceBtn) newInvoiceBtn.addEventListener("click", startNewInvoice);

    var closeSuccessBtn = document.getElementById("closeSuccessBtn");
    if (closeSuccessBtn) closeSuccessBtn.addEventListener("click", closeSuccessOverlay);
}

// ===== Field Validation State =====
function updateFieldState(field) {
    var group = field.closest(".form-group");
    if (!group) return;
    var hasValue = field.tagName === "SELECT" ? field.value !== "" : field.value.trim() !== "";
    var isValid = field.checkValidity();

    // Only show checkmark when both filled and valid
    if (hasValue && isValid) {
        group.classList.add("filled");
    } else {
        group.classList.remove("filled");
    }

    // Update inline error if field has been touched
    if (group.classList.contains("touched")) {
        var errorSpan = group.querySelector(".field-error");
        if (errorSpan) {
            errorSpan.textContent = isValid ? "" : getFieldError(field);
        }
    }
}

function getFieldError(field) {
    if (field.validity.valid) return "";
    if (field.validity.valueMissing) return "Required";
    if (field.validity.patternMismatch) {
        switch (field.id) {
            case "abn": return "ABN must be exactly 11 digits";
            case "vin": return "VIN must be 17 alphanumeric characters";
            default: return "Invalid format";
        }
    }
    if (field.validity.tooShort) {
        switch (field.id) {
            case "abn": return "ABN must be exactly 11 digits";
            case "vin": return "VIN must be 17 characters";
            default: return "Too short";
        }
    }
    if (field.validity.rangeUnderflow || field.validity.rangeOverflow) {
        if (field.id === "year") return "Enter a year between 1900 and 2035";
        return "Value out of range";
    }
    return field.validationMessage || "Invalid";
}

// ===== Progress Tracking =====
function updateProgress() {
    var fields = document.querySelectorAll("#invoiceForm [required]");
    var total = fields.length;
    var filled = 0;

    for (var i = 0; i < fields.length; i++) {
        var f = fields[i];
        if (f.tagName === "SELECT" ? f.value !== "" : f.value.trim() !== "") filled++;
    }

    var percent = total > 0 ? Math.round((filled / total) * 100) : 0;
    var fillEl = document.getElementById("progressFill");
    var textEl = document.getElementById("progressText");

    if (fillEl) {
        fillEl.style.width = percent + "%";
        if (percent === 100) {
            fillEl.classList.add("complete");
        } else {
            fillEl.classList.remove("complete");
        }
    }
    if (textEl) {
        textEl.textContent = filled + " of " + total + " fields complete";
    }

    // Update each section's status
    updateSectionStatus("section1");
    updateSectionStatus("section2");
    updateSectionStatus("section3");
}

function updateSectionStatus(sectionId) {
    var section = document.getElementById(sectionId);
    if (!section) return;

    var fields = section.querySelectorAll("[required]");
    var filled = 0;
    for (var i = 0; i < fields.length; i++) {
        var f = fields[i];
        if (f.tagName === "SELECT" ? f.value !== "" : f.value.trim() !== "") filled++;
    }

    var statusEl = document.getElementById(sectionId + "Status");
    if (statusEl) {
        statusEl.textContent = filled + "/" + fields.length;
        var isComplete = filled === fields.length && fields.length > 0;
        if (isComplete) {
            statusEl.classList.add("complete");
            section.classList.add("section-complete");
        } else {
            statusEl.classList.remove("complete");
            section.classList.remove("section-complete");
        }
    }
}

// ===== Section Toggle =====
function toggleSection(sectionId) {
    // Don't toggle on mobile (step nav handles visibility)
    if (isMobile()) return;
    var section = document.getElementById(sectionId);
    if (section) section.classList.toggle("collapsed");
}

// ===== LocalStorage Draft =====
var DRAFT_KEY = "rema_invoice_draft";
var _saveTimer = null;

function debounceSave() {
    if (_saveTimer) clearTimeout(_saveTimer);
    _saveTimer = setTimeout(saveDraft, 500);
}

function saveDraft() {
    var form = document.getElementById("invoiceForm");
    if (!form) return;

    var data = {};
    var fields = form.querySelectorAll("input, select, textarea");
    for (var i = 0; i < fields.length; i++) {
        if (fields[i].id) data[fields[i].id] = fields[i].value;
    }
    data._savedAt = new Date().toISOString();

    try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    } catch (e) { /* storage full or unavailable */ }

    updateDraftStatus();
}

function loadDraft() {
    try {
        var saved = localStorage.getItem(DRAFT_KEY);
        if (!saved) return;

        var data = JSON.parse(saved);
        var keys = Object.keys(data);
        for (var i = 0; i < keys.length; i++) {
            if (keys[i].charAt(0) === "_") continue;
            var field = document.getElementById(keys[i]);
            if (field) field.value = data[keys[i]];
        }
        updateDraftStatus();
    } catch (e) { /* corrupt data or unavailable */ }
}

function clearDraft() {
    if (!confirm("Clear all form fields and saved draft?")) return;
    resetForm();
}

function resetForm() {
    try {
        localStorage.removeItem(DRAFT_KEY);
    } catch (e) {}

    var form = document.getElementById("invoiceForm");
    if (form) form.reset();

    // Reset selects back to the disabled placeholder
    var selects = form.querySelectorAll("select");
    for (var i = 0; i < selects.length; i++) {
        selects[i].selectedIndex = 0;
    }

    // Re-set today's date
    var dateInput = document.getElementById("date");
    if (dateInput) dateInput.value = new Date().toISOString().split("T")[0];

    // Refresh all visual states
    var fields = form.querySelectorAll("[required]");
    for (var j = 0; j < fields.length; j++) {
        var group = fields[j].closest(".form-group");
        if (group) group.classList.remove("touched");
        updateFieldState(fields[j]);
    }
    updateProgress();
    updateStepTabs();
    updateDraftStatus();

    // Go back to first step on mobile
    if (isMobile()) goToStep(0);
}

function updateDraftStatus() {
    var statusEl = document.getElementById("draftStatus");
    if (!statusEl) return;

    try {
        var saved = localStorage.getItem(DRAFT_KEY);
        if (saved) {
            var data = JSON.parse(saved);
            if (data._savedAt) {
                statusEl.textContent = "Draft saved " + new Date(data._savedAt).toLocaleTimeString();
                return;
            }
        }
    } catch (e) {}
    statusEl.textContent = "";
}

// ===== Toast Notification =====
function showToast(message) {
    var toast = document.getElementById("successToast");
    var msgEl = document.getElementById("toastMessage");
    if (!toast) return;
    if (msgEl) msgEl.textContent = message;
    toast.classList.add("show");
    setTimeout(function() {
        toast.classList.remove("show");
    }, 3000);
}

// ===== Success Overlay =====
function showSuccessOverlay(filename) {
    var overlay = document.getElementById("successOverlay");
    var filenameEl = document.getElementById("successFilename");
    if (!overlay) return;
    if (filenameEl) filenameEl.textContent = filename;
    overlay.classList.add("active");
}

function closeSuccessOverlay() {
    var overlay = document.getElementById("successOverlay");
    if (overlay) overlay.classList.remove("active");
}

function startNewInvoice() {
    closeSuccessOverlay();
    resetForm();
}

// ===== Loading State =====
function setGenerateLoading(loading) {
    var btn = document.getElementById("generateBtn");
    if (!btn) return;
    if (loading) {
        btn.classList.add("loading");
    } else {
        btn.classList.remove("loading");
    }
}

// ===== Filename Builder =====
function buildFilename(date, clientName) {
    var cleanClient = clientName.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, "_");
    var cleanDate = date.replace(/-/g, "");
    return "RemaInvoice_" + cleanDate + "_" + cleanClient + ".pdf";
}

// ===== Invoice Generation =====
function fillInvoice() {
    var form = document.getElementById("invoiceForm");

    // Mark all fields as touched so errors appear inline
    var allFields = form.querySelectorAll("[required]");
    for (var t = 0; t < allFields.length; t++) {
        var group = allFields[t].closest(".form-group");
        if (group) group.classList.add("touched");
        updateFieldState(allFields[t]);
    }

    if (!form.checkValidity()) {
        // On mobile, navigate to the step with the first error
        var firstInvalid = form.querySelector("[required]:invalid");
        if (firstInvalid) {
            if (isMobile()) {
                var panel = firstInvalid.closest(".step-panel");
                if (panel) {
                    var stepIndex = parseInt(panel.getAttribute("data-step"), 10);
                    goToStep(stepIndex);
                }
                setTimeout(function() {
                    firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
                    firstInvalid.focus();
                }, 350);
            } else {
                var section = firstInvalid.closest(".step-panel, .form-section");
                if (section && section.classList.contains("collapsed")) {
                    section.classList.remove("collapsed");
                }
                firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
                firstInvalid.focus();
            }
        }
        return;
    }

    var date = document.getElementById("date").value;
    var to = document.getElementById("to").value;
    var abn = document.getElementById("abn").value;
    var address = document.getElementById("address").value;
    var deliveredTo = document.getElementById("deliveredTo").value;
    var make = document.getElementById("make").value;
    var model = document.getElementById("model").value;
    var year = document.getElementById("year").value;
    var rego = document.getElementById("rego").value;
    var vin = document.getElementById("vin").value;
    var engine = document.getElementById("engine").value;
    var odometer = parseFloat(document.getElementById("odometer").value) || 0;
    var colour = document.getElementById("colour").value;
    var bodyType = document.getElementById("bodyType").value;
    var transmission = document.getElementById("transmission").value;
    var fuelType = document.getElementById("fuelType").value;
    var total = parseFloat(document.getElementById("total").value) || 0;

    var odometerFormatted = new Intl.NumberFormat("en-AU").format(odometer) + " KM";
    var totalFormatted = new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(total);

    var filename = buildFilename(date, to);

    // Show password modal
    var modal = document.getElementById("passwordModal");
    var input = document.getElementById("modalPassword");
    var error = document.getElementById("modalError");
    var confirmBtn = document.getElementById("modalConfirm");
    var cancelBtn = document.getElementById("modalCancel");

    input.value = "";
    error.textContent = "";
    input.classList.remove("error");
    modal.classList.add("active");
    setTimeout(function() { input.focus(); }, 100);

    function cleanup() {
        modal.classList.remove("active");
        confirmBtn.onclick = null;
        cancelBtn.onclick = null;
        input.onkeydown = null;
    }

    function attemptGenerate() {
        if (input.value !== "Is@arfeh") {
            error.textContent = "Incorrect password. Please try again.";
            input.classList.add("error");
            input.select();
            return;
        }
        cleanup();

        // Show loading spinner
        setGenerateLoading(true);

        loadImageAsDataURL("/remamotorsinvoice-jspdf/images/header.png").then(function(headerImg) {
            generatePDF(headerImg, {
                date: date, to: to, abn: abn, address: address, deliveredTo: deliveredTo,
                make: make, model: model, year: year, rego: rego, vin: vin,
                engine: engine, odometer: odometerFormatted, colour: colour,
                bodyType: bodyType, transmission: transmission, fuelType: fuelType,
                total: totalFormatted
            }, filename);

            // Hide loading, show success
            setGenerateLoading(false);
            showSuccessOverlay(filename);
        });
    }

    confirmBtn.onclick = attemptGenerate;
    cancelBtn.onclick = cleanup;
    input.onkeydown = function(e) {
        if (e.key === "Enter") attemptGenerate();
        if (e.key === "Escape") cleanup();
    };
}

function generatePDF(headerImg, data, filename) {
    var jsPDF = window.jspdf.jsPDF;
    var doc = new jsPDF({ unit: "mm", format: "a4" });

    var pageWidth = 210;
    var margin = 10;
    var contentWidth = pageWidth - margin * 2;
    var y = 4;

    // Colors
    var headerBg = [248, 249, 250];
    var totalBg = [233, 236, 239];
    var borderColor = [222, 226, 230];
    var textColor = [33, 37, 41];

    // --- Header image ---
    if (headerImg) {
        var imgAspect = headerImg.height / headerImg.width;
        var imgW = contentWidth;
        var imgH = imgW * imgAspect;
        doc.addImage(headerImg.dataURL, "PNG", margin, y, imgW, imgH);
        y += imgH + 1;
    }
    // Header border line
    doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
    doc.setLineWidth(0.5);
    doc.line(margin, y, margin + contentWidth, y);
    y += 4;

    // --- Helper: draw a table row ---
    function drawRow(_x, rowY, cols, rowHeight, options) {
        options = options || {};
        var bg = options.bg;
        var bold = options.bold;
        var fontSize = options.fontSize || 9;

        for (var i = 0; i < cols.length; i++) {
            var col = cols[i];
            if (bg) {
                doc.setFillColor(bg[0], bg[1], bg[2]);
                doc.rect(col.x, rowY, col.w, rowHeight, "F");
            }
            doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
            doc.setLineWidth(0.3);
            doc.rect(col.x, rowY, col.w, rowHeight, "S");
            doc.setTextColor(textColor[0], textColor[1], textColor[2]);
            doc.setFontSize(fontSize);
            if (bold) {
                doc.setFont("helvetica", "bold");
            } else {
                doc.setFont("helvetica", "normal");
            }
            var textX = col.x + 3;
            var textY = rowY + 5;
            var maxTextWidth = col.w - 6;
            var lines = doc.splitTextToSize(String(col.text || ""), maxTextWidth);
            doc.text(lines, textX, textY);
        }
        return rowY + rowHeight;
    }

    // --- Invoice Details Table ---
    var rowH = 7;
    var col1W = 25;
    var col2W = contentWidth / 2 - col1W;
    var col3W = contentWidth / 2;

    y = drawRow(margin, y, [
        { x: margin, w: contentWidth, text: "INVOICE DETAILS" }
    ], rowH, { bg: headerBg, bold: true, fontSize: 9 });

    var detailRowH = 7;
    var deliveredBlockH = detailRowH * 4;

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
    doc.setLineWidth(0.3);
    doc.rect(margin + col1W + col2W, y, col3W, deliveredBlockH, "S");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text("Delivered To:", margin + col1W + col2W + 3, y + 5);
    doc.setFont("helvetica", "normal");
    var deliveredLines = doc.splitTextToSize(data.deliveredTo, col3W - 6);
    doc.text(deliveredLines, margin + col1W + col2W + 3, y + 10);

    var detailRows = [
        { label: "Date:", value: data.date },
        { label: "To:", value: data.to },
        { label: "ABN:", value: data.abn },
        { label: "Address:", value: data.address }
    ];

    for (var r = 0; r < detailRows.length; r++) {
        var rowY = y + r * detailRowH;
        doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
        doc.setLineWidth(0.3);
        doc.rect(margin, rowY, col1W, detailRowH, "S");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.text(detailRows[r].label, margin + 3, rowY + 5.5);
        doc.rect(margin + col1W, rowY, col2W, detailRowH, "S");
        doc.setFont("helvetica", "normal");
        var valLines = doc.splitTextToSize(String(detailRows[r].value), col2W - 6);
        doc.text(valLines, margin + col1W + 3, rowY + 5.5);
    }

    y += deliveredBlockH + 4;

    // --- Item Description Table ---
    var itemCol1W = contentWidth * 0.35;
    var itemCol2W = contentWidth - itemCol1W;

    y = drawRow(margin, y, [
        { x: margin, w: contentWidth, text: "ITEM DESCRIPTION" }
    ], rowH, { bg: headerBg, bold: true, fontSize: 9 });

    var itemRows = [
        { label: "Make:", value: data.make },
        { label: "Model:", value: data.model },
        { label: "Year:", value: data.year },
        { label: "Rego Number:", value: data.rego },
        { label: "VIN #:", value: data.vin },
        { label: "Engine #:", value: data.engine },
        { label: "Odometer reading:", value: data.odometer },
        { label: "Colour:", value: data.colour },
        { label: "Body Type:", value: data.bodyType },
        { label: "Transmission:", value: data.transmission },
        { label: "Fuel Type:", value: data.fuelType }
    ];

    for (var i = 0; i < itemRows.length; i++) {
        var evenRow = (i % 2 === 1);
        y = drawRow(margin, y, [
            { x: margin, w: itemCol1W, text: itemRows[i].label },
            { x: margin + itemCol1W, w: itemCol2W, text: itemRows[i].value }
        ], detailRowH, { bg: evenRow ? headerBg : null, bold: false });
    }

    y = drawRow(margin, y, [
        { x: margin, w: itemCol1W, text: "Price (including GST):" },
        { x: margin + itemCol1W, w: itemCol2W, text: data.total }
    ], 8, { bg: totalBg, bold: true, fontSize: 10 });

    y += 5;

    // --- Payment Details Section ---
    var paymentH = 40;
    doc.setFillColor(headerBg[0], headerBg[1], headerBg[2]);
    doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, y, contentWidth, paymentH, 2, 2, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text("Payment Information", margin + 5, y + 7);

    doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
    doc.line(margin + 5, y + 10, margin + contentWidth - 5, y + 10);

    doc.setFontSize(9);
    var paymentY = y + 14;
    var paymentItems = [
        { label: "Amount Payable To:", value: "Rema Motors" },
        { label: "Bank:", value: "Suncorp Bank" },
        { label: "BSB:", value: "484-799" },
        { label: "Account Number:", value: "350600180" }
    ];
    for (var p = 0; p < paymentItems.length; p++) {
        doc.setFont("helvetica", "bold");
        doc.text(paymentItems[p].label, margin + 5, paymentY);
        doc.setFont("helvetica", "normal");
        doc.text(paymentItems[p].value, margin + 50, paymentY);
        paymentY += 6;
    }

    doc.save(filename);
}
