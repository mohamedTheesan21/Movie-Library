

function Card(props){
    return(
        <div className="card mb-2 mt-2" style={{ width: "18rem", height:"30rem"}}>
          <img src={props.Poster} className="card-img-top" alt="..."></img>
          <div className="card-body">
            <h5 className="card-title">{props.Title}</h5>
            <p>{props.Genre}</p>
            <p>{props.Year}</p>
            <button onClick={props.onClick} className="btn btn-primary">
              {props.buttonText}
            </button>
          </div>
        </div>
    )
}

export default Card;