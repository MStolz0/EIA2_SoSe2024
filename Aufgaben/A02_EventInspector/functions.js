var eventExercise;
(function (eventExercise) {
    console.log("hallo Start");
    window.addEventListener('load', handleLoad);
    let span = document.createElement("span");
    span.innerHTML = "span";
    span.className = "span";
    document.querySelector("#div0").appendChild(span);
    function setInfoBox(_event) {
        let positionx = _event.clientX;
        let positiony = _event.clientY;
        span.style.left = positionx + 10 + "px";
        span.style.top = positiony + 10 + "px";
        span.innerText = "Mouseposition: x : " + positionx + ", Y: " + positiony + _event.target;
    }
    function logInfo(_event) {
        console.log(_event.target, _event.currentTarget, _event.type, _event);
    }
    function handleLoad() {
        document.querySelector("button").addEventListener('click', btn);
        document.addEventListener('mousemove', setInfoBox);
        document.addEventListener('click', logInfo);
        document.addEventListener('keyup', logInfo);
        document.body.addEventListener('click', logInfo);
        document.body.addEventListener('keyup', logInfo);
        document.getElementById('div0').addEventListener('click', logInfo);
        document.getElementById('div0').addEventListener('keyup', logInfo);
        document.getElementById('div1').addEventListener('click', logInfo);
        document.getElementById('div1').addEventListener('keyup', logInfo);
    }
    const customevent = new CustomEvent("Ladder", { bubbles: true, detail: { name: "Mario" } });
    function btn() {
        document.addEventListener("BubblemeupBob", customEvent);
        document.querySelector("button").dispatchEvent(customevent);
        function customEvent() {
            console.log(customevent.bubbles);
            console.log(customevent.detail);
        }
    }
})(eventExercise || (eventExercise = {}));
//# sourceMappingURL=functions.js.map