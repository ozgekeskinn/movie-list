import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTag,
  faStar,
  faCircleCheck,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";

export default function MovieCard({movieObj}){
    let commentText = "";
    if(movieObj.rating >= 9.5)
        commentText = "Favori adayım!";
    else if(movieObj.rating >=9)
        commentText = "Efsane yapım!"
    else if(movieObj.rating >=7)
        commentText = "Güzel görünüyor.";
    else
        commentText = "Boş vaktin varsa izlenir";

    return (
        <div className="movie-card">
            <div className="movie-card-left">
                <img src={movieObj.image} alt={movieObj.title} />
            </div>

            <div className="movie-card-right">
                <div className="movie-card-top">
                    <h2>{movieObj.title}</h2>
                    <span className="type-badge">{movieObj.type}</span>
                </div>

                <div className="movie-card-details">
                    <div className="detail-row">
                        <div className="detail-label">
                            <FontAwesomeIcon icon={faTag} />
                            <span>Tür</span>
                        </div>
                        <span className="detail-value">{movieObj.category}</span>
                    </div>

                    <div className="detail-row">
                        <div className="detail-label">
                            <FontAwesomeIcon icon={faStar} />
                            <span>Puan</span>
                        </div>
                        <span className="detail-value rating-value">
                        {movieObj.rating}/10
                        </span>
                    </div>

                    <div className="detail-row">
                        <div className="detail-label">
                            <FontAwesomeIcon icon={faCircleCheck} />
                            <span>Durum</span>
                        </div>
                        <span
                            className={
                            movieObj.isWatched
                                ? "status-badge watched"
                                : "status-badge not-watched"
                            }
                        >
                            {movieObj.isWatched ? "İzledim" : "İzlemedim"}
                        </span>
                    </div>

                    <div className="detail-row">
                        <div className="detail-label">
                            <FontAwesomeIcon icon={faCommentDots} />
                            <span>Yorum</span>
                        </div>
                        <span className="detail-value comment-text">
                            {commentText}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}