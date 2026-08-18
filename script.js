/* ═══════════════════════════════════════════════
   18 Encuentros — script.js
   Funcionalidad mínima: no-invasiva, elegante
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  /* ─── 1. Audio: compatibilidad móvil ─── */
  /*
   * Fix para Android Chrome:
   *   - Mover src de <source> al propio <audio> mejora la compatibilidad.
   *   - preload="none" puede impedir la carga en móvil; se cambia a "metadata".
   *
   * El chequeo de existencia (fetch HEAD) solo aplica a bloques
   * con clase .audio-bloque (estilo enc1), donde el bloque
   * se oculta si el archivo no existe en el servidor.
   */
  var reproductores = document.querySelectorAll('audio');

  reproductores.forEach(function (audio) {
    var fuente = audio.querySelector('source');
    if (!fuente) return;

    var url = fuente.getAttribute('src');

    /* Aplicar fix de src y preload a TODOS los audios */
    audio.setAttribute('src', url);
    if (audio.getAttribute('preload') === 'none' || !audio.hasAttribute('preload')) {
      audio.setAttribute('preload', 'metadata');
    }

    /* Ocultar bloque si el archivo no existe — solo para .audio-bloque */
    var bloque = audio.closest('.audio-bloque');
    if (!bloque) return;

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
