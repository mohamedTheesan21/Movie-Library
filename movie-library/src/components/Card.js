

function Card(props){
    return(
        <div className="card" style={{ width: "18rem" }}>
          <img src={props.Poster} className="card-img-top" alt="..."></img>
          <div className="card-body">
            <h5 className="card-title">{props.Title}</h5>
            <p>Genre: {props.Genre}</p>
            <p>{props.Year}</p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
    )
}

export default Card;