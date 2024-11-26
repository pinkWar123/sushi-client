import './InputBox.css';

interface InputBoxProps {
    id: string;
    label: string;
    type: string;
    size?: number;
    name: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    error?: string; // New error prop
}

function InputBox({
    id,
    label,
    type,
    size = 100,
    name,
    onChange,
    value,
    error // Error message
}: InputBoxProps) {
    return (
        <div style={{ width: `${size}%` }} className="box-container">
            <input
                className={`input-container ${error ? 'input-error' : ''}`} // Add 'input-error' class if error
                id={id}
                type={type}
                placeholder=''
                required
                name={name}
                onChange={onChange}
                value={value}
            />
            <label htmlFor={id} className="input-label">
                {label}
            </label>
            {error && <span className="error-message">{error}</span>} {/* Show error message if exists */}
        </div>
    );
}

export default InputBox;
