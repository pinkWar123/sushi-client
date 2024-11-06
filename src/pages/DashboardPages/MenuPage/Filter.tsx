import {
  Checkbox,
  Divider,
  Flex,
  Slider,
  SliderSingleProps,
  Typography,
} from "antd";
import { FunctionComponent } from "react";

interface FilterProps {}

const FILTER_ITEMS = [
  {
    label: "All Promo",
    value: "all",
  },
  {
    label: "Special Menu",
    value: "special",
  },
  {
    label: "Main Food",
    value: "main",
  },
  {
    label: "Drinks",
    value: "drinks",
  },
  {
    label: "Appetizer",
    value: "appetizer",
  },
  {
    label: "Desert",
    value: "desert",
  },
  {
    label: "Drinks",
    value: "drinks",
  },
];

const marks: SliderSingleProps["marks"] = {
  0: "0$",
  100: {
    style: {
      color: "#f50",
    },
    label: <strong>100$</strong>,
  },
};

const NATIONS = ["Chinese", "Mexican", "Italian", "Indian", "Western"];

const Filter: FunctionComponent<FilterProps> = () => {
  return (
    <div className=" sticky top-4  bg-white p-4">
      <Flex justify="space-between">
        <div className="text-red-500">FILTER</div>
        <div className="text-green-500">Reset All</div>
      </Flex>

      <Divider />
      <Checkbox.Group>
        {FILTER_ITEMS.map((item, index) => (
          <Checkbox
            className="w-full"
            value={item.value}
            key={`option-${index}`}
          >
            <div className="text-xs">{item.label}</div>
          </Checkbox>
        ))}
      </Checkbox.Group>

      <Divider />
      <Checkbox.Group>
        {NATIONS.map((nation, index) => (
          <Checkbox className="w-full" value={nation} key={`nation-${index}`}>
            <div className="text-xs">{nation}</div>
          </Checkbox>
        ))}
      </Checkbox.Group>

      <Divider />

      <Typography.Title level={5}>Price range</Typography.Title>
      <Slider
        included={true}
        range={true}
        marks={marks}
        defaultValue={[26, 37]}
      />

      <Flex justify="center">
        <button className="py-1 px-4 rounded-full ring-1 bg-yellow-300">
          Search
        </button>
      </Flex>
    </div>
  );
};

export default Filter;
