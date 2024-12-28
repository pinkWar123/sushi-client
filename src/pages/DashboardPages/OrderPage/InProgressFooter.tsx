import { Col } from "antd";
import { FunctionComponent, useState } from "react";
import OrderDetail from "./OrderDetail";
import PaymentModal from "./PaymentModal";
import { IReservation } from "../../../@types/response/reservation";

interface InProgressFooterProps {
  info: IReservation;
  paybillBtn?: boolean;
}

const InProgressFooter: FunctionComponent<InProgressFooterProps> = ({
  info,
  paybillBtn = true,
}) => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [showBills, setShowBills] = useState<boolean>(false);
  return (
    <>
      {showDetail && (
        <OrderDetail
          reservationId={info.reservationId}
          details={info.orderDetails}
          onHide={() => setShowDetail(false)}
        />
      )}
      {showBills && (
        <PaymentModal info={info} onHide={() => setShowBills(false)} />
      )}
      <Col span={paybillBtn ? 12 : 24}>
        <button
          onClick={() => setShowDetail(true)}
          className="rounded-md py-1 text-sm text-green-700 w-full bg-gray-100 font-bold"
        >
          See Details
        </button>
      </Col>
      {paybillBtn && (
        <Col span={12}>
          <button
            onClick={() => setShowBills(true)}
            className="rounded-md py-1 w-full bg-yellow-400 font-bold"
          >
            Pay Bills
          </button>
        </Col>
      )}
    </>
  );
};

export default InProgressFooter;
