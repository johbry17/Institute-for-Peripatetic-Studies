/* ─────────────────────────────────────────────────────────
   Diploma Generator — Institute for Peripatetic Studies
   ───────────────────────────────────────────────────────── */

(function () {
  'use strict';

  /* ── Number helpers ──────────────────────────────────── */
  const ones = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
    'Seventeen', 'Eighteen', 'Nineteen'
  ];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty',
                'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function intToWords(n) {
    if (n < 20)   return ones[n];
    if (n < 100)  return tens[Math.floor(n / 10)] + (n % 10 ? '-' + ones[n % 10] : '');
    if (n < 1000) return ones[Math.floor(n / 100)] + ' Hundred' +
                         (n % 100 ? ' ' + intToWords(n % 100) : '');
    if (n < 2000) return 'One Thousand' + (n % 1000 ? ' ' + intToWords(n % 1000) : '');
    return intToWords(Math.floor(n / 1000)) + ' Thousand' +
           (n % 1000 ? ' ' + intToWords(n % 1000) : '');
  }

  /* Ordinal lookup for days 1-31 */
  const ordinalWords = [
    '', 'First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh',
    'Eighth', 'Ninth', 'Tenth', 'Eleventh', 'Twelfth', 'Thirteenth',
    'Fourteenth', 'Fifteenth', 'Sixteenth', 'Seventeenth', 'Eighteenth',
    'Nineteenth', 'Twentieth', 'Twenty-First', 'Twenty-Second', 'Twenty-Third',
    'Twenty-Fourth', 'Twenty-Fifth', 'Twenty-Sixth', 'Twenty-Seventh',
    'Twenty-Eighth', 'Twenty-Ninth', 'Thirtieth', 'Thirty-First'
  ];

  function ordinal(n) {
    if (n >= 1 && n <= 31) return ordinalWords[n];
    return intToWords(n) + 'th'; /* fallback */
  }

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  /** "2026-10-23" -> "the Twenty-Third Day of October, in the Year Two Thousand Twenty-Six" */
  function formatDateFormal(iso) {
    const parts = iso.split('-');
    if (parts.length !== 3) return iso;
    const year  = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day   = parseInt(parts[2], 10);
    if (isNaN(year) || isNaN(month) || isNaN(day)) return iso;
    return 'the ' + ordinal(day) + ' Day of ' + months[month - 1] +
           ', in the Year ' + intToWords(year);
  }

  /** "2026-10-23" -> "October 23, 2026" */
  function formatDateShort(iso) {
    const parts = iso.split('-');
    if (parts.length !== 3) return iso;
    const year  = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day   = parseInt(parts[2], 10);
    if (isNaN(year) || isNaN(month) || isNaN(day)) return iso;
    return months[month - 1] + ' ' + day + ', ' + year;
  }

  /** Today as YYYY-MM-DD in local time */
  function todayISO() {
    const d  = new Date();
    const y  = d.getFullYear();
    const m  = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + dd;
  }

  /* ── DOM references ─────────────────────────────────── */
  const nameInput     = document.getElementById('recipient-name');
  const dateInput     = document.getElementById('conferral-date');
  const printBtn      = document.getElementById('print-btn');
  const validationMsg = document.getElementById('name-validation');

  const diplomaName     = document.getElementById('diploma-recipient');
  const diplomaDate     = document.getElementById('diploma-date');
  const letterDate      = document.getElementById('letter-date');
  const letterSalutation = document.getElementById('letter-salutation');
  const letterName      = document.getElementById('letter-name-body');

  /* ── Preview scaling ─────────────────────────────────── */
  function scalePreview(wrapId, docId) {
    const wrap = document.getElementById(wrapId);
    const doc  = document.getElementById(docId);
    if (!wrap || !doc) return;
    const containerWidth = wrap.offsetWidth;
    const docWidth = doc.scrollWidth || doc.offsetWidth;
    if (!docWidth) return;
    const scale = containerWidth / docWidth;
    doc.style.transform = 'scale(' + scale + ')';
    doc.style.transformOrigin = 'top left';
    wrap.style.height = Math.round(doc.scrollHeight * scale) + 'px';
  }

  function scaleAllPreviews() {
    scalePreview('diploma-wrap', 'diploma-doc');
    scalePreview('letter-wrap',  'letter-doc');
  }

  /* ── Safe text rendering ─────────────────────────────── */
  function sanitize(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /* ── Update documents ────────────────────────────────── */
  function updateDocuments() {
    const rawName  = nameInput.value.trim();
    const rawDate  = dateInput.value || todayISO();
    const display  = rawName || 'Your Name';
    const safeHtml = sanitize(display);
    const formal   = formatDateFormal(rawDate);
    const brief    = formatDateShort(rawDate);

    if (diplomaName)     diplomaName.innerHTML      = safeHtml;
    if (diplomaDate)     diplomaDate.textContent     = formal;
    if (letterDate)      letterDate.textContent      = brief;
    if (letterSalutation) letterSalutation.innerHTML = 'Dear ' + safeHtml + ',';
    if (letterName)      letterName.innerHTML        = safeHtml;

    const isValid = rawName.length > 0;
    if (printBtn) printBtn.disabled = !isValid;
    if (validationMsg)
      validationMsg.classList.toggle('visible', nameInput.value.length > 0 && !isValid);

    scaleAllPreviews();
  }

  /* ── Init ────────────────────────────────────────────── */
  function init() {
    if (!nameInput || !dateInput) return;
    dateInput.value = todayISO();
    updateDocuments();

    nameInput.addEventListener('input', updateDocuments);
    dateInput.addEventListener('input', updateDocuments);

    if (printBtn) {
      printBtn.addEventListener('click', function () {
        if (!nameInput.value.trim()) { nameInput.focus(); return; }
        window.print();
      });
    }

    window.addEventListener('resize', scaleAllPreviews);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(scaleAllPreviews);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
