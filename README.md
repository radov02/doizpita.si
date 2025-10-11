# DoIzpita.si - Platform za pridobitev vozniškega dovoljenja

## Pregled projekta

DoIzpita.si je celovita spletna platforma, ki omogoča uporabnikom enostaven in organiziran pristop k pridobivanju vozniškega dovoljenja v Sloveniji.

### Ključne funkcionalnosti

**Osnovna stran (index.html):**
- Predstavitvena stran s poudarkom na glavnih prednostih
- Call-to-action gumbi za iskanje avtošol in začetek procesa
- Modalni okni za prijavo in registracijo
- Responsive dizajn

**Moja pot do izpita (moja-pot-do-izpita.html):**
- Interaktivno sledenje napredka z vizualnimi kazalniki
- 7-stopenjski proces od osnovnih pogojev do praktičnega izpita
- Sistem ocenjevanja storitev
- Pregled stroškov in terminov
- Sidebar z hitri akcijami in prihodnjimi dogodki

**Seznam avtošol (seznam.html):**
- Filtrirani seznam avtošol z naprednimi možnostmi iskanja
- Podrobni prikaz informacij: ocene, cene, inštruktorji, vozni park
- Možnost rezervacije in ogled dodatnih informacij
- Paginacija in sortiranje rezultatov

### Tehnični stack

- **HTML5** - Semantična struktura
- **CSS3** - Moderna stilizacija z Bootstrap 5 in custom CSS
- **JavaScript (ES6+)** - Interaktivnost in dinamičnost
- **Bootstrap 5** - Responsive framework
- **Bootstrap Icons** - Ikone

### Struktura datotek

```
doizpita.si/
├── index.html              # Glavna stran
├── moja-pot-do-izpita.html # Progress tracking
├── seznam.html             # Seznam avtošol
├── css/
│   ├── style.css          # Glavni stili
│   └── components.css     # Komponente in specializirani stili
├── js/
│   ├── main.js           # Glavna JavaScript logika
│   ├── progress.js       # Progress page funkcionalnost
│   └── driving-schools.js # Seznam avtošol funkcionalnost
└── images/               # Slike in ikone
```

### Poslovni model

- **Brezplačno za uporabnike** - Registracija in osnovna uporaba
- **Prihodki:**
  - Oglaševanje na platformi
  - Provizije od partnerskih podjetij
  - "Avtošola kot storitev" - podizvajalski model

### Značilnosti

1. **Uporabniku prijazen vmesnik** - Intuitivna navigacija
2. **Mobilno optimiziran** - Responsive design za vse naprave
3. **Interaktivnost** - Dinamičen sistem sledenja napredka
4. **Filtiranje in iskanje** - Napredne možnosti za iskanje avtošol
5. **Ocenjevanje** - Sistem za ocenjevanje storitev in ponudnikov
6. **Real-time updates** - Posodobitve statusa in napredka

### Prihodnji razvoj

- Integracija plačilnih sistemov
- API povezava z e-upravo za prijave na izpite
- Mobilna aplikacija
- Sistem obvestil
- Razširitev na druge regije

### Namestitev in uporaba

1. Odprite `index.html` v spletnem brskalniku
2. Za polno funkcionalnost potrebujete spletni strežnik (lokalni ali oblačni)
3. Vsi CSS in JavaScript viri so vključeni preko CDN-jev

### Podpora

Za podporo ali vprašanja kontaktirajte razvijalski tim.