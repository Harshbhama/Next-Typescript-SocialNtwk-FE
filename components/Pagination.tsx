import React, { useEffect } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
interface Pagination {
  totalData: number,
  pageNumbers: number,
  active: number,
  setActive: any
}
export const DefaultPagination: React.FC<Pagination> = ({ totalData, pageNumbers, active, setActive }) => {
  const [pageArr, setPageArr] = React.useState<number[]>([]);

  const getItemProps = (index: number) =>
  ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => {
      setActive(index)
    },
  } as any);

  const next = () => {
    if (active === 5) return;
    setActive(active + 1);
  };
  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };
  useEffect(() => {
    let arr = []
    for(let k=0; k<pageNumbers;k++){
      arr.push(k+1);
    }
    setPageArr(arr);
  },[pageNumbers])
  return (
    <div className="flex items-center gap-4 justify-end pb-5 pt-5">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {!!pageArr?.length && pageArr.map((val, index) => {
          return(
            <IconButton {...getItemProps(index+1)}>{index+1}</IconButton>
          )
        })}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={active === pageNumbers}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}