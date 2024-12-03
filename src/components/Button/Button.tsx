import "./Button.css";

interface ButtonProps {
  type: "button" | "submit" | "reset"; // Define the type of button
  content: string;
  disabled?: boolean; // Add the disabled property
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({ type, content, disabled, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className="btn" type={type} disabled={disabled}>
      {content}
    </button>
  );
}

export default Button;
