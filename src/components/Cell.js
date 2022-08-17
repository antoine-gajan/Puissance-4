import '../styles/Cell.css'

function Cell(props)
{
    return(
        props.gagne ?
            (<button key={props.ref} className={['cellule', props.couleur, props.jouable === true ? 'jouable' : ''].join(' ')}> </button>)
            :
            (<button key={props.ref} className={['cellule', props.couleur, props.jouable === true ? 'jouable' : ''].join(' ')} onClick={props.onClick}> </button>)
    )
}

export default Cell;