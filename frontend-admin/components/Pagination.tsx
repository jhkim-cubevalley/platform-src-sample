import { Router, useRouter } from "next/router";
import { UseFormReturn } from "react-hook-form";
import { cls } from "../utils/cls";
import { queryFilter } from "../utils/queryFilter";
export const LeftDoubleArrow = (
  <svg
    width="26"
    height="21"
    viewBox="0 0 26 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M25.0187 1.93858C25.4625 1.49471 25.4625 0.775171 25.0187 0.331308C24.5749 -0.112328 23.8554 -0.112328 23.4117 0.331308L14.3208 9.42233C13.877 9.8661 13.877 10.5856 14.3208 11.0294L23.4117 20.1203C23.8554 20.5641 24.5749 20.5641 25.0187 20.1203C25.4625 19.6765 25.4625 18.957 25.0187 18.5132L16.7314 10.2258L25.0187 1.93858ZM11.3824 1.93858C11.8262 1.49471 11.8262 0.77517 11.3824 0.331307C10.9386 -0.112329 10.2191 -0.112329 9.77531 0.331307L0.684291 9.42233C0.240655 9.8661 0.240655 10.5856 0.684291 11.0294L9.77531 20.1203C10.2191 20.5641 10.9386 20.5641 11.3824 20.1203C11.8262 19.6765 11.8262 18.957 11.3824 18.5132L3.09497 10.2258L11.3824 1.93858Z"
      fill="black"
    />
  </svg>
);
export const RightDoubleArrow = (
  <svg
    width="26"
    height="21"
    viewBox="0 0 26 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.684409 18.5145C0.240614 18.9584 0.240614 19.678 0.684409 20.1218C1.12818 20.5655 1.84768 20.5655 2.29145 20.1218L11.3824 11.0308C11.8262 10.587 11.8262 9.86753 11.3824 9.42375L2.29145 0.332846C1.84768 -0.110949 1.12818 -0.110949 0.684409 0.332846C0.240614 0.776619 0.240614 1.49612 0.684409 1.93989L8.97177 10.2273L0.684409 18.5145ZM14.3208 18.5145C13.877 18.9584 13.877 19.678 14.3208 20.1218C14.7645 20.5655 15.484 20.5655 15.9278 20.1218L25.0188 11.0308C25.4625 10.587 25.4625 9.86753 25.0188 9.42375L15.9278 0.332846C15.484 -0.110949 14.7645 -0.110949 14.3208 0.332846C13.877 0.776619 13.877 1.49612 14.3208 1.93989L22.6082 10.2273L14.3208 18.5145Z"
      fill="black"
    />
  </svg>
);

const PaginationButton = ({
  active,
  pageIndex,
  onClick,
}: {
  active: boolean;
  pageIndex: number;
  onClick: any;
}) => {
  return (
    <button
      onClick={onClick}
      className={cls(
        active ? "bg-[#212121] text-white" : "bg-white",
        `flex justify-center items-center w-10 h-10 rounded-[28px] border border-[#D9D9D9]`
      )}
    >
      <div className="w-10 h-10 font-[350] text-lg leading-10 text-center align-middle ">
        {pageIndex}
      </div>
    </button>
  );
};
export const Pagination = ({
  total,
  limit,
  pageIndex,
  setPageIndex,
  useForm,
}: {
  total: number;
  limit: number;
  pageIndex: number;
  setPageIndex: (pageIndex: number) => void;
  useForm: UseFormReturn<any>;
}) => {
  const numPages = Math.ceil(total / limit);
  const router = useRouter();
  // const { register, setValue } = useForm;
  return (
    <div className="flex justify-center items-center">
      <button
        disabled={pageIndex === 1}
        onClick={() => {
          // router.query
          //   ? router.push(router.asPath + `&offset=${pageIndex + 1}`)
          //   : router.push(router.pathname + `/?offset=${pageIndex + 1}`);
          setPageIndex(pageIndex - 1);
          router.replace({
            query: {
              ...queryFilter(router.query),
              limit: 8,
              offset: pageIndex - 1,
            },
          });
          // setValue("offset", pageIndex - 1);
        }}
      >
        {LeftDoubleArrow}
      </button>
      <div className="flex mx-5 gap-1">
        {
          // numPages > 5
          // ? Array(Math.ceil((numPages + limit) / limit))
          //     .fill("")
          //     .map((v, i) => (
          //       <PaginationButton
          //         active={i + 1 === pageIndex}
          //         pageIndex={i + 1}
          //         key={i + 1}
          //         onClick={() => {
          //           setPageIndex(i + 1);
          //         }}
          //       />
          //     ))
          //   :
          Array(numPages)
            .fill("")
            .map((v, i) => (
              <PaginationButton
                active={i + 1 === pageIndex}
                pageIndex={i + 1}
                key={i + 1}
                onClick={() => {
                  setPageIndex(i + 1);

                  // router.query
                  //   ? router.push(router.asPath + `&offset=${pageIndex + 1}`)
                  //   : router.push(
                  //       router.pathname + `/?offset=${pageIndex + 1}`
                  //     );
                  // router.push(router.pathname + `/?offset=${i + 1}`);
                  // setValue("offset", i + 1);
                  router.replace({
                    query: {
                      ...queryFilter(router.query),
                      limit: 8,
                      offset: i + 1,
                    },
                  });
                  // router.push(router.asPath + `/?offset=${i + 1}`);
                }}
              />
            ))
        }
        {/* <button className="flex justify-center items-center w-10 h-10 rounded-[28px] bg-white border border-[#D9D9D9]">
          <div className="w-10 h-10 font-[350] text-lg leading-10 text-center align-middle ">
            {pageIndex}
          </div>
        </button>
        <button className="flex justify-center items-center w-10 h-10 rounded-[28px] bg-white border border-[#D9D9D9]">
          <div className="w-10 h-10 font-[350] text-lg leading-10 text-center align-middle ">
            {pageIndex + 1}
          </div>
        </button>
        <button className="flex justify-center items-center w-10 h-10 rounded-[28px] bg-[#212121] border border-[#D9D9D9]">
          <div className="w-10 h-10 font-[350] text-lg leading-10 text-center align-middle text-white">
            {pageIndex + 2}
          </div>
        </button>
        <button className="flex justify-center items-center w-10 h-10 rounded-[28px] bg-white border border-[#D9D9D9]">
          <div className="w-10 h-10 font-[350] text-lg leading-10 text-center align-middle ">
            {pageIndex + 3}
          </div>
        </button>
        <button className="flex justify-center items-center w-10 h-10 rounded-[28px] bg-white border border-[#D9D9D9]">
          <div className="w-10 h-10 font-[350] text-lg leading-10 text-center align-middle ">
            {pageIndex + 4}
          </div>
        </button> */}
      </div>
      <button
        disabled={pageIndex === numPages}
        onClick={() => {
          setPageIndex(pageIndex + 1);
          console.log(router.query);
          // router.query
          //   ? router.push(router.asPath + `&offset=${pageIndex + 1}`)
          //   : router.push(router.pathname + `/?offset=${pageIndex + 1}`);
          // router.push(router.pathname + `/?offset=${pageIndex + 1}`);
          // setValue("offset", pageIndex + 1);
          router.replace({
            query: {
              ...queryFilter(router.query),
              limit: 8,
              offset: pageIndex + 1,
            },
          });
        }}
      >
        {RightDoubleArrow}
      </button>
    </div>
  );
};
