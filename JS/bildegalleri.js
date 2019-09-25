var bildegallerier = document.querySelectorAll('.bildegalleri');

// Kan ha flere bildegallerier på hver side
bildegallerier.forEach(function(galleri) {
  var forrige = galleri.querySelector('.button.left');
  var neste = galleri.querySelector('.button.right');
  var dots = galleri.querySelector('.dots');

  var antallBilder = galleri.querySelectorAll('.bilde').length;

  galleri.dataset.bildenummer = 1;

  // Ved klikk på knappene, gå til forrige/neste bilde
  forrige.addEventListener('click', function() {
    var nyttNummer = Number(galleri.dataset.bildenummer) - 1;
    if (nyttNummer < 1) {
      nyttNummer = antallBilder;
    }
    visBilde(galleri, nyttNummer);
  });
  neste.addEventListener('click', function() {
    var nyttNummer = Number(galleri.dataset.bildenummer) + 1;
    if (nyttNummer > antallBilder) {
      nyttNummer = 1;
    }
    visBilde(galleri, nyttNummer);
  });
  // Ved klikk på prikkene, gå til bildet tilhørende knappen som ble trykket.
  dots.addEventListener('click', function(e) {
    var nyttNummer;
    Array.prototype.forEach.call(dots.children, function(element, i) {
      if (element === e.target) {
        nyttNummer = i + 1;
      }
    });
    visBilde(galleri, nyttNummer);
  });

  // Bytt til neste bilde etter 5 sekunder
  setInterval(function() {
    var nyttNummer = Number(galleri.dataset.bildenummer) + 1;
    if (nyttNummer > antallBilder) {
      nyttNummer = 1;
    }
    visBilde(galleri, nyttNummer);
  }, 5000);
});

// Tar seg av å bytte bilde
function visBilde(galleri, bildenr) {
  var bilder = galleri.querySelectorAll('.bilde');
  var dots = galleri.querySelectorAll('.dots .dot');

  // Skjul aktivt bilde
  var aktivtBilde = galleri.querySelector('.bilde.aktiv');
  aktivtBilde.classList.remove('aktiv');
  // Fade-effekt
  aktivtBilde.classList.add('fade');
  setTimeout(function() {
    aktivtBilde.classList.remove('fade');
  }, 1000);

  // Når forrige bilde er borte (etter 1s), vis det neste bildet
  setTimeout(function() {
    // Fjern aktiv prikk og vis ny aktiv
    dots.forEach(function(dot) {
      dot.classList.remove('aktiv');
    });
    dots[bildenr - 1].classList.add('aktiv');

    var bilde = bilder[bildenr - 1];
    bilde.classList.add('fade');

    // Lagre bildenummeret.
    galleri.dataset.bildenummer = bildenr;

    // Fade-effekt
    setTimeout(function() {
      bilde.classList.remove('fade');
      bilde.classList.add('aktiv');
    }, 100);
  }, 1000);
}
