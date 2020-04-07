$( document ).ready(function() {
    console.log( "tutto bene fin ora!" );

    //FUNZIONI --------------------------------------------------------
    // per azione 1
    function showSubmitIcon(){
      $('.invia .fa-microphone').hide();
      $('.invia .fa-paper-plane').show();
    }

    function hideSubmitIcon(){
      $('.invia .fa-paper-plane').hide();
      $('.invia .fa-microphone').show();
    }

    //AZIONI ----------------------------------------------------------
    //1. apparizione e sparizione icona aeroplano
    $('#typing-msg').focusin(
      showSubmitIcon
    );

    $('#typing-msg').focusout(
      function(){
        if ($(this).val() == '') {
          hideSubmitIcon()
        } else {
          showSubmitIcon()
        }
      }
    );


    //2. apparizione icona-info con hover text-container
    $('.text-container').hover(
      function(){
        $('.icona-info').fadeToggle('fast', 'linear')
      },
      function(){
        $('.icona-info').fadeToggle('fast', 'linear')
      }
    )


    // 3. inserisci messaggio al click dell'aeroplano
    // VARIABILI


    // EVENTO
    $('.invia .fa-paper-plane').click(
      function(){
        var messaggio = $('#typing-msg').val();
        $('.testo-messaggio').html(messaggio)
      }
    )



});
