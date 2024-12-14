import { Col, message, Select } from "antd";
import { FunctionComponent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { updateReservationStatus } from "../../../redux/reservationSlice";

interface PlacedFooterProps {
  reservationId: string;
}

const PlacedFooter: FunctionComponent<PlacedFooterProps> = ({
  reservationId,
}) => {
  const emptyTables = useAppSelector((state) => state.reservations.emptyTables);
  const employeeId = useAppSelector((state) => state.account.employeeId);
  const [selectedTableId, setSelectedTableId] = useState<string>();
  const dispatch = useAppDispatch();
  const handleConfirm = async () => {
    if (!selectedTableId || !reservationId || !employeeId) {
      message.error("Can not create order");
      return;
    }
    try {
      console.log({
        TabledId: selectedTableId,
        reservationId,
        employeeId,
      });
      await dispatch(
        updateReservationStatus({
          TableId: selectedTableId,
          reservationId,
          employeeId,
        })
      ).unwrap();
      message.success("Update reservation status successfully");
    } catch (error) {
      console.log(error);
      message.error("Error updating reservation status");
    }
  };
  return (
    <>
      <Col span={12}>
        <Select
          onChange={(value) => setSelectedTableId(value)}
          className="w-100"
          placeholder="Choose table..."
          options={emptyTables.map((emptyTable) => ({
            label: `Table ${emptyTable.tableNumber}`,
            value: emptyTable.tableId,
          }))}
        />
      </Col>
      <Col span={12}>
        <button
          onClick={handleConfirm}
          className="w-full bg-slate-200 hover:bg-slate-300 py-2 rounded-md  disabled:bg-gray-100 disabled:cursor-not-allowed"
          disabled={!selectedTableId}
        >
          {!selectedTableId ? "Please choose a table..." : "Confirm"}
        </button>
      </Col>
    </>
  );
};

export default PlacedFooter;
