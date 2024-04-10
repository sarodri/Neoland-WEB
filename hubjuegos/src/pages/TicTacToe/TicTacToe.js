import "./TicTacToe.css"

const template=() => `
<section id = "table-section">
            <div class = "line horizontal line1"></div>
            <div class = "line horizontal line2"></div>
            <div class = "line horizontal line3"></div>
            <div class = "line vertical line4"></div>
            <div class = "line vertical line5"></div>
            <div class = "line vertical line6"></div>
            <div id = "boxes" class="boxes">
                <div class="row">
                    <div class="tile 1"></div>
                    <div class="tile 2"></div>
                    <div class="tile 3"></div>
                    <div class="tile 4"></div>
                </div>
                <div class="row">
                    <div class="tile 5"></div>
                    <div class="tile 6"></div>
                    <div class="tile 7"></div>
                    <div class="tile 8"></div>
                </div>
                <div class="row">
                    <div class="tile 9"></div>
                    <div class="tile 10"></div>
                    <div class="tile 11"></div>
                    <div class="tile 12"></div>
                </div>
                <div class="row">
                    <div class="tile 13"></div>
                    <div class="tile 14"></div>
                    <div class="tile 15"></div>
                    <div class="tile 16"></div>
                </div>
            </div>
        </section>
`

export const PrintTicTacToePage = () =>{
    document.querySelector("main").innerHTML = template();
}