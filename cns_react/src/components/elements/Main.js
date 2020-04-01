import React from "react";
import design1 from "../../images/design3.png";
import design2 from "../../images/design4.png";

class Main extends React.Component {
  render() {
    return (
      <div className="home-main">
        <div className="home-main-box container">
          <div className="home-text">
            <h2 className="secondary-title">Własne zestawy słówek</h2>
            <p>
              Oprócz gotowych już zestawów słówek, możesz również utworzyć swoje
              własne.
            </p>
            <p>
              Zaloguj się na swoje konto, wejdź w zakładkę „Moje zestawy” i
              utwórz nowy zestaw.
            </p>
          </div>
          <div className="grid-box">
            <img className="img1" src={design1} alt="" />
            <img className="img2" src={design2} alt="" />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
