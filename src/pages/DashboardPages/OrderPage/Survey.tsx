import { Input, Rate, Typography } from "antd";
import { FunctionComponent } from "react";
import { ISurvey } from "../../../@types/request/request";

interface SurveyProps {
  survey: ISurvey;
  setSurvey: React.Dispatch<React.SetStateAction<ISurvey>>;
}

const Survey: FunctionComponent<SurveyProps> = ({ survey, setSurvey }) => {
  const handleUpdateSurveyPoint = (point: number) => {
    setSurvey((prev) => ({ ...prev, point } as ISurvey));
  };
  const handleUpdateSurveyComment = (comment: string) => {
    setSurvey((prev) => ({ ...prev, comment } as ISurvey));
  };
  return (
    <>
      <Typography.Title level={5}>
        Please your review so that we can improve our service
      </Typography.Title>
      <div className="flex justify-between py-2">
        <strong>Point: </strong>
        <Rate value={survey?.point} onChange={handleUpdateSurveyPoint} />
      </div>
      <div className="pb-4 pt-2">
        <strong>Comment:</strong>
        <Input.TextArea
          showCount
          className="py-2"
          placeholder="Your thoughts..."
          value={survey?.comment}
          onChange={(e) => handleUpdateSurveyComment(e.target.value)}
        ></Input.TextArea>
      </div>
    </>
  );
};

export default Survey;
