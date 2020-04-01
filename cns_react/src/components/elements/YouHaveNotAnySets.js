import React from "react";
import { Link } from "react-router-dom";

const YouHaveNotAnySets = () => (
  <div className="user-sets-message">
    <h4 className="quaternary-title">Nie posiadasz żadnych zestawów.</h4>
    {window.location.href.includes("choose_set") ? (
      <p>
        Przejdź do zakładki <Link to="/my_sets">Moje zestawy</Link>, aby
        utworzyć nowy zestaw.
      </p>
    ) : (
      <p>Utwórz nowy zestaw, a pojawi się on w tym miejscu.</p>
    )}
  </div>
);

export default YouHaveNotAnySets;
