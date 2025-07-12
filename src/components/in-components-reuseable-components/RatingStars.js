import {StarIcon} from "./Icons";

const RatingStars = ({rating=1}) => {
    const roundedRating=Math.ceil(rating)
    const starComponents=[]
    for (let i = 0; i < roundedRating; i++) {
        starComponents.push(<StarIcon/>);
    }
    return (
        <div className={'d-flex gap-1'}>
            {starComponents}
        </div>
    )

}
export default RatingStars