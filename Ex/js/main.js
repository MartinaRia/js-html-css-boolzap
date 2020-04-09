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
          if ($(".info", this).is(":visible")) {
            $('.icona-info', this).show();
          } else {
            $('.icona-info', this).fadeOut('fast', 'linear');
          }

        }
      );
    }

    // per azione 2 -----------------------
    function insertMessage() {
      var messaggio = $('#typing-msg').val(); //prendi il valore inserito nell'input #typing-msg

      // appendi un div con il messaggio inserito nel tread
      $('.tread.active').append('<div class="messaggio-utente messaggio"> <div class="text-container text-container-i"> <p class="testo-messaggio">' + messaggio + '</p> <p class="message-time"> <span class="hour">' + ora + '</span>' + ':' + '<span class="minute">' + minuti + '</span> </p> <div class="icona-info"><i class="fas fa-chevron-down"></i><div class="info"><p class="delete-msg">Cancella Messaggio</p></div></div> </div> </div>');
      $('#typing-msg').val('');

      showIconaInfo(); //[alternativa all' EVENT DELEGATION]
    }

    // per azione 3 -----------------------
    function insertRandomReply(){
      var randomReply = ['ok', 'who are you?', 'wtf?!', 'Where have you been? I ve missed you', 'Look who s back!', 'Thank you!', 'no way!', 'sure!', 'i ll use my super power to help you!'];
      var reply = randomReply[Math.floor(Math.random() * randomReply.length)]; //prendi una risposta random tra quelle dell'array

      // appendi il div con la risposta random nel tread
      $('.tread.active').append('<div class="messaggio-chat-guy messaggio"> <div class="chat-guy-text-container text-container-i"> <p class="chat-guy-testo-messaggio"> ' + reply + '</p><p class="chat-guy-message-time"> <span class="hour">' + ora + '</span>:<span class="minute">' + minuti + '</span> </p> <div class="icona-info"> <i class="fas fa-chevron-down"></i> <div class="info"> <p class="delete-msg">Cancella Messaggio</p> </div> </div> </div> </div>');

      showIconaInfo();
    }

    // [inutilizzata] -------------------------
    /*function getTheTime(selectorOra, selectorMinuti){
      var ora = new Date().getHours();
      var minuti = new Date().getMinutes();

      selectorOra.html(ora);
      selectorMinuti.html(minuti);
    }*/


    // AZIONI ===========================================================
    // ---------------- 1. apparizione e sparizione icona aeroplano
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


    // ---------------- 2. inserisci messaggio al click dell'aeroplano
    $('.invia .fa-paper-plane').click(
      function (){

        insertMessage();

        // ---------------- 3. risposta automatica di chat guy dopo 1 secondo dall'invio del msg di UTENTE
        setTimeout(insertRandomReply, 1000);
      }
    );

    // ---------------- 2.1 stessa cosa del punto 2 ma l'evento è scatenzato al keypress invece che al click
    $("#typing-msg").keypress(
      function() {
        showSubmitIcon();
        if (event.keyCode === 13) { //il 13 corrisponde al tasto Enter
          insertMessage();
          setTimeout(insertRandomReply, 1000);
          hideSubmitIcon();
        }
    });

    // ---------------- 4. gestisci filtro contatti (div cerca)
    $('#cerca-chat').keyup( //ogni volta che viene premuto un tasto(qualsiasi della tastiera) nel campo 'cerca'
        function(){
          var stringa1 = $('#cerca-chat').val().toLowerCase(); // salvarmi input utente in campo del filtro (stringa1)

          // selezionare tutti i blocchi di contatto e ciclare tra di essi (each())
          $('.contact-name').each(
            function(){
              var stringa2 = $(this).text().toLowerCase(); //salvo in una var il valore del testo del nome nel contatto (stringa2)

              var confronto = stringa2.includes(stringa1); // confronto per vedere se la stringa inserita nell'input è inclusa nel nome del contatto stringa2.includes(stringa1)

              if (confronto) { //se l'occorenza è stata trovata lascio il blocco di contatto visibile
                $(this).parents('.contact-conainer').show();
              } else { // altrimenti lo rendo non visibile (this)
                $(this).parents('.contact-conainer').hide();
              }

            });

        });

      // ---------------- 5.1 Mostra messaggio 'cancella' al click di icona info [EVENT DELEGATION]
      $('.tread').on('click', '.fa-chevron-down',
        function(){
          $(this).siblings().toggle();
        }
      );

      //---------------- 5.2 Cancella messaggio al click su 'delete-msg' [EVENT DELEGATION]
      $('.tread').on('click', '.delete-msg',
        function () {
          $(this).parents('.messaggio').hide();
        }
      );

      //---------------- 6. //Click sul contatto mostra la conversazione del contatto cliccato



      $('.contact-conainer').click(
        function() {
          //assegna classe active al contatto selezionato (cambio background)
          $('.contact-conainer').removeClass('active');
          $(this).addClass('active');

          var activeContactIndx = $(this).index(); // modo alternativo di scrivere $('.contact-conainer').index(this);
          // $('.tread').hide();
          // $('.tread.active').show();
          var oldTreadActive = $('.tread.active')
          oldTreadActive.removeClass('active');
          var newActive = $('.tread').eq(activeContactIndx).addClass('active');
          newActive.show()
          $('.tread').not('.tread.active').hide()



        }
      );













}); //doc ready
