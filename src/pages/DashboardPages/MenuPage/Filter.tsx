import {
  Checkbox,
  Divider,
  Flex,
  Radio,
  Skeleton,
  Slider,
  SliderSingleProps,
  Typography,
} from "antd";
import { FunctionComponent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchSection, resetPagination } from "../../../redux/menuSlice";
import { useLocation, useNavigate } from "react-router-dom";

interface FilterProps {}

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
interface Range {
  minPrice: number;
  maxPrice: number;
}
const Filter: FunctionComponent<FilterProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const sections = useAppSelector((state) => state.sections.data);
  const loading = useAppSelector((state) => state.sections.loading);
  const [filter, setFilter] = useState<string>();
  const [priceRange, setPriceRange] = useState<Range>();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const filter = searchParams.get("section");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    setFilter(filter ?? undefined);
    setPriceRange({
      minPrice: minPrice !== null ? parseInt(minPrice) : 0,
      maxPrice: maxPrice !== null ? parseInt(maxPrice) : 0,
    });
  }, [location.search]);
  useEffect(() => {
    if (!loading && sections.length === 0) dispatch(fetchSection());
  }, [dispatch, loading, sections.length]);
  const handleSearch = () => {
    const searchParams = new URLSearchParams(location.search);

    if (filter) searchParams.set("section", filter);
    dispatch(resetPagination());
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };
  return (
    <div className=" sticky top-4  bg-white p-4">
      <Skeleton loading={loading}>
        <Flex justify="space-between">
          <div className="text-red-500">FILTER</div>
          <div className="text-green-500">Reset All</div>
        </Flex>

        <Divider />
        <Radio.Group value={filter}>
          {sections.map((item, index) => (
            <Radio
              className="w-full"
              value={item.sectionId}
              key={`option-${index}`}
              onChange={(e) => setFilter(e.target.value)}
            >
              <div className="text-xs">{item.sectionName}</div>
            </Radio>
          ))}
        </Radio.Group>

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
          <button
            className="py-1 px-4 rounded-full ring-1 bg-yellow-300"
            onClick={handleSearch}
          >
            Search
          </button>
        </Flex>
      </Skeleton>
    </div>
  );
};

export default Filter;
