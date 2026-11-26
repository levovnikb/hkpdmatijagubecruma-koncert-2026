'use strict';

/* =======================================================
   PODACI O KONCERTU: ovde menjaj redosled i nazive tačaka.
   PAŽNJA: tačke ispod su DEMONSTRACIONE, nisu konačan program.
   ======================================================= */
const koncert = {
  datum: '5. decembar 2026.',
  vreme: '19.00 časova',
  mesto: 'Velika dvorana Kulturnog centra Ruma',
  pocetak: '2026-12-05T19:00:00+01:00', // vreme u Srbiji
  trajanjeSati: 2,
  tacke: []
};

/* Popunjava datum, vreme, mesto i program koncerta. */
function prikaziProgram() {
  const podaci = {
    'event-date': koncert.datum,
    'event-time': koncert.vreme,
    'event-venue': koncert.mesto
  };
  Object.entries(podaci).forEach(([id, vrednost]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = vrednost;
  });

   const lista = document.getElementById('program-list');
  const broj = document.getElementById('program-count');
  const napomena = document.querySelector('.program-note');

  if (!lista) return;

  if (koncert.tacke.length === 0) {
    lista.innerHTML = '<p class="program-soon">USKORO</p>';

    if (broj) broj.textContent = '';
    if (napomena) napomena.hidden = true;

    return;
  }

  if (napomena) napomena.hidden = false;
  if (broj) broj.textContent = `${koncert.tacke.length} tačaka`;

  const fragment = document.createDocumentFragment();

  koncert.tacke.forEach((tacka, index) => {
    const item = document.createElement('article');
    item.className = 'program-item';

    const redniBroj = document.createElement('span');
    redniBroj.className = 'program-number';
    redniBroj.textContent = String(index + 1).padStart(2, '0');

    const sadrzaj = document.createElement('div');
    const naslov = document.createElement('h3');
    naslov.className = 'program-title';
    naslov.textContent = tacka.naziv;

    const izvodjac = document.createElement('p');
    izvodjac.className = 'program-performer';
    izvodjac.textContent = tacka.izvodjac;
    sadrzaj.append(naslov, izvodjac);

    const oznaka = document.createElement('span');
    oznaka.className = 'program-badge';
    oznaka.textContent = tacka.vrsta;

    item.append(redniBroj, sadrzaj, oznaka);
    fragment.append(item);
  });

  lista.replaceChildren(fragment);
}

/* Tri stanja: odbrojavanje → koncert u toku → zahvalnica. */
function pokreniOdbrojavanje() {
  const timer = document.getElementById('countdown-timer');
  const naslov = document.querySelector('.countdown-heading');
  const status = document.getElementById('concert-status');
  const polja = ['days', 'hours', 'minutes', 'seconds'].map(id => document.getElementById(id));
  if (!timer || !naslov || !status || polja.some(polje => !polje)) return;

  const pocetak = new Date(koncert.pocetak).getTime();
  const kraj = pocetak + koncert.trajanjeSati * 60 * 60 * 1000;
  if (!Number.isFinite(pocetak)) return;

  function azuriraj() {
    const sada = Date.now();
    if (sada < pocetak) {
      const preostaloSekundi = Math.max(0, Math.ceil((pocetak - sada) / 1000));
      const dani = Math.floor(preostaloSekundi / 86400);
      const sati = Math.floor((preostaloSekundi % 86400) / 3600);
      const minuti = Math.floor((preostaloSekundi % 3600) / 60);
      const sekunde = preostaloSekundi % 60;
      [dani, sati, minuti, sekunde].forEach((vrednost, indeks) => {
        polja[indeks].textContent = String(vrednost).padStart(2, '0');
      });
      timer.hidden = false;
      naslov.hidden = false;
      status.hidden = true;
      return;
    }

    timer.hidden = true;
    naslov.hidden = true;
    status.hidden = false;
    const poruka = sada < kraj
      ? '♫ Koncert je u toku! Uživajte u programu.'
      : 'Hvala vam na pažnji i druženju!';
    if (status.textContent !== poruka) status.textContent = poruka;
  }

  azuriraj();
  setInterval(azuriraj, 1000);
  window.addEventListener('focus', azuriraj);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) azuriraj();
  });
}

prikaziProgram();
pokreniOdbrojavanje();
