/* ═══════════════════════════════════════════════
   18 Encuentros — script.js
   Funcionalidad mínima: no-invasiva, elegante
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  /* ─── 1. Audio: compatibilidad móvil + ocultar si no existe ─── */
  var reproductores = document.querySelectorAll('audio');

  reproductores.forEach(function (audio) {
    var fuente = audio.querySelector('source');
    if (!fuente) return;

    var bloque = audio.closest('.audio-bloque');
    if (!bloque) return;

    var url = fuente.getAttribute('src');

    /* Mover src directamente al elemento <audio> mejora la compatibilidad
       en Android Chrome vs usar <source> anidado */
    audio.setAttribute('src', url);
    audio.setAttribute('preload', 'metadata');

    /* Verificar existencia del archivo y ocultar bloque si no existe */
    fetch(url, { method: 'HEAD' })
      .then(function (res) {
        if (!res.ok) {
          bloque.style.display = 'none';
        }
      })
      .catch(function () {
        /* Error de red genérico — no ocultar */
      });
  });


  /* ─── 2. Feedback sutil al intentar abrir encuentros bloqueados ─── */
  var bloqueados = document.querySelectorAll('.encuentro-card.bloqueado');

  bloqueados.forEach(function (card) {
    card.addEventListener('click', function () {
      card.style.transition = 'opacity 0.1s';
      card.style.opacity = '0.2';
      setTimeout(function () {
        card.style.opacity = '';
      }, 300);
    });
  });

});
