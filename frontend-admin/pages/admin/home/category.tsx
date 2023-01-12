import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import useSWR from "swr";
import ButtonLine from "../../../components/ButtonLine";
import CategoryItem from "../../../components/CategoryItem";
import GapMaker from "../../../components/GapMaker";
import LeftRight from "../../../components/LeftRight";
import MainButton from "../../../components/MainButton";
import { MainContainer } from "../../../components/MainContainer";
import MainTitle from "../../../components/MainTitle";
import { eachMenuI, getMenuAPI } from "../../../utils/api/menu";
import { useLoginCheck } from "../../../utils/useLogin";

export interface CategoryProps {
  id: string;
  nameKo: string;
  nameEn: string;
  code: string;
  depth: number;
  priority: number;
  isEnable: boolean;
  createdAt: string;
  updatedAt: string;
  next: eachMenuI[] | null;
  parent: eachMenuI | null;
  cid?: number;
  isEdit: boolean;
  link?: number;
}

export const arrowSvg = (
  <svg
    width="16"
    height="18"
    viewBox="0 0 16 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 1C9 0.447715 8.55228 2.41411e-08 8 0C7.44772 -2.41411e-08 7 0.447715 7 1L9 1ZM7.29289 17.7071C7.68342 18.0976 8.31658 18.0976 8.70711 17.7071L15.0711 11.3431C15.4616 10.9526 15.4616 10.3195 15.0711 9.92893C14.6805 9.53841 14.0474 9.53841 13.6569 9.92893L8 15.5858L2.34315 9.92893C1.95262 9.53841 1.31946 9.53841 0.928932 9.92893C0.538407 10.3195 0.538407 10.9526 0.928932 11.3431L7.29289 17.7071ZM7 1L7 17L9 17L9 1L7 1Z"
      fill="#FF5C00"
    />
  </svg>
);

export const CategoryManagement = () => {
  const loginCheck = useLoginCheck();
  const router = useRouter();
  const { query } = router;
  const [canEdit, setCanEdit] = useState(true);
  const { data, mutate } = useSWR(loginCheck("/menu"), getMenuAPI);
  useEffect(() => {
    const nested = () => {
      let p1: any = [],
        p2: any = [],
        p3: any = [];
      data?.result.data.sort((a, b) => a.depth - b.depth);
      data?.result.data.map((v, i) => {
        if (v.depth === 1) {
          p1.push(v);
        } else if (v.depth === 2) {
          p2.push(v);
        } else if (v.depth === 3) {
          p3.push(v);
        }
      });
      p1.sort((a: eachMenuI, b: eachMenuI) => a.priority - b.priority);
      p2.sort((a: eachMenuI, b: eachMenuI) => a.priority - b.priority);
      p3.sort((a: eachMenuI, b: eachMenuI) => a.priority - b.priority);
      console.log(p1, p2, p3);
      p2.forEach((element: any) => {
        element.next = [];
      });
      p1.forEach((element: any) => {
        element.next = [];
      });

      for (let i = 0; i < p3.length; i++) {
        for (let j = 0; j < p2.length; j++) {
          if (p3[i].parent.id === p2[j].id) {
            p2[j].next.push(p3[i]);
          }
        }
      }
      for (let i = 0; i < p2.length; i++) {
        for (let j = 0; j < p1.length; j++) {
          if (p2[i].parent && p2[i].parent.id === p1[j].id) {
            p1[j].next.push(p2[i]);
          }
        }
      }

      console.log(p1);
      data?.result.data.splice(0, data.result.data.length);
      for (let i = 0; i < p1.length; i++) {
        data?.result.data.push(p1[i]);
      }
    };
    nested();
  }, [data]);

  const [newCategory, setNewCategory] = useState({
    nameKo: "",
    nameEn: "",
    code: "",
    depth: 1,
    priority: 1,
    isEnable: true,
    isEdit: true,
  });
  const result = data?.result.data.filter((x) => !x.parent);
  const [categoryList, setCategoryList] = useState(data?.result.data);

  async () => {
    await setCategoryList(result);
  };

  const createNewCategory = () => {
    setCanEdit(false);
    data?.result.data &&
      setCategoryList([
        {
          ...newCategory,
          id: "",
          createdAt: "",
          updatedAt: "",
          next: null,
          parent: null,
        },
        ...data?.result.data,
      ]);
  };

  useEffect(() => {
    setCategoryList(data?.result.data);
    console.log(data?.result.data);
  }, [data?.result.data, query]);

  return (
    <MainContainer type="admin">
      <LeftRight>
        <MainTitle>카테고리 관리</MainTitle>
        <ButtonLine>
          <ButtonLine>
            <MainButton
              styleType="black"
              forGrid
              className="whitespace-nowrap w-fit px-4 py-1"
              onClick={() => canEdit && createNewCategory()}
            >
              대분류 카테고리 생성
            </MainButton>
          </ButtonLine>
        </ButtonLine>
      </LeftRight>
      <GapMaker height={24} />
      <GapMaker height={24} />
      <div className="flex w-full text-center border-spacing-x-0 border-spacing-y-[10px] border-separate mb-2">
        <div className="flex w-full h-[48px] outline outline-[#BABABA] rounded-[5px]">
          <div className="w-full flex h-full font-bold text-[#353535]">
            <div className="w-full flex mr-[112px] justify-center items-center">
              우선순위
            </div>
            <div className="w-full flex justify-center items-center">
              카테고리명(한글)
            </div>
            <div className="w-full flex justify-center items-center">
              카테고리명(영문)
            </div>
            <div className="w-full flex justify-center items-center">분류</div>
            <div className="w-full flex justify-center items-center">
              분류코드
            </div>
            <div className="w-full flex justify-center items-center">
              상품연결
            </div>
            <div className="w-full flex justify-center items-center">활성</div>
            <div className="w-full flex">
              <div className="w-full min-w-[179.55px] pr-[-30px]"></div>
            </div>
            <div className="w-full flex"></div>
          </div>
        </div>
      </div>
      <GapMaker />
      <div className="w-full">
        {categoryList &&
          categoryList.map((d1, i) => (
            <>
              <CategoryItem
                categoryItem={d1}
                categoryList={categoryList}
                setCategoryList={setCategoryList}
                key={d1 && `${d1.id}`}
                mutate={mutate}
                canEdit={canEdit}
                setCanEdit={setCanEdit}
              />
              {d1 &&
                d1.next &&
                Array.isArray(d1.next) &&
                d1.next.map((d2) => (
                  <>
                    {d2 && (
                      <CategoryItem
                        categoryItem={d2}
                        categoryList={categoryList}
                        setCategoryList={setCategoryList}
                        key={`${d2.id}`}
                        mutate={mutate}
                        canEdit={canEdit}
                        setCanEdit={setCanEdit}
                      />
                    )}
                    {d2 &&
                      d2.next &&
                      d2.next.map((d3) => (
                        <>
                          {d3 && (
                            <CategoryItem
                              categoryItem={d3}
                              categoryList={categoryList}
                              setCategoryList={setCategoryList}
                              key={`${d3.id}`}
                              mutate={mutate}
                              canEdit={canEdit}
                              setCanEdit={setCanEdit}
                            />
                          )}
                        </>
                      ))}
                  </>
                ))}
            </>
          ))}
      </div>
    </MainContainer>
  );
};

export default CategoryManagement;
