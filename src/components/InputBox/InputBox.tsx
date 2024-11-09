import './InputBox.css'

interface InputBoxProps {
    id: string;
    label: string;
    type: string;
    size?: number;
}

function InputBox({
    id,
    label,
    type,
    size = 100
}: InputBoxProps) {
    return (
        <div style={{ width: `${size}%` }} className="box-container">
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
