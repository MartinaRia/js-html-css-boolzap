$( document ).ready(function() {
    console.log( "tutto bene fin ora!" );

    //VARIABILI ======================================================

    //per azione 3 e 4
    var ora = new Date().getHours();
    var minuti = new Date().getMinutes();


    //FUNZIONI ========================================================
    // per azione 1 ----------------------
    function showSubmitIcon(){
      $('.invia .fa-microphone').hide();
      $('.invia .fa-paper-plane').show();
    }

    function hideSubmitIcon(){
      $('.invia .fa-paper-plane').hide();
      $('.invia .fa-microphone').show();
    }

    // per azione 3 -----------------------
    function insertMessage() {
      var messaggio = $('#typing-msg').val(); //prendi il valore inserito nell'input #typing-msg

      // appendi un div con il messaggio inserito nel tread
      $('.tread').append('<div class="messaggio-utente"> <div class="text-container"> <p class="testo-messaggio">' + messaggio + '</p> <p class="message-time"> <span class="hour">' + ora + '</span>' + ':' + '<span class="minute">' + minuti + '</span> </p> <div class="icona-info"> <i class="fas fa-chevron-down"></i> <div class="info"> </div> </div> </div> </div>');
      $('#typing-msg').val('');
    }

    // per azione 4 -----------------------
    function insertRandomReply(){
      var randomReply = ['ok', 'who are you?', 'wtf?!', 'Where have you been? I ve missed you', 'Look who s back!', 'Thank you!', 'no way!', 'sure!', 'i ll use my super power to help you!'];
      var reply = randomReply[Math.floor(Math.random() * randomReply.length)]; //prendi una risposta random tra quelle dell'array

      // appendi il div con la risposta random nel tread
      $('.tread').append('<div class="messaggio-chat-guy"> <div class="chat-guy-text-container"> <p class="chat-guy-testo-messaggio"> ' + reply + '</p><p class="chat-guy-message-time"> <span class="hour">' + ora + '</span>:<span class="minute">' + minuti + '</span> </p> <div class="icona-info"> <i class="fas fa-chevron-down"></i> <div class="chat-guy-info">  </div> </div> </div>');
    }

    // [inutilizzata] -------------------------
    function getTheTime(selectorOra, selectorMinuti){
      var ora = new Date().getHours();
      var minuti = new Date().getMinutes();

      selectorOra.html(ora);
      selectorMinuti.html(minuti);
    }


    // AZIONI ===========================================================
    //1. apparizione e sparizione icona aeroplano
    $('#typing-msg').focusin(
      showSubmitIcon
    );

    $('#typing-msg').focusout(
      function(){
        if ($(this).val() == '') {
          hideSubmitIcon();
        } else {
          showSubmitIcon();
        }
      }
    );

    $('.invia .fa-paper-plane').click(
      hideSubmitIcon
    );

    //2. apparizione icona-info con hover text-container [NOT WORKING!!!!]
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
      function (){

        insertMessage();

        // 4. risposta automatica di chat guy dopo 1 secondo dall'invio del msg di UTENTE
        setTimeout(insertRandomReply, 1000);
      }
    );

    // 3.1 stessa cosa del punto 3 ma l'evento è scatenzato al keypress invece che al click
    $("#typing-msg").keypress(function(event) {
        if (event.keyCode === 13) { //il 13 corrisponde al tasto Enter
          insertMessage();
          setTimeout(insertRandomReply, 1000);
          hideSubmitIcon();
        }
    });





}); //doc ready
