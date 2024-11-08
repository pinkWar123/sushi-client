import './InputBox.css'

function InputBox({
    id,
    label,
    type,
    size = 100
}) {
    return (
        <div style={{width: `${size}%`}} className={`box-container`}>
            <input className="input-container" id={id} type={type} placeholder='' required />
            <label
                htmlFor={id}
                className="input-label"
            >
                {label}
            </label>
        </div>
    )
}
export default InputBox