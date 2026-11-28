'use strict';

/* =======================================================
   PODACI O KONCERTU: ovde menjaj redosled i nazive tačaka.
   Program je podeljen na dva dela, prema dostavljenom redosledu.
   ======================================================= */
const koncert = {
  datum: '5. decembar 2026.',
  vreme: '19.00 časova',
  mesto: 'Velika dvorana Kulturnog centra Ruma',
  pocetak: '2026-12-05T19:00:00+01:00', // vreme u Srbiji
  trajanjeSati: 2,
  grupe: [
  {
    "naziv": "Tamburaški orkestar",
    "drustvo": "HKPD „Matija Gubec“ Ruma",
    "tacke": [
      {
        "naziv": "Rumo, lepotice",
        "autor": "Josip Jurca",
        "detalji": [
          "Vokalni solista: Dušan Stupar"
        ]
      },
      {
        "naziv": "Jutarnje raspoloženje",
        "autor": "Edvard Grig",
        "detalji": [
          "Aranžman: Predrag Pavlović"
        ]
      },
      {
        "naziv": "My favorite things",
        "autor": "Ričard Rodžers",
        "detalji": [
          "Vokalna solistkinja: Marija Benčić",
          "Aranžman: Predrag Pavlović"
        ]
      },
      {
        "naziv": "Lal",
        "autor": "Sertab Erener",
        "detalji": [
          "Vokalna solistkinja: Milica Atanacković",
          "Aranžman: Predrag Pavlović"
        ]
      },
      {
        "naziv": "Tri sam ti zime šaptala ime",
        "autor": "Tonči Huljić/Magazin",
        "detalji": [
          "Vokalna solistkinja: Nikolina Gašparović",
          "Aranžman: Predrag Pavlović"
        ]
      },
      {
        "naziv": "Juliška",
        "autor": "Miroslav Škoro",
        "detalji": [
          "Vokalni solista: Albin Ljikaj",
          "Aranžman: Predrag Pavlović"
        ]
      },
      {
        "naziv": "Elegija za tamburaški orkestar",
        "autor": "Predrag Pavlović",
        "detalji": []
      },
      {
        "naziv": "Zemljo moja",
        "autor": "Ismeta Krvavac",
        "detalji": [
          "Vokalna solistkinja: Katarina Atanacković",
          "Aranžman: Predrag Pavlović"
        ]
      },
      {
        "naziv": "Milo moje",
        "autor": "Bisera Valetanlić",
        "detalji": [
          "Vokalna solistkinja: Marija Benčić",
          "Aranžman: Predrag Pavlović"
        ]
      },
      {
        "naziv": "Ako poludim",
        "autor": "Tonči Huljić/Magazin",
        "detalji": [
          "Vokalna solistkinja: Nikolina Gašparović",
          "Aranžman: Predrag Pavlović"
        ]
      },
      {
        "naziv": "Neka, neka",
        "autor": "Frajle",
        "detalji": [
          "Vokalna solistkinja: Milica Atanacković",
          "Aranžman: Predrag Pavlović"
        ]
      },
      {
        "naziv": "Tri evergrin pesme",
        "autor": "",
        "detalji": [
          "Vokalna solistkinja: Katarina Atanacković",
          "Aranžman: Predrag Pavlović"
        ]
      }
    ]
  },
  {
    "naziv": "HKC „Bunjevačko kolo“ Subotica",
    "drustvo": "Gosti koncerta",
    "tacke": [
      {
        "naziv": "Bunjevački plesovi",
        "autor": "",
        "detalji": []
      },
      {
        "naziv": "Svirka na gajdama",
        "autor": "",
        "detalji": []
      },
      {
        "naziv": "Gazdačko kolo",
        "autor": "",
        "detalji": []
      },
      {
        "naziv": "Splet bunjevačkih pesama",
        "autor": "",
        "detalji": []
      },
      {
        "naziv": "Momačko kolo",
        "autor": "",
        "detalji": []
      },
      {
        "naziv": "Nadigravanje – Subotičko kolo",
        "autor": "",
        "detalji": []
      }
    ]
  }
],
  izdvojenaTacka: {
    naziv: 'Moj kićeni Srem',
    autor: 'Josip Jurca',
    detalji: ['Vokalni solista: Dušan Stupar']
  },
  saradnici: [
  [
    "Umetnički rukovodilac folklorne sekcije HKC „Bunjevačko kolo“ Subotica",
    "Marin Jaramazović"
  ],
  [
    "Umetnički rukovodilac i dirigent Tamburaškog orkestra",
    "Predrag Pavlović"
  ],
  [
    "Voditelji programa",
    "Milena Mikolaci i Aleksandar Major"
  ],
  [
    "Scenografija",
    "Aleksandra Stanković Jovanović"
  ]
]
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

  const ukupanBroj = koncert.grupe.reduce((zbir, grupa) => zbir + grupa.tacke.length, 0) + (koncert.izdvojenaTacka ? 1 : 0);
  if (!ukupanBroj) {
    lista.innerHTML = '<p class="program-soon">USKORO</p>';
    if (broj) broj.textContent = '';
    if (napomena) napomena.hidden = true;
    return;
  }
  if (napomena) napomena.hidden = false;
  if (broj) broj.textContent = `${ukupanBroj} tačaka`;
  const fragment = document.createDocumentFragment();
  let redniBroj = 0;
  function element(tag, klasa, tekst) {
    const el = document.createElement(tag);
    el.className = klasa;
    el.textContent = tekst;
    return el;
  }
  koncert.grupe.forEach((grupa, index) => {
    const sekcija = document.createElement('section');
    sekcija.className = 'program-group';
    const naslov = element('h3', 'program-group-title', grupa.naziv);
    naslov.id = `program-group-${index + 1}`;
    sekcija.setAttribute('aria-labelledby', naslov.id);
    const zaglavlje = document.createElement('div');
    zaglavlje.className = 'program-group-heading';
    zaglavlje.append(element('p', 'program-group-kicker', grupa.drustvo), naslov);
    sekcija.append(zaglavlje);
    grupa.tacke.forEach(tacka => {
      const item = document.createElement('article');
      item.className = 'program-item program-item-full';
      const sadrzaj = document.createElement('div');
      if (tacka.autor) sadrzaj.append(element('p', 'program-author', tacka.autor));
      sadrzaj.append(element('h4', 'program-title', tacka.naziv));
      tacka.detalji.forEach(detalj => sadrzaj.append(element('p', 'program-performer', detalj)));
      item.append(element('span', 'program-number', String(++redniBroj).padStart(2, '0')), sadrzaj);
      sekcija.append(item);
    });
    fragment.append(sekcija);
  });
  if (koncert.izdvojenaTacka) {
    const tacka = koncert.izdvojenaTacka;
    const item = document.createElement('article');
    item.className = 'program-highlight';
    if (tacka.autor) item.append(element('p', 'program-author', tacka.autor));
    item.append(element('h3', 'program-title', tacka.naziv));
    tacka.detalji.forEach(detalj => item.append(element('p', 'program-performer', detalj)));
    fragment.append(item);
  }
  if (koncert.saradnici.length) {
    const sekcija = document.createElement('section');
    sekcija.className = 'program-credits';
    const naslov = element('h3', 'program-credits-title');
    naslov.id = 'program-credits-title';
    sekcija.setAttribute('aria-labelledby', naslov.id);
    const listaSaradnika = document.createElement('dl');
    listaSaradnika.className = 'program-credits-list';
    koncert.saradnici.forEach(([uloga, ime]) => {
      const red = document.createElement('div');
      red.append(element('dt', 'program-credit-role', uloga), element('dd', 'program-credit-name', ime));
      listaSaradnika.append(red);
    });
    sekcija.append(naslov, listaSaradnika);
    fragment.append(sekcija);
  }
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
