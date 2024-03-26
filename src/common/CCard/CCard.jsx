import "./CCard.css";

export const CCard = ({ className, title, content, image }) => {
    return (
        <div className={className}>
            <h1>{title}</h1>
            {image && <img src={image} alt="image not found" />}
            <div>{content}</div>
        </div>
    )
}