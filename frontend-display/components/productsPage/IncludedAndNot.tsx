import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { UserContext } from "../../contexts/UserStore";
import Circle from "../../public/images/circle.svg";
import X from "../../public/images/x.svg";
import { secondArgsFetcher } from "../../utils/api";
import { eachNoteI, getProductById } from "../../utils/api/product";
import Accordion from "../Accordion";

const tempEtcList = [
  {
    title: "참고1",
    description: "항공권항공권항공권항공권항공권항공권항공권항공권항공권항공권",
  },
  {
    title: "참고2",
    description: "항공권항공권항공권항공권항공권항공권항공권항공권항공권항공권",
  },
  {
    title: "참고3",
    description: "항공권항공권항공권항공권항공권항공권항공권항공권항공권항공권",
  },
];

const AccordionBox = (props: any) => {
  const { children, full } = props;
  if (full) {
    return (
      <div className="flex  w-full flex-col lg:gap-[31px] lg:rounded-[6px] lg:border lg:border-[#bababa] lg:px-[31px] lg:py-[28px]">
        {children}
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col lg:gap-[31px] lg:rounded-[6px] lg:border lg:border-[#bababa] lg:px-[31px] lg:py-[28px]">
      {children}
    </div>
  );
};

const YesNoTitle = (props: any) => {
  const { children } = props;
  return (
    <h1 className="font-['Pretendard'] text-[16px] font-semibold leading-[19.1px] text-[#292929] lg:text-[22px] lg:leading-[26px]">
      {children}
    </h1>
  );
};

const IncludedAndNot = ({
  included,
  notIncluded,
  etc,
}: {
  included: eachNoteI[];
  notIncluded: eachNoteI[];
  etc: string;
}) => {
  const [includedList, setIncludedList] = useState<any>([]);
  const [notIncludedList, setNotIncludedList] = useState<any>([]);
  const context = useContext(UserContext);
  const { productData: data } = context;

  useEffect(() => {
    setIncludedList((prev: any) => [...prev, { ...data?.note[0] }]);
    setNotIncludedList((prev: any) => [...prev, { ...data?.note[1] }]);
  }, [data]);

  return (
    <div className="mt-[56px] flex w-full flex-col px-[20px] pb-[68px] lg:px-0 lg:pb-0">
      <div className="just flex flex-col gap-[30px] lg:grid lg:grid-cols-2">
        <div className="include flex flex-col gap-[23px] ">
          <div className="flex items-center gap-[10px]">
            <div className="flex lg:hidden">
              <Circle width="19.22px" height="19.22px" />
            </div>
            <div className="hidden lg:flex">
              <Circle width="23.13px" height="23.13px" />
            </div>

            <YesNoTitle>포함</YesNoTitle>
          </div>

          <AccordionBox>
            <Accordion
              data={included.map((t) => ({
                title: t.title,
                description: t.description,
              }))}
            />
          </AccordionBox>
        </div>

        <div className="notInclude flex flex-col gap-[23px]  ">
          <div className="flex items-center gap-[10px]">
            <div className="flex-center lg:hidden">
              <X width="20px" height="20px" />
            </div>
            <div className="lg:flex-center hidden">
              <X width="15px" height="15px" />
            </div>
            <YesNoTitle>불포함</YesNoTitle>
          </div>

          <AccordionBox>
            <Accordion
              data={notIncluded.map((t) => ({
                title: t.title,
                description: t.description,
              }))}
            />
          </AccordionBox>
        </div>
      </div>

      <div className="reference mt-[46px] flex flex-col gap-[21px]">
        <div className="reference-textbox flex gap-[10px]">
          <div className="relative flex">
            <div className="flex lg:hidden">
              <Circle width="19.22px" height="19.22px" className="absolte" />
            </div>
            <div className="hidden lg:flex">
              <Circle width="23.13px" height="23.13px" className="absolte" />
            </div>
            <span className="absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] font-['Pretendard'] text-[15px] font-semibold leading-[18px] text-[#00192f] ">
              !
            </span>
          </div>
          <YesNoTitle>기타 참고사항</YesNoTitle>
        </div>

        <AccordionBox full>
          <div dangerouslySetInnerHTML={{ __html: etc }}></div>
        </AccordionBox>
      </div>
    </div>
  );
};

export default IncludedAndNot;
