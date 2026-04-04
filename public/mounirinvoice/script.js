// ===== Utilities =====
function formatTime12(time24) {
    if (!time24) return "";
    var parts = time24.split(":");
    var h = parseInt(parts[0], 10);
    var m = parts[1];
    var ampm = h >= 12 ? "PM" : "AM";
    var h12 = h % 12 || 12;
    return h12 + ":" + m + " " + ampm;
}

function calcHours(start, end) {
    if (!start || !end) return 0;
    var sp = start.split(":").map(Number);
    var ep = end.split(":").map(Number);
    var diff = (ep[0] + ep[1] / 60) - (sp[0] + sp[1] / 60);
    return diff > 0 ? Math.round(diff * 100) / 100 : 0;
}

function formatCurrency(amount) {
    return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(amount);
}

function formatDateAU(dateStr) {
    if (!dateStr) return "";
    var parts = dateStr.split("-");
    return parts[2] + "/" + parts[1] + "/" + parts[0];
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
    if (track) track.style.transform = "translateX(-" + (step * 100) + "%)";
    var tabs = document.querySelectorAll(".step-tab");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.toggle("active", i === step);
    }
    var viewport = document.getElementById("stepsViewport");
    if (viewport) viewport.scrollIntoView({ behavior: "smooth", block: "start" });
}

function initStepNav() {
    var tabs = document.querySelectorAll(".step-tab");
    for (var i = 0; i < tabs.length; i++) {
        (function(idx) {
            tabs[idx].addEventListener("click", function(e) { e.preventDefault(); goToStep(idx); });
        })(i);
    }
    initSwipeGestures();
}

function initSwipeGestures() {
    var viewport = document.getElementById("stepsViewport");
    if (!viewport) return;
    var startX = 0, startY = 0, dragging = false;
    viewport.addEventListener("touchstart", function(e) {
        if (!isMobile()) return;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        dragging = true;
    }, { passive: true });
    viewport.addEventListener("touchend", function(e) {
        if (!dragging || !isMobile()) return;
        dragging = false;
        var dx = startX - e.changedTouches[0].clientX;
        var dy = startY - e.changedTouches[0].clientY;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
            if (dx > 0 && _currentStep < 2) goToStep(_currentStep + 1);
            else if (dx < 0 && _currentStep > 0) goToStep(_currentStep - 1);
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

// ===== Invoice Number Management =====
var INV_NUM_KEY = "mounir_invoice_counter";

function getNextInvoiceNumber() {
    var num = 1;
    try {
        var saved = localStorage.getItem(INV_NUM_KEY);
        if (saved) num = parseInt(saved, 10) || 1;
    } catch (e) {}
    return "INV" + String(num).padStart(4, "0");
}

function incrementInvoiceNumber() {
    var num = 1;
    try {
        var saved = localStorage.getItem(INV_NUM_KEY);
        if (saved) num = parseInt(saved, 10) || 1;
        localStorage.setItem(INV_NUM_KEY, String(num + 1));
    } catch (e) {}
}

// ===== Receipt Uploads =====
var _receiptImages = [];

function initUpload() {
    var area = document.getElementById("uploadArea");
    var input = document.getElementById("receiptFiles");
    if (!area || !input) return;

    area.addEventListener("dragover", function(e) {
        e.preventDefault();
        area.classList.add("dragover");
    });
    area.addEventListener("dragleave", function() {
        area.classList.remove("dragover");
    });
    area.addEventListener("drop", function(e) {
        e.preventDefault();
        area.classList.remove("dragover");
        handleFiles(e.dataTransfer.files);
    });
    input.addEventListener("change", function() {
        handleFiles(input.files);
        input.value = "";
    });
}

function handleFiles(files) {
    for (var i = 0; i < files.length; i++) {
        (function(file) {
            if (!file.type.startsWith("image/")) return;
            var reader = new FileReader();
            reader.onload = function(e) {
                var img = new Image();
                img.onload = function() {
                    _receiptImages.push({
                        dataURL: e.target.result,
                        width: img.naturalWidth,
                        height: img.naturalHeight,
                        name: file.name
                    });
                    renderPreviews();
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        })(files[i]);
    }
}

function renderPreviews() {
    var container = document.getElementById("uploadPreviews");
    if (!container) return;
    container.innerHTML = "";
    for (var i = 0; i < _receiptImages.length; i++) {
        (function(idx) {
            var div = document.createElement("div");
            div.className = "upload-preview-item";
            var img = document.createElement("img");
            img.src = _receiptImages[idx].dataURL;
            img.alt = _receiptImages[idx].name;
            var btn = document.createElement("button");
            btn.type = "button";
            btn.className = "upload-preview-remove";
            btn.innerHTML = "&times;";
            btn.addEventListener("click", function() {
                _receiptImages.splice(idx, 1);
                renderPreviews();
            });
            div.appendChild(img);
            div.appendChild(btn);
            container.appendChild(div);
        })(i);
    }
}

// ===== Schedule Management =====
function initSchedule() {
    var rows = document.querySelectorAll(".schedule-row");
    for (var i = 0; i < rows.length; i++) {
        var inputs = rows[i].querySelectorAll("input[type='time']");
        for (var j = 0; j < inputs.length; j++) {
            inputs[j].addEventListener("input", updateSchedule);
            inputs[j].addEventListener("change", updateSchedule);
        }
    }
    updateSchedule();
}

function updateSchedule() {
    var rows = document.querySelectorAll(".schedule-row");
    var totalHrs = 0;
    for (var i = 0; i < rows.length; i++) {
        var startEl = rows[i].querySelector(".schedule-start");
        var endEl = rows[i].querySelector(".schedule-end");
        var hrsEl = rows[i].querySelector(".schedule-hours");
        var hrs = calcHours(startEl.value, endEl.value);
        totalHrs += hrs;
        if (hrsEl) {
            hrsEl.textContent = hrs > 0 ? hrs + "h" : "0h";
            hrsEl.classList.toggle("has-hours", hrs > 0);
        }
    }
    var totalEl = document.getElementById("totalHours");
    if (totalEl) totalEl.textContent = totalHrs;

    var rate = parseFloat(document.getElementById("hourlyRate").value) || 0;
    var amount = totalHrs * rate;
    var amountEl = document.getElementById("scheduleAmount");
    if (amountEl) amountEl.textContent = formatCurrency(amount);

    updateSummary();
    debounceSave();
}

// ===== Dynamic Line Items =====
var _lineItemCounter = 0;

function addLineItem(desc, rate, qty) {
    var container = document.getElementById("lineItemsContainer");
    if (!container) return;

    _lineItemCounter++;
    var row = document.createElement("div");
    row.className = "line-item-row";
    row.setAttribute("data-item-id", _lineItemCounter);

    var descInput = document.createElement("input");
    descInput.type = "text";
    descInput.className = "line-item-desc";
    descInput.placeholder = "Description";
    descInput.value = desc || "";

    var rateInput = document.createElement("input");
    rateInput.type = "number";
    rateInput.className = "line-item-rate";
    rateInput.placeholder = "Rate";
    rateInput.min = "0";
    rateInput.step = "0.01";
    rateInput.inputMode = "decimal";
    rateInput.value = rate || "";

    var qtyInput = document.createElement("input");
    qtyInput.type = "number";
    qtyInput.className = "line-item-qty";
    qtyInput.placeholder = "Qty";
    qtyInput.min = "0";
    qtyInput.step = "1";
    qtyInput.inputMode = "numeric";
    qtyInput.value = qty || "";

    var amountSpan = document.createElement("span");
    amountSpan.className = "line-item-amount";
    amountSpan.textContent = "$0.00";

    var removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "line-item-remove";
    removeBtn.innerHTML = "&times;";
    removeBtn.addEventListener("click", function() {
        row.remove();
        updateSummary();
        debounceSave();
    });

    function updateRow() {
        var r = parseFloat(rateInput.value) || 0;
        var q = parseFloat(qtyInput.value) || 0;
        amountSpan.textContent = formatCurrency(r * q);
        updateSummary();
        debounceSave();
    }

    rateInput.addEventListener("input", updateRow);
    qtyInput.addEventListener("input", updateRow);
    descInput.addEventListener("input", function() { debounceSave(); });

    row.appendChild(descInput);
    row.appendChild(rateInput);
    row.appendChild(qtyInput);
    row.appendChild(amountSpan);
    row.appendChild(removeBtn);
    container.appendChild(row);

    // Trigger initial calculation if values are pre-filled
    if (rate && qty) {
        amountSpan.textContent = formatCurrency((parseFloat(rate) || 0) * (parseFloat(qty) || 0));
    }

    updateSummary();
}

function getLineItems() {
    var items = [];
    var rows = document.querySelectorAll(".line-item-row");
    for (var i = 0; i < rows.length; i++) {
        var desc = rows[i].querySelector(".line-item-desc").value.trim();
        var rate = parseFloat(rows[i].querySelector(".line-item-rate").value) || 0;
        var qty = parseFloat(rows[i].querySelector(".line-item-qty").value) || 0;
        if (desc || rate > 0 || qty > 0) {
            items.push({ description: desc, rate: rate, qty: qty, amount: rate * qty });
        }
    }
    return items;
}

// ===== Summary =====
function updateSummary() {
    var totalHrs = parseFloat(document.getElementById("totalHours").textContent) || 0;
    var rate = parseFloat(document.getElementById("hourlyRate").value) || 0;
    var schedAmt = totalHrs * rate;

    var items = getLineItems();
    var itemsAmt = 0;
    for (var i = 0; i < items.length; i++) itemsAmt += items[i].amount;

    var total = schedAmt + itemsAmt;

    var el1 = document.getElementById("summarySchedule");
    if (el1) el1.textContent = formatCurrency(schedAmt);

    var el2 = document.getElementById("summaryItems");
    var el2Line = document.getElementById("summaryItemsLine");
    if (el2) el2.textContent = formatCurrency(itemsAmt);
    if (el2Line) el2Line.style.display = itemsAmt > 0 ? "flex" : "none";

    var el3 = document.getElementById("summaryTotal");
    if (el3) el3.textContent = formatCurrency(total);

    var el4 = document.getElementById("summaryBalance");
    if (el4) el4.textContent = "AUD " + formatCurrency(total);
}

// ===== Form Initialization =====
document.addEventListener("DOMContentLoaded", initForm);

function initForm() {
    // Auto-fill today's date
    var dateInput = document.getElementById("date");
    if (dateInput && !dateInput.value) {
        dateInput.value = new Date().toISOString().split("T")[0];
    }

    // Auto-fill invoice number
    var invInput = document.getElementById("invoiceNum");
    if (invInput && !invInput.value) {
        invInput.value = getNextInvoiceNumber();
    }

    // Load draft (may override above defaults)
    loadDraft();

    // Set up required field listeners
    var fields = document.querySelectorAll("#invoiceForm [required]");
    for (var i = 0; i < fields.length; i++) {
        (function(field) {
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
            updateFieldState(field);
        })(fields[i]);
    }

    // Non-required fields draft saving
    var allInputs = document.querySelectorAll("#invoiceForm input:not([required]), #invoiceForm textarea:not([required])");
    for (var j = 0; j < allInputs.length; j++) {
        allInputs[j].addEventListener("input", function() { debounceSave(); });
        allInputs[j].addEventListener("change", function() { debounceSave(); });
    }

    // Hourly rate change updates schedule
    var rateInput = document.getElementById("hourlyRate");
    if (rateInput) {
        rateInput.addEventListener("input", updateSchedule);
        rateInput.addEventListener("change", updateSchedule);
    }

    // Initialize modules
    initStepNav();
    initSchedule();
    initUpload();
    updateProgress();
    updateStepTabs();
    updateSummary();

    // Subsection toggle (business details)
    var bizToggle = document.getElementById("bizToggle");
    if (bizToggle) {
        bizToggle.addEventListener("click", function() {
            var sub = document.getElementById("bizSubsection");
            if (sub) sub.classList.toggle("collapsed");
        });
    }

    // Section toggle headers (desktop)
    var sectionHeaders = document.querySelectorAll("[data-toggle]");
    for (var sh = 0; sh < sectionHeaders.length; sh++) {
        (function(header) {
            header.addEventListener("click", function() {
                toggleSection(header.getAttribute("data-toggle"));
            });
        })(sectionHeaders[sh]);
    }

    // Step nav buttons (prev/next)
    var stepBtns = document.querySelectorAll("[data-goto]");
    for (var sb = 0; sb < stepBtns.length; sb++) {
        (function(btn) {
            btn.addEventListener("click", function() {
                goToStep(parseInt(btn.getAttribute("data-goto"), 10));
            });
        })(stepBtns[sb]);
    }

    // Add item button
    var addBtn = document.getElementById("addItemBtn");
    if (addBtn) addBtn.addEventListener("click", function() { addLineItem("", "", ""); });

    // Modal backdrop
    var backdrop = document.getElementById("modalBackdrop");
    if (backdrop) {
        backdrop.addEventListener("click", function() {
            var modal = document.getElementById("passwordModal");
            if (modal) modal.classList.remove("active");
        });
    }

    // Generate & Clear buttons
    var genBtn = document.getElementById("generateBtn");
    if (genBtn) genBtn.addEventListener("click", fillInvoice);

    var clrBtn = document.getElementById("clearBtn");
    if (clrBtn) clrBtn.addEventListener("click", clearDraft);
}

// ===== Field Validation =====
function updateFieldState(field) {
    var group = field.closest(".form-group");
    if (!group) return;
    var hasValue = field.tagName === "SELECT" ? field.value !== "" : field.value.trim() !== "";
    var isValid = field.checkValidity();
    if (hasValue && isValid) {
        group.classList.add("filled");
    } else {
        group.classList.remove("filled");
    }
    if (group.classList.contains("touched")) {
        var errorSpan = group.querySelector(".field-error");
        if (errorSpan) errorSpan.textContent = isValid ? "" : getFieldError(field);
    }
}

function getFieldError(field) {
    if (field.validity.valid) return "";
    if (field.validity.valueMissing) return "Required";
    if (field.validity.typeMismatch) return "Invalid format";
    return field.validationMessage || "Invalid";
}

// ===== Progress =====
function updateProgress() {
    var fields = document.querySelectorAll("#invoiceForm [required]");
    var total = fields.length;
    var filled = 0;
    for (var i = 0; i < fields.length; i++) {
        var f = fields[i];
        if (f.tagName === "SELECT" ? f.value !== "" : f.value.trim() !== "") filled++;
    }
    var pct = total > 0 ? Math.round((filled / total) * 100) : 0;
    var fillEl = document.getElementById("progressFill");
    var textEl = document.getElementById("progressText");
    if (fillEl) {
        fillEl.style.width = pct + "%";
        fillEl.classList.toggle("complete", pct === 100);
    }
    if (textEl) textEl.textContent = filled + " of " + total + " fields complete";

    updateSectionStatus("section1");
    updateSectionStatus("section2");
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
        statusEl.classList.toggle("complete", isComplete);
        section.classList.toggle("section-complete", isComplete);
    }
}

// ===== Section Toggle =====
function toggleSection(sectionId) {
    if (isMobile()) return;
    var section = document.getElementById(sectionId);
    if (section) section.classList.toggle("collapsed");
}

// ===== LocalStorage Draft =====
var DRAFT_KEY = "mounir_invoice_draft";
var _saveTimer = null;

function debounceSave() {
    if (_saveTimer) clearTimeout(_saveTimer);
    _saveTimer = setTimeout(saveDraft, 500);
}

function saveDraft() {
    var form = document.getElementById("invoiceForm");
    if (!form) return;

    var data = {};
    // Save all form inputs
    var inputs = form.querySelectorAll("input, select, textarea");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].id && inputs[i].type !== "file") {
            data[inputs[i].id] = inputs[i].value;
        }
    }

    // Save schedule times
    var schedData = [];
    var rows = document.querySelectorAll(".schedule-row");
    for (var s = 0; s < rows.length; s++) {
        schedData.push({
            day: rows[s].getAttribute("data-day"),
            start: rows[s].querySelector(".schedule-start").value,
            end: rows[s].querySelector(".schedule-end").value
        });
    }
    data._schedule = schedData;

    // Save line items
    var itemRows = document.querySelectorAll(".line-item-row");
    var itemsData = [];
    for (var li = 0; li < itemRows.length; li++) {
        itemsData.push({
            desc: itemRows[li].querySelector(".line-item-desc").value,
            rate: itemRows[li].querySelector(".line-item-rate").value,
            qty: itemRows[li].querySelector(".line-item-qty").value
        });
    }
    data._lineItems = itemsData;

    data._savedAt = new Date().toISOString();

    try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    } catch (e) {}

    updateDraftStatus();
}

function loadDraft() {
    try {
        var saved = localStorage.getItem(DRAFT_KEY);
        if (!saved) return;
        var data = JSON.parse(saved);

        // Restore form fields
        var keys = Object.keys(data);
        for (var i = 0; i < keys.length; i++) {
            if (keys[i].charAt(0) === "_") continue;
            var field = document.getElementById(keys[i]);
            if (field && field.type !== "file") field.value = data[keys[i]];
        }

        // Restore schedule
        if (data._schedule) {
            var rows = document.querySelectorAll(".schedule-row");
            for (var s = 0; s < data._schedule.length && s < rows.length; s++) {
                var startEl = rows[s].querySelector(".schedule-start");
                var endEl = rows[s].querySelector(".schedule-end");
                if (startEl) startEl.value = data._schedule[s].start || "";
                if (endEl) endEl.value = data._schedule[s].end || "";
            }
        }

        // Restore line items
        if (data._lineItems && data._lineItems.length > 0) {
            for (var li = 0; li < data._lineItems.length; li++) {
                addLineItem(
                    data._lineItems[li].desc,
                    data._lineItems[li].rate,
                    data._lineItems[li].qty
                );
            }
        }

        updateDraftStatus();
        updateSchedule();
    } catch (e) {}
}

function clearDraft() {
    if (!confirm("Clear all form fields and saved draft?")) return;
    try { localStorage.removeItem(DRAFT_KEY); } catch (e) {}

    var form = document.getElementById("invoiceForm");
    if (form) form.reset();

    // Clear line items
    var container = document.getElementById("lineItemsContainer");
    if (container) container.innerHTML = "";

    // Clear receipts
    _receiptImages = [];
    renderPreviews();

    // Restore defaults
    var dateInput = document.getElementById("date");
    if (dateInput) dateInput.value = new Date().toISOString().split("T")[0];

    var invInput = document.getElementById("invoiceNum");
    if (invInput) invInput.value = getNextInvoiceNumber();

    // Restore pre-filled business values
    var defaults = {
        bizName: "M O waterproofing",
        bizAddress: "5 Bess St, Windsor QLD, Australia",
        bizPhone: "0478061622",
        bizEmail: "srayalbab2020@gmail.com",
        serviceTitle: "Waterproofing",
        hourlyRate: "40"
    };
    for (var key in defaults) {
        var el = document.getElementById(key);
        if (el) el.value = defaults[key];
    }

    // Restore Mon-Fri default start times
    var rows = document.querySelectorAll(".schedule-row");
    var weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    for (var i = 0; i < rows.length; i++) {
        var day = rows[i].getAttribute("data-day");
        var startEl = rows[i].querySelector(".schedule-start");
        var endEl = rows[i].querySelector(".schedule-end");
        if (startEl) startEl.value = weekdays.indexOf(day) >= 0 ? "06:30" : "";
        if (endEl) endEl.value = "";
    }

    // Refresh states
    var fields = form.querySelectorAll("[required]");
    for (var j = 0; j < fields.length; j++) {
        var group = fields[j].closest(".form-group");
        if (group) group.classList.remove("touched");
        updateFieldState(fields[j]);
    }
    updateProgress();
    updateStepTabs();
    updateSchedule();
    updateDraftStatus();
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

// ===== Toast =====
function showToast(message) {
    var toast = document.getElementById("successToast");
    var msgEl = document.getElementById("toastMessage");
    if (!toast) return;
    if (msgEl) msgEl.textContent = message;
    toast.classList.add("show");
    setTimeout(function() { toast.classList.remove("show"); }, 5000);
}

// ===== Loading State =====
function setGenerateLoading(loading) {
    var btn = document.getElementById("generateBtn");
    if (!btn) return;
    btn.classList.toggle("loading", loading);
}

// ===== Filename Builder =====
function buildFilename(invoiceNum, clientName) {
    var cleanClient = clientName.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, "_");
    return invoiceNum + "_" + cleanClient + ".pdf";
}

// ===== Invoice Generation Flow =====
function fillInvoice() {
    var form = document.getElementById("invoiceForm");

    // Touch all required fields
    var allFields = form.querySelectorAll("[required]");
    for (var t = 0; t < allFields.length; t++) {
        var group = allFields[t].closest(".form-group");
        if (group) group.classList.add("touched");
        updateFieldState(allFields[t]);
    }

    if (!form.checkValidity()) {
        var firstInvalid = form.querySelector("[required]:invalid");
        if (firstInvalid) {
            if (isMobile()) {
                var panel = firstInvalid.closest(".step-panel");
                if (panel) goToStep(parseInt(panel.getAttribute("data-step"), 10));
                setTimeout(function() {
                    firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
                    firstInvalid.focus();
                }, 350);
            } else {
                var section = firstInvalid.closest(".step-panel");
                if (section && section.classList.contains("collapsed")) section.classList.remove("collapsed");
                firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
                firstInvalid.focus();
            }
        }
        return;
    }

    // Check at least one line item exists
    var totalHrs = parseFloat(document.getElementById("totalHours").textContent) || 0;
    var lineItems = getLineItems();
    if (totalHrs === 0 && lineItems.length === 0) {
        showToast("Add schedule hours or line items first");
        return;
    }

    // Gather data
    var invoiceNum = document.getElementById("invoiceNum").value;
    var clientName = document.getElementById("clientName").value;
    var filename = buildFilename(invoiceNum, clientName);

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
        if (input.value !== "mounir") {
            error.textContent = "Incorrect password. Please try again.";
            input.classList.add("error");
            input.select();
            return;
        }
        cleanup();
        setGenerateLoading(true);

        // Collect all PDF data
        var rate = parseFloat(document.getElementById("hourlyRate").value) || 0;
        var scheduleLines = [];
        var rows = document.querySelectorAll(".schedule-row");
        for (var i = 0; i < rows.length; i++) {
            var startVal = rows[i].querySelector(".schedule-start").value;
            var endVal = rows[i].querySelector(".schedule-end").value;
            if (startVal && endVal && calcHours(startVal, endVal) > 0) {
                scheduleLines.push(
                    rows[i].getAttribute("data-day") + ": " +
                    formatTime12(startVal) + " to " + formatTime12(endVal)
                );
            }
        }

        var total = (totalHrs * rate);
        for (var li = 0; li < lineItems.length; li++) total += lineItems[li].amount;

        var pdfData = {
            bizName: document.getElementById("bizName").value,
            bizAddress: document.getElementById("bizAddress").value,
            bizPhone: document.getElementById("bizPhone").value,
            bizEmail: document.getElementById("bizEmail").value,
            invoiceNum: invoiceNum,
            date: formatDateAU(document.getElementById("date").value),
            dueDate: formatDateAU(document.getElementById("dueDate").value),
            clientName: clientName,
            clientAddress: document.getElementById("clientAddress").value,
            clientPhone: document.getElementById("clientPhone").value,
            clientEmail: document.getElementById("clientEmail").value,
            serviceTitle: document.getElementById("serviceTitle").value,
            scheduleRate: formatCurrency(rate),
            scheduleHours: totalHrs,
            scheduleAmount: formatCurrency(totalHrs * rate),
            scheduleLines: scheduleLines,
            additionalItems: lineItems.map(function(item) {
                return {
                    description: item.description,
                    rate: formatCurrency(item.rate),
                    qty: item.qty,
                    amount: formatCurrency(item.amount)
                };
            }),
            total: formatCurrency(total),
            receipts: _receiptImages,
            receiptCaption: document.getElementById("receiptCaption").value,
            filename: filename
        };

        // Small timeout to let loading spinner render
        setTimeout(function() {
            generatePDF(pdfData);
            incrementInvoiceNumber();
            saveDraft();
            setGenerateLoading(false);
            showToast("Invoice " + invoiceNum + " generated!");
        }, 100);
    }

    confirmBtn.onclick = attemptGenerate;
    cancelBtn.onclick = cleanup;
    input.onkeydown = function(e) {
        if (e.key === "Enter") attemptGenerate();
        if (e.key === "Escape") cleanup();
    };
}

// ===== PDF Generation =====
function generatePDF(data) {
    var jsPDF = window.jspdf.jsPDF;
    var doc = new jsPDF({ unit: "mm", format: "a4" });

    var pageW = 210;
    var pageH = 297;
    var margin = 15;
    var contentW = pageW - margin * 2;
    var rightX = pageW - margin;
    var y;

    // Colors
    var dark = [51, 51, 51];
    var gray = [136, 136, 136];
    var lightGray = [200, 200, 200];

    function checkPage(needed) {
        if (y + needed > pageH - 20) {
            doc.addPage();
            y = 20;
        }
    }

    // ===== PAGE 1: HEADER =====
    y = 20;

    // Business name (left)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(dark[0], dark[1], dark[2]);
    doc.text(data.bizName, margin, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.text(data.bizAddress, margin, y + 8);
    doc.text(data.bizPhone, margin, y + 13);
    doc.text(data.bizEmail, margin, y + 18);
    doc.text("ABN: 38 403 504 714", margin, y + 23);

    // Invoice info (right)
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.text("INVOICE", rightX, y - 4, { align: "right" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(dark[0], dark[1], dark[2]);
    doc.text(data.invoiceNum, rightX, y + 4, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.text("DATE", rightX, y + 13, { align: "right" });
    doc.setFontSize(11);
    doc.setTextColor(dark[0], dark[1], dark[2]);
    doc.text(data.date, rightX, y + 19, { align: "right" });

    doc.setFontSize(9);
    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.text("DUE DATE", rightX, y + 28, { align: "right" });
    doc.setFontSize(11);
    doc.setTextColor(dark[0], dark[1], dark[2]);
    doc.text(data.dueDate, rightX, y + 34, { align: "right" });

    doc.setFontSize(9);
    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.text("BALANCE DUE", rightX, y + 43, { align: "right" });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(dark[0], dark[1], dark[2]);
    doc.text("AUD " + data.total, rightX, y + 50, { align: "right" });

    // Separator
    y = 76;
    doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.setLineWidth(0.5);
    doc.line(margin, y, rightX, y);

    // ===== BILL TO =====
    y = 83;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.text("BILL TO", margin, y);

    y = 92;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(dark[0], dark[1], dark[2]);
    doc.text(data.clientName, margin, y);

    y += 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(dark[0], dark[1], dark[2]);
    var addrLines = doc.splitTextToSize(data.clientAddress, contentW * 0.6);
    doc.text(addrLines, margin, y);
    y += addrLines.length * 5 + 2;

    if (data.clientPhone) {
        doc.text(data.clientPhone, margin, y);
        y += 5;
    }
    if (data.clientEmail) {
        doc.text(data.clientEmail, margin, y);
        y += 5;
    }

    y += 4;

    // Separator
    doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.setLineWidth(0.5);
    doc.line(margin, y, rightX, y);
    y += 8;

    // ===== TABLE HEADER =====
    var descX = margin;
    var rateX = 125;
    var qtyX = 152;
    var amtX = rightX;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.text("DESCRIPTION", descX, y);
    doc.text("RATE", rateX, y);
    doc.text("QTY", qtyX, y);
    doc.text("AMOUNT", amtX, y, { align: "right" });

    y += 3;
    doc.setDrawColor(dark[0], dark[1], dark[2]);
    doc.setLineWidth(0.3);
    doc.line(margin, y, rightX, y);
    y += 8;

    // ===== SCHEDULE LINE ITEM =====
    if (data.scheduleHours > 0) {
        checkPage(40);

        // Title + values on same line
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(dark[0], dark[1], dark[2]);
        doc.text(data.serviceTitle, descX, y);

        doc.setFont("helvetica", "normal");
        doc.text(data.scheduleRate, rateX, y);
        doc.text(data.scheduleHours + " hrs", qtyX, y);
        doc.text(data.scheduleAmount, amtX, y, { align: "right" });

        y += 6;

        // Description text
        doc.setFontSize(9);
        doc.setTextColor(gray[0], gray[1], gray[2]);
        var descText = data.serviceTitle + " services were provided according to the following schedule:";
        var descLines = doc.splitTextToSize(descText, rateX - descX - 5);
        doc.text(descLines, descX, y);
        y += descLines.length * 4 + 3;

        // Schedule lines
        doc.setTextColor(dark[0], dark[1], dark[2]);
        for (var sl = 0; sl < data.scheduleLines.length; sl++) {
            checkPage(6);
            doc.text("- " + data.scheduleLines[sl], descX, y);
            y += 4.5;
        }

        y += 4;
    }

    // ===== ADDITIONAL LINE ITEMS =====
    for (var ai = 0; ai < data.additionalItems.length; ai++) {
        var item = data.additionalItems[ai];

        checkPage(15);

        // Dotted separator
        doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2]);
        doc.setLineWidth(0.2);
        for (var dx = margin; dx < rightX; dx += 3) {
            doc.line(dx, y, dx + 1.5, y);
        }
        y += 7;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(dark[0], dark[1], dark[2]);
        doc.text(item.description || "", descX, y);
        doc.text(item.rate, rateX, y);
        doc.text(String(item.qty), qtyX, y);
        doc.text(item.amount, amtX, y, { align: "right" });

        y += 8;
    }

    // ===== TOTAL =====
    checkPage(30);
    y += 5;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(dark[0], dark[1], dark[2]);
    doc.text("TOTAL", qtyX - 15, y);
    doc.text(data.total, amtX, y, { align: "right" });

    y += 4;
    doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.setLineWidth(0.3);
    doc.line(rateX, y, rightX, y);

    // ===== BALANCE DUE =====
    y += 14;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.text("BALANCE DUE", amtX, y, { align: "right" });

    y += 9;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(dark[0], dark[1], dark[2]);
    doc.text("AUD " + data.total, amtX, y, { align: "right" });

    y += 4;
    doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.setLineWidth(0.3);
    doc.line(rateX + 20, y, rightX, y);

    // ===== PAYMENT DETAILS =====
    y += 20;
    checkPage(40);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(gray[0], gray[1], gray[2]);
    doc.text("PAYMENT DETAILS", margin, y);

    y += 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(dark[0], dark[1], dark[2]);
    doc.text("Bank Name:  Commonwealth Bank of Australia", margin, y);
    y += 6;
    doc.text("BSB:  066013", margin, y);
    y += 6;
    doc.text("Account Number:  10214139", margin, y);
    y += 6;
    doc.text("ABN:  38 403 504 714", margin, y);

    // ===== RECEIPT PAGES =====
    if (data.receipts && data.receipts.length > 0) {
        doc.addPage();
        y = 20;

        if (data.receiptCaption) {
            doc.setFont("helvetica", "normal");
            doc.setFontSize(12);
            doc.setTextColor(dark[0], dark[1], dark[2]);
            doc.text(data.receiptCaption, margin, y);
            y += 12;
        }

        var imgMaxW = (contentW - 10) / 2;
        var col = 0;
        var rowStartY = y;

        for (var ri = 0; ri < data.receipts.length; ri++) {
            var receipt = data.receipts[ri];
            var imgAspect = receipt.height / receipt.width;
            var imgW = imgMaxW;
            var imgH = imgW * imgAspect;

            // Cap height
            if (imgH > 120) {
                imgH = 120;
                imgW = imgH / imgAspect;
            }

            // New page if needed
            if (rowStartY + imgH > pageH - 20) {
                doc.addPage();
                y = 20;
                rowStartY = y;
                col = 0;
            }

            var imgX = margin + col * (imgMaxW + 10);
            doc.addImage(receipt.dataURL, "JPEG", imgX, rowStartY, imgW, imgH);

            col++;
            if (col >= 2) {
                col = 0;
                rowStartY += imgH + 10;
            }
        }
    }

    doc.save(data.filename);
}
