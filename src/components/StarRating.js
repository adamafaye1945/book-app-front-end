import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styles from "./StarRating.module.css";
import { useAppContext } from "../context/Context";

function StarRating() {
  const { rating, hover, setHover, setRating } = useAppContext();
  return (
    <div>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <FontAwesomeIcon
            type="button"
            key={index}
            className={index <= (hover || rating) ? styles.on : styles.off}
            icon={faStar}
            style={{
              width: "40px",
              marginTop: "20px",
            }}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          />
        );
      })}
    </div>
  );
}

export default StarRating;
