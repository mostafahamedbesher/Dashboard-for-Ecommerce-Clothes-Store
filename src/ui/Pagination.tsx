import { HiChevronRight } from "react-icons/hi2";
import { HiChevronLeft } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

interface PaginationProps {
  dataLength: number;
  numItemsPerPage: number;
}

function Pagination({ dataLength, numItemsPerPage }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const param = new URLSearchParams("page");
  const pageNum = Number(searchParams.get("page")) || 0;

  function handlePrevious() {
    if (pageNum > 0) {
      param.set("page", String(pageNum - 1));
      setSearchParams(param);
    }
  }

  function handleNext() {
    if ((pageNum + 1) * numItemsPerPage < dataLength) {
      param.set("page", String(pageNum + 1));
      setSearchParams(param);
    }
  }

  if (dataLength === 0) return null;

  return (
    <div className="flex items-center justify-between text-primary_2">
      <div className="text-base">
        Showing{" "}
        <span className="font-semibold">{pageNum * numItemsPerPage + 1}</span>{" "}
        to{" "}
        <span className="font-semibold">
          {Math.min((pageNum + 1) * numItemsPerPage, dataLength)}
        </span>{" "}
        of <span className="font-semibold">{dataLength}</span> results
      </div>

      <div className="flex items-center gap-8">
        <button
          disabled={pageNum === 0}
          className={`flex items-center justify-center gap-1 px-4 py-1 rounded-md ${
            pageNum === 0
              ? ""
              : "bg-secondary text-primary_4 hover:bg-secondary_2"
          }`}
          onClick={handlePrevious}
        >
          <span>
            <HiChevronLeft className="w-4 h-4 font-semibold" />
          </span>
          <span>Previous</span>
        </button>

        <button
          disabled={(pageNum + 1) * numItemsPerPage >= dataLength}
          className={`flex items-center justify-center gap-1 px-4 py-1 rounded-md ${
            (pageNum + 1) * numItemsPerPage >= dataLength
              ? ""
              : "bg-secondary text-primary_4 hover:bg-secondary_2"
          }`}
          onClick={handleNext}
        >
          <span>Next</span>
          <span>
            <HiChevronRight className="w-4 h-4 font-semibold" />
          </span>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
