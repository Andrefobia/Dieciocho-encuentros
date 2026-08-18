/* ═══════════════════════════════════════════════
   18 Encuentros — script.js
   Funcionalidad mínima: no-invasiva, elegante
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  /* ─── 1. Ocultar secciones de audio si el archivo no existe ─── */
  /* Usa fetch HEAD para verificar la existencia real del archivo.
     El evento 'error' del elemento <audio> no es fiable en móvil:
     algunos navegadores Android lo disparan aunque el archivo exista,
     porque deciden no precargar para ahorrar datos. */
  var reproductores = document.querySelectorAll('audio');

  reproductores.forEach(function (audio) {
    var fuente = audio.querySelector('source');
    if (!fuente) return;

    var bloque = audio.closest('.audio-bloque');
    if (!bloque) return;

    var url = fuente.getAttribute('src');

    fetch(url, { method: 'HEAD' })
      .then(function (res) {
        if (!res.ok) {
          bloque.style.display = 'none';
        }
      })
      .catch(function () {
        /* Error de red genérico — no ocultar.
           Si hay problema real de red el audio lo mostrará al usuario. */
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


  /* ─── 3. Forzar cierre de oración con Amén visible al hacer scroll ─── */
  /* (No hace nada invasivo, solo prepara el terreno para futuras mejoras) */

});
