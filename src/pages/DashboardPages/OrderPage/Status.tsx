import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";
import { OrderStatus } from "../../../constants/order";

interface StatusProps {
  status: OrderStatus;
}

const Status: FunctionComponent<StatusProps> = ({ status }) => {
  if (status === OrderStatus.Placed)
    return (
      <div className="rounded-md bg-green-300 px-2 py-1 text-xs font-bold">
        <FontAwesomeIcon icon={faCheck} /> {OrderStatus[status]}
      </div>
    );
  else if (status === OrderStatus.Done)
    return (
      <div>
        <FontAwesomeIcon icon={faSquareCheck} />
        {OrderStatus[status]}
      </div>
    );
  else
    return (
      <div>
        <FontAwesomeIcon icon={faSpinner} /> {OrderStatus[status]}
      </div>
    );
};

export default Status;
