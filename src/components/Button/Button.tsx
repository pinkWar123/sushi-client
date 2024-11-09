import './Button.css'

interface ButtonProps {
    type: "button" | "submit" | "reset";
    content: string;
}

function Button({
    type,
    content
}: ButtonProps) {
    return (
        <button type={type} className="btn">{content}</button>
    )
}

export default Button
