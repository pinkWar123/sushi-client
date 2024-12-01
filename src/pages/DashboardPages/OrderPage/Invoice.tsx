import { FunctionComponent, useState } from "react";
import { ICreateInvoiceResponse } from "../../../@types/response/invoice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { Button, Card, Divider, Flex, message, Space, Typography } from "antd";
import { formattedDate } from "../../../utils/time";
import {
  faCartShopping,
  faCheck,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../../hooks/redux";
import { purchaseInvoice } from "../../../redux/reservationSlice";

interface InvoiceProps {
  info: ICreateInvoiceResponse;
  reservationId: string;
  onHide: () => void;
}

interface PaidStatusProps {
  status: boolean;
}

const PaidStatus: FunctionComponent<PaidStatusProps> = ({ status }) => {
  if (status)
    return (
      <div className="rounded-md flex items-center gap-2 bg-green-100 py-0.5 px-2.5 border border-transparent text-sm text-slate-600 transition-all shadow-sm">
        <FontAwesomeIcon icon={faCheck} />
        Paid
      </div>
    );
  return (
    <div className="rounded-md flex gap-2 items-center bg-slate-100 py-0.5 px-2.5 border border-transparent text-sm text-slate-600 transition-all shadow-sm">
      <FontAwesomeIcon icon={faSpinner} />
      Unpaid
    </div>
  );
};

const Invoice: FunctionComponent<InvoiceProps> = ({
  info,
  reservationId,
  onHide,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispath = useAppDispatch();
  const handlePurchase = async () => {
    try {
      setLoading(true);
      await dispath(
        purchaseInvoice({
          reservationId,
          invoiceId: info.id,
        })
      );
      message.success("Purchase Invoice successfully");
      onHide();
    } catch (error) {
      message.error("Purchase failed");
      setLoading(false);
    } finally {
      setLoading(true);
    }
  };

  return (
    <Card className="w-1/2">
      <Flex justify="space-between">
        <Typography.Title level={4}>Invoice #{info.id}</Typography.Title>
        <div>
          <PaidStatus status={info.paid} />
        </div>
      </Flex>
      <div>
        <Space>
          <FontAwesomeIcon icon={faCartShopping} /> Order ID: {info.orderId}
        </Space>
      </div>
      <div>
        <Space>
          <FontAwesomeIcon icon={faCalendar} /> Issued date:
          {formattedDate(info.datedOn)}
        </Space>
      </div>
      <Divider />
      <Flex justify="space-between" className="py-2">
        <strong>Total amount:</strong>
        <strong>{info.total}</strong>
      </Flex>
      <Flex justify="space-between" className="py-2">
        <strong>Payment method:</strong>
        <strong>{info.paymentMethod}</strong>
      </Flex>
      <Flex justify="space-between" className="py-2">
        <strong>After discount:</strong>
        <strong>{info.afterDiscount}</strong>
      </Flex>
      <Button
        loading={loading}
        onClick={handlePurchase}
        className="flex justify-center gap-2 w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold text-center rounded-md"
      >
        Purchase
      </Button>
    </Card>
  );
};

export default Invoice;
