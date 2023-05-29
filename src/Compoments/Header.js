import logo from '../images/Troll Face.png'

export default function Header(){
    return(
        <header className="header">
            {/* <h1>NYO HO</h1> */}
            <img className="header--image" src={logo} alt="Troll face logo"/>
            <h1 className="header--title">Meme generator</h1>
            <h4 className="header--project">React Course - Project 3</h4>
        </header>
    );
}