/* ═══════════════════════════════════════════════
   18 Encuentros — script.js
   Funcionalidad mínima: no-invasiva, elegante
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  /* ─── 1. Ocultar secciones de audio si el archivo no existe ─── */
  /* Si el navegador no puede cargar el src, oculta el bloque de audio. */
  const reproductores = document.querySelectorAll('audio');

  reproductores.forEach(function (audio) {
    const fuente = audio.querySelector('source');
    if (!fuente) return;

    const bloque = audio.closest('.audio-bloque');
    if (!bloque) return;

    audio.addEventListener('error', function () {
      bloque.style.display = 'none';
    }, true);
  });


  /* ─── 2. Feedback sutil al intentar abrir encuentros bloqueados ─── */
  const bloqueados = document.querySelectorAll('.encuentro-card.bloqueado');

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
