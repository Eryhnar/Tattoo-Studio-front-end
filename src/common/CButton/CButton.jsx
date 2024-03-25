import "./CButton.css";

export const CButton = ({ className, title, onClickFunction }) => {
    return (
        <div className={className} onClick={onClickFunction}>
            {title}
        </div>
    )
}