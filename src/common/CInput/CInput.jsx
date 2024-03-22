import "CInput.css"

export const CInput = (className, type, placeholder, name, disabled, value, onChangeFunction) => {
    return (
        <input 
            className={className}
            type={type}
            placeholder={placeholder}
            name={name}
            disabled={disabled}
            value={value}
            onChange={onChangeFunction} />
    )
}