import './Button.css'

function Button({
    type,
    content
}) {
    return(
        <button type={type} className="btn">{content}</button>
    )
}
export default Button