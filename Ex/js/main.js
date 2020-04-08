$( document ).ready(function() {
    console.log( "tutto bene fin ora!" );

    //VARIABILI ======================================================

    //per azione 2 e 3
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

    // per funzione insertMessage e insertRandomReply ---------
    function showIconaInfo(){
      $('.icona-info').hide();
      $('.text-container-i').hover(
        function(){
          $('.icona-info', this).fadeIn('fast', 'linear');
        },
        function(){
          $('.icona-info', this).fadeOut('fast', 'linear');
        }
      );
    }

    // per azione 2 -----------------------
    function insertMessage() {
      var messaggio = $('#typing-msg').val(); //prendi il valore inserito nell'input #typing-msg

      // appendi un div con il messaggio inserito nel tread
      $('.tread').append('<div class="messaggio-utente"> <div class="text-container text-container-i"> <p class="testo-messaggio">' + messaggio + '</p> <p class="message-time"> <span class="hour">' + ora + '</span>' + ':' + '<span class="minute">' + minuti + '</span> </p> <div class="icona-info"> <i class="fas fa-chevron-down"></i> <div class="info"> </div> </div> </div> </div>');
      $('#typing-msg').val('');

      showIconaInfo();
    }

    // per azione 3 -----------------------
    function insertRandomReply(){
      var randomReply = ['ok', 'who are you?', 'wtf?!', 'Where have you been? I ve missed you', 'Look who s back!', 'Thank you!', 'no way!', 'sure!', 'i ll use my super power to help you!'];
      var reply = randomReply[Math.floor(Math.random() * randomReply.length)]; //prendi una risposta random tra quelle dell'array

      // appendi il div con la risposta random nel tread
      $('.tread').append('<div class="messaggio-chat-guy"> <div class="chat-guy-text-container text-container-i"> <p class="chat-guy-testo-messaggio"> ' + reply + '</p><p class="chat-guy-message-time"> <span class="hour">' + ora + '</span>:<span class="minute">' + minuti + '</span> </p> <div class="icona-info"> <i class="fas fa-chevron-down"></i> <div class="chat-guy-info">  </div> </div> </div>');

      showIconaInfo();
    }

    // [inutilizzata] -------------------------
    function getTheTime(selectorOra, selectorMinuti){
      var ora = new Date().getHours();
      var minuti = new Date().getMinutes();

      selectorOra.html(ora);
      selectorMinuti.html(minuti);
    }


    // AZIONI ===========================================================
    // 1. apparizione e sparizione icona aeroplano
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


    // 2. inserisci messaggio al click dell'aeroplano
    $('.invia .fa-paper-plane').click(
      function (){

        insertMessage();

        // 3. risposta automatica di chat guy dopo 1 secondo dall'invio del msg di UTENTE
        setTimeout(insertRandomReply, 1000);
      }
    );

    // 2.1 stessa cosa del punto 2 ma l'evento è scatenzato al keypress invece che al click
    $("#typing-msg").keypress(function() {
        if (event.keyCode === 13) { //il 13 corrisponde al tasto Enter
          insertMessage();
          setTimeout(insertRandomReply, 1000);
          hideSubmitIcon();
        }
    });

    // 3. gestisci filtro contatti (div cerca)
      $('#cerca-chat').keyup( //ogni volta che viene premuto un tasto(qualsiasi della tastiera) nel campo 'cerca'
        function(){
          var stringa1 = $('#cerca-chat').val().toLowerCase(); // salvarmi input utente in campo del filtro (stringa1)
          console.log(stringa1);

          // selezionare tutti i blocchi di contatto e ciclare tra di essi (each())
          $('.contact-name').each(
            function(){
              var stringa2 = $(this).text().toLowerCase(); //salvo in una var il valore del testo del nome nel contatto (stringa2)
              console.log(stringa2);

              var confronto = stringa2.includes(stringa1); // confronto per vedere se la stringa inserita nell'input è inclusa nel nome del contatto stringa2.includes(stringa1)
              console.log(confronto);

              if (confronto) { //se l'occorenza è stata trovata lascio il blocco di contatto visibile

              } else { // altrimenti lo rendo non visibile (this)
                $(this).parents('.contact-conainer').hide();
              }

            }
          );

        }
      );
