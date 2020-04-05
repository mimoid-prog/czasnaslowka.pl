import React from "react";
import f1 from "../../images/f1.png";
import f2 from "../../images/f2.png";
import f3 from "../../images/f3.png";

class Main extends React.Component {
  render() {
    return (
      <div className="home-main">
        <div className="home-main-box container">
          <div className="home-text">
            <h2 className="secondary-title">Własne zestawy słówek</h2>
            <p>Korzystaj z gotowych zestawów słówek lub utwórz swoje własne.</p>
            <p>
              Dzięki temu możesz powtarzać słownictwo na którym dokładnie ci
              zależy.
            </p>
            <p>
              Zaloguj się na swoje konto, wejdź w zakładkę "Moje zestawy" i
              utwórz nowy zestaw, a potem zacznij naukę w zakładce "Wybierz
              zestaw".
            </p>
          </div>
          <div className="grid-box">
            <img className="img1" src={f1} alt="" />
            <img className="img2" src={f2} alt="" />
            <img className="img3" src={f3} alt="" />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
