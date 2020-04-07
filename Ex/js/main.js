$( document ).ready(function() {
    console.log( "tutto bene fin ora!" );

    //FUNZIONI --------------------------------------------------------
    // per azione 1
    function showSubmitIcon(){
      $('.invia .fa-microphone').hide();
      $('.invia .fa-paper-plane').show();
    };

    function hideSubmitIcon(){
      $('.invia .fa-paper-plane').hide();
      $('.invia .fa-microphone').show();
    };

    //per azione 3 e altro
    /*function getTheTime(selectorOra, selectorMinuti){
      var ora = new Date().getHours();
      var minuti = new Date().getMinutes();

      selectorOra.html(ora);
      selectorMinuti.html(minuti);
    };*/

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
    $('.icona-info').hide();
    $('.text-container').hover(
      function(){
        $('.icona-info', this).fadeToggle('fast', 'linear');
      },
      function(){
        $('.icona-info', this).fadeToggle('fast', 'linear');
      }
    );


    // 3. inserisci messaggio al click dell'aeroplano

    $('.invia .fa-paper-plane').click(
      function(){
        var messaggio = $('#typing-msg').val();
        var ora = new Date().getHours();
        var minuti = new Date().getMinutes();

        $('.tread').append('<div class="messaggio-utente"> <div class="text-container"> <p class="testo-messaggio">' + messaggio + '</p> <p class="message-time"> <span class="hour">' + ora + '</span>' + ':' + '<span class="minute">' + minuti + '</span> </p> <div class="icona-info"> <i class="fas fa-chevron-down"></i> <div class="info"> </div> </div> </div> </div>');
        $('#typing-msg').val('');

      }
    );



});
