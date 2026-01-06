import Alert from "../models/alert";
import "./Components.css"


export default function About() {

  return (
    <div className="CardLook fullContainer">
        <div className="ScrollZone">
        <h1>Projet Dashboard en React</h1>
        <p>
            Voici mon premier projet en React! Il s'agit d'un dashboard pour un centre d'appel hypothétique que j'ai fait dans le but d'avoir un projet en React.js et Next.js 
            à présenter lors d'entrevues, et pour peaufiner mon CV.
        </p>
        <br/>
        <h2>Ce que j'ai appris</h2>
        <p>
            React.js et un peu de Next.js.
        </p>
        <br/>
        <h2>Les lacunes de ce projet</h2>
            <ul>
                <li><p>Avoir un bouton refresh sur un dashboard n'est pas quelque chose de très ingénieux.</p></li>
                <li><p>Les données sont générées aléatoirement.</p></li>
                <li><p>Le site répond très mal aux changements de taille. (Essayez de zoomer, vous verrez (ou pas) 😉)</p></li>
                <li><p>En lien avec le dernier point, le site ne fonctionne pas vraiment sur mobile.</p></li>
            </ul>
            <br/>
            <p>
                Pour avoir une expérience plus semblable de celle d'un dashboard, il aurait été pertinent d'avoir une base de données en arrière 
                qui gère les informations et permettrait d'avoir des données cohérentes si l'on met à jour le dashboard en temps réel. 
                Toutefois, je trouvais ces fonctionnalités (que je prévois utiliser dans le cadre d'autres projets) hors portée de celui-ci.
                <br/><br/>
                En ce qui concerne l'apparence visuelle du site si l'on change la taille de l'écran, mon but n'était pas de faire du code HTML/CSS réactif,
                mais plus de faire une page web qui est visuellement belle. Rendre le site utilisable sur mobile reste dans la liste des changements que je
                veux faire.
            </p>
        <br/>
        <h2>Ce que je planifie ajouter</h2>
            <ul>
                <li><p className="b">Menu d'options</p></li>
                <ul>
                    <li><p>Thème sombre</p></li>
                    <li><p>Options de langues</p></li>
                    <li><p>Menu principal plus customisable (changer les tuiles ou leur ordre)</p></li>
                </ul>
                <br/>
                <li><p className="b">Mises à jour en temps réel</p></li>
                <ul>
                    <li><p>Connexion en temps réel à une BD</p></li>
                    <li><p>Autre page pour manipuler les données manuellement</p></li>
                </ul>
                <br/>
                <li><p className="b">Autre modifications</p></li>
                <ul>
                    <li><p>Rendre le site compatible sur de plus petits écrans</p></li>
                    <li><p>Se débarrasser des émojis dans le UI (Sauf alertes)</p></li>
                    <li><p>Menu d'alertes qui défile automatiquement</p></li>
                </ul>
                <br/>
            </ul>
            <br/>
        </div>
    </div>
  );
}