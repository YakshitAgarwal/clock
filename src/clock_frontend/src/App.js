import { html, render } from 'lit-html';
import { clock_backend } from 'declarations/clock_backend';

class App {
  greeting = '';

  constructor() {
    this.#render();
  }

  #handleSubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    this.greeting = await clock_backend.greet(name);
    this.#render();
  };

  #render() {
    let body = html`
      <main>
        <h1>Digital Clock</h1>
        <div class="clock">
          <p id="hours"></p>
          <p id="minutes"></p>
          <p id="seconds"></p>
        </div>
      </main>
    `;
    render(body, document.getElementById('root'));
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");

    function updateClock() {
      const time = new Date();
      let sec;

      if (time.getSeconds() < 10) {
        sec = `0${time.getSeconds()}`;
      } else {
        sec = `${time.getSeconds()}`;
      }
      
      hours.innerText = time.getHours();
      minutes.innerText = time.getMinutes();
      seconds.innerHTML = sec;

      setTimeout(() => {
        updateClock();
      }, 1000);
    }
    updateClock();

  }
}

export default App;
