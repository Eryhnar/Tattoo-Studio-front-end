import "./customCard.css";

export const CustomCard = ({ className, title, content, image }) => {
    return (
        <div className={className}>
            <h1>{title}</h1>
            {image && <img src={image} alt="image not found" />}
            <p>{content}</p>
        </div>
    )
}