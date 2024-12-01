import './Button.css'

interface ButtonProps {
    type: 'button' | 'submit' | 'reset'; // Define the type of button
    content: string;
    disabled?: boolean; // Add the disabled property
}


function Button({ type, content, disabled }: ButtonProps) {
    return (
        <button className='btn' type={type} disabled={disabled}>
            {content}
        </button>
    );
}


export default Button
