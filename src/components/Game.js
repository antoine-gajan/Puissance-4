import Cell from './Cell'
import '../styles/Game.css'
import {useState} from "react";

function Game()
{
    const [joueurActuel, updateJoueurActuel] = useState('rouge')
    const [gagne, updateGagne] = useState(false)
    const [tableau, updateTableau] = useState(Array(42).fill('blanc'))
    return(
        <div className={'game'}>
            {gagne === false ?
                (<span>Joueur actuel : {joueurActuel}</span>)
                :
                (<span>La couleur {joueurActuel} a gagné.</span>)}
            <div className={'board'}>
                <div>
                    {createCase(0)}
                    {createCase(1)}
                    {createCase(2)}
                    {createCase(3)}
                    {createCase(4)}
                    {createCase(5)}
                    {createCase(6)}
                </div>
                <div>
                    {createCase(7)}
                    {createCase(8)}
                    {createCase(9)}
                    {createCase(10)}
                    {createCase(11)}
                    {createCase(12)}
                    {createCase(13)}
                </div>
                <div>
                    {createCase(14)}
                    {createCase(15)}
                    {createCase(16)}
                    {createCase(17)}
                    {createCase(18)}
                    {createCase(19)}
                    {createCase(20)}
                </div>
                <div>
                    {createCase(21)}
                    {createCase(22)}
                    {createCase(23)}
                    {createCase(24)}
                    {createCase(25)}
                    {createCase(26)}
                    {createCase(27)}
                </div>
                <div>
                    {createCase(28)}
                    {createCase(29)}
                    {createCase(30)}
                    {createCase(31)}
                    {createCase(32)}
                    {createCase(33)}
                    {createCase(34)}
                </div>
                <div className = {'row'}>
                    {createCase(35)}
                    {createCase(36)}
                    {createCase(37)}
                    {createCase(38)}
                    {createCase(39)}
                    {createCase(40)}
                    {createCase(41)}
                </div>
            </div>
            {gagne ? (<button className={'new'} onClick={()=>newgame()}>Rejouer</button>) : null}
            <footer>
                <p className="footer"> Réalisé par Antoine GAJAN | 2022</p>
            </footer>
        </div>
    )

    function updateGame(ref)
    {
        if (coupPossible(ref))
        {
            const newTab = tableau.slice()
            newTab[ref] = joueurActuel === 'rouge' ? 'rouge' : 'jaune'
            updateTableau(newTab);
            if (win(newTab))
            {
                updateGagne(true);
            }
            else
            {
                joueurActuel === 'rouge' ? updateJoueurActuel('jaune') : updateJoueurActuel('rouge')
            }

        }
    }
    function coupPossible(valeur)
    {
        return (valeur > 34 && tableau[valeur] === 'blanc') || (valeur <=34 &&  tableau[valeur] === 'blanc' && tableau[valeur + 7] !== 'blanc');
    }
    function createCase(indice)
    {
        return (<Cell key = {indice} onClick = {()=>updateGame(indice)} couleur = {tableau[indice]} jouable = {coupPossible(indice) && !gagne} gagne = {gagne}/>)
    }
    function win(tab)
    {
        //gagne en ligne
        for (var i = 0; i < 6; i++)
        {
            for (var j = 0; j < 4; j++)
            {
                if (tab[7*i+j] === tab[7*i+j+1] && tab[7*i+j+1] === tab[7*i+j+2] && tab[7*i+j+2] === tab[7*i+j+3] && tab[7*i+j] !== 'blanc')
                {
                    return true
                }
            }
        }
        //gagne en colonne
        for (var col = 0; col < 7; col++)
        {
            for (var lig = 0; lig < 3; lig++)
            {
                if (tab[col + 7 * lig] === tab[col + 7 * (lig + 1)] && tab[col + 7 * (lig + 1)] === tab[col + 7 * (lig + 2)] && tab[col + 7 * (lig + 2)] === tab[col + 7 * (lig + 3)] && tab[col + 7 * (lig + 3)] !== 'blanc')
                {
                    return true
                }
            }
        }
        //gagne en diagonale
        var diagWin = [
            [3, 9, 15, 21],
            [4, 10, 16, 22],
            [5, 11, 17, 23],
            [6, 12, 18, 24],
            [10, 16, 22, 28],
            [11, 17, 23, 29],
            [12, 18, 24, 30],
            [13, 19, 25, 31],
            [17, 23, 29, 35],
            [18, 24, 30, 36],
            [19, 25, 31, 37],
            [20, 26, 32, 38],
        ]
        for (let i = 0; i < diagWin.length; i++)
        {
            const [a, b, c, d] = diagWin[i];
            if (tab[a] !== 'blanc' && tab[b] === tab[a] && tab[c] === tab[b] && tab[d] === tab[c])
            {
                return true;
            }
        }
        //gagne en diagonale inverse
        const diagInvWin = [
            [0, 8, 16, 24],
            [1, 9, 17, 25],
            [2, 10, 18, 26],
            [3, 11, 19, 27],
            [7, 15, 23, 31],
            [8, 16, 24, 32],
            [9, 17, 25, 33],
            [10, 18, 26, 34],
            [14, 22, 30, 38],
            [15, 23, 31, 39],
            [16, 24, 32, 40],
            [17, 25, 33, 41]
        ]
        for (let i = 0; i < diagInvWin.length; i++)
        {
            const [a, b, c, d] = diagInvWin[i];
            if (tab[a] !== 'blanc' && tab[b] === tab[a] && tab[c] === tab[b] && tab[d] === tab[c])
            {
                return true;
            }
        }
        return false
    }
    function newgame()
    {
        updateGagne(false)
        updateTableau(Array(42).fill('blanc'))
    }
}

export default Game;