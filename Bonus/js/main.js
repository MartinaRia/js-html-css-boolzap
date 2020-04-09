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
      $('.chat').on('click', '.fa-chevron-down',
        function(){
          $(this).siblings().toggle();
        }
      );

      //---------------- 5.2 Cancella messaggio al click su 'delete-msg' [EVENT DELEGATION]
      $('.chat').on('click', '.delete-msg',
        function () {
          $(this).parents('.messaggio').hide();
        }
      );

      //---------------- 6. //Click sul contatto mostra la conversazione del contatto cliccato

      // Creazione treads (tante quanti sono i contatti)
      for (var i = 1; i < $('.contact-conainer').length ; i++) {
        $('.chat').append('<div class="tread"> </div>');
      }

      $('.contact-conainer').click( // event delegation not required
        function() {
          // A. Cambio colore background del contatto attivo -------
          //assegna classe active al contatto selezionato
          $('.contact-conainer').removeClass('active');
          $(this).addClass('active');
          // salvo in una var l'index del contatto attivo
          var activeContactIndx = $(this).index(); // [modo alternativo di scrivere $('.contact-conainer').index(this);]

          // B. Mostro il contatto selezionato nell'header della tread attiva -----
          var activeContactName = $('.contact-name', this).html(); // Salvo il nome del contatto attivo
          var activeContactPic = $('.profile-img-contacts', this).attr('src'); // Salvo la foto del contatto attivo
          $('.chatting-guy-name h3').html(activeContactName); // ignetto nome nel rispettivo campo dell header
          $('.chatting-guy .profile-img-top').attr('src', activeContactPic); // ignetto foto nel nome nel rispettivo campo dell header

          // C. Mostro la chat relativa al contatto selezionato -------
          var oldTreadActive = $('.tread.active'); //tieni traccia del tread attivo
          oldTreadActive.removeClass('active'); // rimuovi la classe attivo dal div attivo precedentemente
          var newActive = $('.tread').eq(activeContactIndx).addClass('active'); // individua il tread con stesso index del contatto selezionato
          newActive.show(); //display la tread appena individuata e segnata come attiva
          $('.tread').not('.tread.active').hide(); // nascondi tutte le treads tranne quella attiva
        }
      );





}); //doc ready
