// Worte als Arrays definieren
const subjekte = ['Harry', 'Hermine', 'Ron', 'Ginny', 'Luna'];
const praedikate = ['zaubert', 'spricht', 'denkt', 'liest', 'macht'];
const objekte = ['Zauberformeln', 'Zauberstab', 'Hausaufgaben', 'Hexenbesen', 'Quidditch'];
// Funktion, um ein zufälliges Element aus einem Array auszuwählen
function waehleZufaelligesElement(arr) {
    const index = Math.floor(Math.random() * arr.length);
    return arr.splice(index, 1)[0];
}
// Gedicht erstellen
function erstelleGedicht() {
    let zeilen = [];
    let satz;
    for (let i = 0; i < 5; i++) {
        satz = `${waehleZufaelligesElement(subjekte)} ${waehleZufaelligesElement(praedikate)} ${waehleZufaelligesElement(objekte)}.`;
        zeilen.push(satz);
    }
    return zeilen.join('\n');
}
// Gedicht in Konsole ausgeben
console.log(erstelleGedicht());
//# sourceMappingURL=poem.js.map