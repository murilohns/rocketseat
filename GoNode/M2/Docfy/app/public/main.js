$(document).ready(() => {
  /**
   * Alerts
   */
  setTimeout(() => {
    const alert = document.querySelector('.alert');

    if (alert) alert.className += ' alert-hidden';
  }, 3000);

  /** MDE */
  $('.mde').each(function () {
    const simplemde = new SimpleMDE({
      element: this,
      spellChecker: false,
      status: false,
    });
  });

  /**
   * Modals
   */
  $('[data-modal-open]').click(function (event) {
    event.preventDefault();
    $($(this).data('modal-open')).addClass('activeModal');
  });

  $('[data-modal-close]').click(function (event) {
    event.preventDefault();
    $($(this).data('modal-close')).removeClass('activeModal');
  });

  $(document).keydown((e) => {
    e = e || window.event;
    if (e.keyCode == 27) {
      $('.modal').removeClass('activeModal');
    }
  });
});
