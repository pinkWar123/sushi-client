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
  0: "0VND",
  100: {
    style: {
      color: "#f50",
    },
    label: <strong>1,000,000VND</strong>,
  },
};

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
    if (priceRange) {
      searchParams.set("minPrice", priceRange.minPrice.toString());
      searchParams.set("maxPrice", priceRange.maxPrice.toString());
    }
    dispatch(resetPagination());
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };
  return (
    <div className=" sticky top-4 bg-white p-4 ">
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

        <Divider />

        <Typography.Title level={5}>Price range</Typography.Title>
        <Slider
          className="px-4"
          included={true}
          range={true}
          // marks={marks}
          defaultValue={[
            priceRange?.minPrice ? priceRange.minPrice / 1000 : 0,
            priceRange?.maxPrice ? priceRange.maxPrice / 1000 : 100,
          ]}
          onChange={(values) => {
            setPriceRange({
              minPrice: values[0] * 10 ** 3,
              maxPrice: values[1] * 10 ** 3,
            });
          }}
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
