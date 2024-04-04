// Worte als Arrays definieren
const subjekte: string[] = ['Harry', 'Hermine', 'Ron', 'Ginny', 'Luna'];
const praedikate: string[] = ['zaubert', 'spricht', 'denkt', 'liest', 'macht'];
const objekte: string[] = ['Zauberformeln', 'Zauberstab', 'Hausaufgaben', 'Hexenbesen', 'Quidditch'];

// Funktion, um ein zufälliges Element aus einem Array auszuwählen
function waehleZufaelligesElement(arr: string[]): string {
  const index = Math.floor(Math.random() * arr.length);
  return arr.splice(index, 1)[0];
}

// Gedicht erstellen
function erstelleGedicht(): string {
  let zeilen: string[] = [];
  let satz: string;
  for (let i = 0; i < 5; i++) {
    satz = `${waehleZufaelligesElement(subjekte)} ${waehleZufaelligesElement(praedikate)} ${waehleZufaelligesElement(objekte)}.`;
    zeilen.push(satz);
  }
  return zeilen.join('\n');
}

// Gedicht in Konsole ausgeben
console.log(erstelleGedicht());