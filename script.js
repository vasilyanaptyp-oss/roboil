(function () {
  var form = document.getElementById('forma');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    var v = form.elements;
    var lines = [
      'Marka i model: ' + v.auto.value.trim(),
      'Usługa: ' + v.usluga.value,
      'Preferowany termin: ' + (v.termin.value.trim() || 'bez preferencji'),
      'Telefon: ' + v.telefon.value.trim(),
      '',
      'Uwagi: ' + (v.uwagi.value.trim() || 'brak'),
      '',
      'Wyrażam zgodę na przetwarzanie danych w celu umówienia wizyty.'
    ];
    window.location.href = 'mailto:roboil@wp.pl' +
      '?subject=' + encodeURIComponent('Zgłoszenie wizyty: ' + v.auto.value.trim()) +
      '&body=' + encodeURIComponent(lines.join('\r\n'));
  });
})();
