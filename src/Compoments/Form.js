import memesData from '../data.json';
import React from 'react'

export default function Form(){
    /* const res = React.useState("NYO HO");
    console.log(res);// TEREMOS ["NYO HO", f()] */
    // const [meme, setMeme] = React.useState({
    //     topText: "",
    //     bottomText: "",
    //     randomImage: "https://i.imgflip.com/1bij.jpg"
    // });
    const [allMemeImages, setAllMemeImages] = React.useState([])
    // -----------SEM ASYNC AWAIT
    //React.useEffect(//"DA PRA USAR ASYNC AWAIT? DÁ, ta abaixo"
    //     () => {
    //         fetch("https://api.imgflip.com/get_memes")
    //             .then(res => res.json())
    //             .then(memesData =>setAllMemeImages(memesData.data.memes))
    //     },[]
    // )
    //----- O PROBLEMA DE ASYNC AWAIT -----------------
    //Do jeito que esta abaaixo NUNCA ia funcionar direito
    //pq uma funcao async retorna uma promise e eu precisava
    //que a funcao de CleanUp fosse retornada. O que fazer numa 
    //situation dessa?
    // React.useEffect(
    //     async () => {
    //         const res = await fetch("https://api.imgflip.com/get_memes")
    //         const data = res.json()
    //         setAllMemeImages(data.data.memes);
        
    //     return () => {
    //         //a funcao de CleanUp vem aqui
    //         //caso nao lembre que raios é a funcao
    //         //de CleanUp, no projeto 'WindowTracker'
    //         //tem explicado
    //     }
    //     },[])

    // ----- SOLUCAO DO PROBLEMA --------------
    
    // React.useEffect(
    //     () => {//declaramos uma outra funcao
    //         async function getMemes () {
    //             const res = await fetch("https://api.imgflip.com/get_memes")
    //             const data = res.json()
    //             setAllMemeImages(data.data.memes);
    //         }
    //         getMemes();//invocamos ela

    //         return () => {//retornamos a funcao de CleanUp :)
    //             //a funcao de CleanUp vem aqui
    //             //caso nao lembre que raios é a funcao
    //             //de CleanUp, no projeto 'WindowTracker'
    //             //tem explicado
    //         }
        
    //     },[]
    // )
    
    // *************************************
    //Nessa situacao, nao tem pq usar uma funcao de CleanUp
    //por isso o uso de async await sem todo o paranauê
    React.useEffect(
        () => {
            async function getMemes(){
                const res = await fetch("https://api.imgflip.com/get_memes")
                const data = await res.json()
                setAllMemeImages(data.data.memes)
            }
            getMemes()
        }, []
    )

    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/1bij.jpg"
    });

    
    
    function pickRandom(){
        let aux = allMemeImages[Math.ceil(Math.random() * allMemeImages.length)].url
        setMeme((prevMeme) => {
            return {
                ...prevMeme,
                randomImage: aux
            }
        });
    }
    function handleChange({target}){
        console.log(target);
        const {name, value} = target;
        setMeme(
            prev => ({
                ...prev,
                [name]: value
            })
        )
        
    }
    return(
        <main>
            <div className="form">
                <input 
                    className="form--input" 
                    placeholder="Top text" 
                    type="text"
                    value={meme.topText} 
                    name="topText"
                    onChange={handleChange}
                />
                <input 
                    className="form--input"
                    placeholder="Bottom text"
                    type="text"
                    value={meme.bottomText}
                    name="bottomText"
                    onChange={handleChange}
                />
                <button className="form--button" onClick={pickRandom} >Get new image</button>
            </div>
            <div className="meme-wrapper">
                <div className='meme-content'>
                    {meme && <img src={`${meme.randomImage}`} className="meme--img" alt="Meme image"/>}
                    <h1 className="meme-text top" >{meme.topText}</h1>
                    <h1 className="meme-text bottom">{meme.bottomText}</h1>
                </div>
            </div>
        </main>
    );
}