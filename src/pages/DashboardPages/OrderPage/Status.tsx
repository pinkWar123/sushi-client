import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";

interface StatusProps {
  status: "ready" | "in-progress" | "completed";
}

const Status: FunctionComponent<StatusProps> = ({ status }) => {
  if (status === "ready")
    return (
      <div className="rounded-md bg-green-300 px-2 py-1 text-xs font-bold">
        <FontAwesomeIcon icon={faCheck} /> Ready
      </div>
    );
  else if (status === "completed")
    return (
      <div>
        <FontAwesomeIcon icon={faSquareCheck} />
        Completed
      </div>
    );
  else
    return (
      <div>
        <FontAwesomeIcon icon={faSpinner} /> In progress
      </div>
    );
};

export default Status;
