import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import ButtonLine from "../../../components/ButtonLine";
import GapMaker from "../../../components/GapMaker";
import LeftRight from "../../../components/LeftRight";
import MainButton from "../../../components/MainButton";
import { MainContainer } from "../../../components/MainContainer";
import MainTable from "../../../components/MainTable";
import MainTitle from "../../../components/MainTitle";
import RegionItem from "../../../components/RegionItem";
import { eachRegionI, getRegionAPI } from "../../../utils/api/region";
import { useLoginCheck } from "../../../utils/useLogin";

export interface RegionProps {
  id: string;
  name: string;
  code: string;
  depth: number;
  priority: number;
  isEnable: boolean;
  createdAt: string;
  updatedAt: string;
  next: eachRegionI[] | null;
  parent: eachRegionI | null;
  cid?: number;
  isEdit: boolean;
  link?: number;
}

export const RegionManagement = () => {
  const useFormReturn = useForm();
  const loginCheck = useLoginCheck();
  const router = useRouter();
  const { query } = router;
  const { data } = useSWR(loginCheck("/region"), getRegionAPI);
  const [priority1List, setPriority1List] = useState<Array<number>>([]);
  const [priority2List, setPriority2List] = useState<Array<number>>([]);
  const [priority3List, setPriority3List] = useState<Array<number>>([]);
  const [canEdit, setCanEdit] = useState(true);
  useEffect(() => {
    const nested = () => {
      let p1: any = [],
        p2: any = [],
        p3: any = [];
      data?.result?.data.sort((a, b) => a.depth - b.depth);
      data?.result?.data.map((v, i) => {
        if (v.depth === 1) {
          p1.push(v);
          priority1List.push(v.priority);
        } else if (v.depth === 2) {
          p2.push(v);
          priority2List.push(v.priority);
        } else if (v.depth === 3) {
          p3.push(v);
          priority3List.push(v.priority);
        }
      });
      p1.sort((a: eachRegionI, b: eachRegionI) => a.priority - b.priority);
      p2.sort((a: eachRegionI, b: eachRegionI) => a.priority - b.priority);
      p3.sort((a: eachRegionI, b: eachRegionI) => a.priority - b.priority);
      p2.forEach((element: any) => {
        element.next = [];
      });
      p1.forEach((element: any) => {
        element.next = [];
      });

      for (let i = 0; i < p3.length; i++) {
        for (let j = 0; j < p2.length; j++) {
          if (p3[i].parent && p3[i].parent.id === p2[j].id) {
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
      data?.result?.data.splice(0, data.result?.data.length);
      for (let i = 0; i < p1.length; i++) {
        data?.result?.data.push(p1[i]);
      }
    };
    nested();
  }, [data]);

  // console.log(priority1List, priority2List, priority3List);

  // data?.result?.data.sort((a, b) => a.depth - b.depth);
  // const nested = (p: any, c: any) => {
  //   p.next.map((v: any, i: any) => {
  //     if (p.hasOwnProperty("next") && p.next !== null && p.next !== undefined) {
  //       if (c.id !== v.id) {
  //         p.next.push(c);
  //       }
  //     } else if (p.hasOwnProperty("next") && p.next === null) {
  //       p.next = [c];
  //     } else {
  //       console.log(c);
  //     }
  //   });
  //   for (let i = 0; i < p.next.length - 1; i++) {
  //     for (let j = i + 1; j < p.next.length; j++) {
  //       if (p.next[i].id === p.next[j].id) {
  //         p.next.splice(i, 1);
  //       }
  //     }
  //   }
  //   if (data !== undefined) {
  //     for (let i = 0; i < data?.result?.data.length; i++) {
  //       if (data.result?.data[i].depth !== 1) {
  //         data.result?.data.splice(i, 1);
  //       }
  //     }
  //   }
  // };
  // if (data !== undefined) {
  //   for (let i = 0; i < data?.result?.data.length - 1; i++) {
  //     const a = data?.result?.data[i];
  //     for (let j = i + 1; j < data?.result?.data.length; j++) {
  //       const b = data?.result?.data[j];
  //       if (a && b?.parent && a.id === b.parent.id) {
  //         nested(a, b);
  //       } else if (b && a?.parent && b.id === a.parent.id) {
  //         nested(b, a);
  //       }
  //     }
  //   }
  // }
  const [newRegion, setNewRegion] = useState({
    name: "",
    code: "",
    depth: 1,
    priority: 1,
    isEnable: false,
    isEdit: true,
  });
  const result = data?.result?.data.filter((x) => !x.parent);
  const [regionList, setRegionList] = useState(data?.result?.data);
  async () => {
    await setRegionList(result);
  };

  const createNewCategory = () => {
    setCanEdit(false);
    // canEdit = false;

    console.log(canEdit);
    data?.result?.data &&
      setRegionList([
        {
          ...newRegion,
          id: "",
          createdAt: "",
          updatedAt: "",
          next: null,
          parent: null,
        },
        ...data?.result?.data,
      ]);
  };

  useEffect(() => {
    setRegionList(data?.result?.data);
    console.log(data?.result?.data);
  }, [data?.result?.data, query]);

  // useEffect(() => {
  //   console.log(regionList);
  //   let fileteredList, filteredDepthList, filteredDepth2List: RegionProps;
  //   regionList.map((c1) => {
  //     c1.depthItem?.map((c2) => {
  //       c2 &&
  //         c2.depthItem?.map((c3) => {
  //           filteredDepth2List = Array.isArray(c3)
  //             ? c3.sort((a, b) => a.priority - b.priority)
  //             : c3;
  //           return filteredDepth2List;
  //         });
  //       filteredDepthList = Array.isArray(c2)
  //         ? c2.sort((a, b) => a.priority - b.priority)
  //         : c2;
  //       return filteredDepthList;
  //     });
  //     fileteredList = Array.isArray(c1)
  //       ? c1.sort((a, b) => a.priority - b.priority)
  //       : c1;
  //     return fileteredList;
  //   });
  // }, [regionList]);

  useEffect(() => {
    console.log(canEdit);
  }, [canEdit]);
  return (
    <MainContainer type="admin">
      <LeftRight>
        <MainTitle>지역분류 및 관리</MainTitle>
        <ButtonLine>
          <ButtonLine>
            <MainButton
              form="createCategory"
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
      <MainTable>
        <thead>
          <tr className="w-full">
            <th className="w-[250px]">우선순위</th>
            <th className="w-[138px]">지역명</th>
            <th className="w-[138px]">분류</th>
            <th className="w-[138px]">분류코드</th>
            <th className="w-[138px]">연결된 상품</th>
            <th className="w-[138px]">활성</th>
            <th className="w-[320px]"></th>
          </tr>
        </thead>
      </MainTable>
      <GapMaker />
      <div className="w-full">
        <form
          id="region"
          onSubmit={async (e) => {
            e.preventDefault();
            console.log(e.target);
          }}
        >
          {regionList &&
            regionList.map((d1, i) => (
              <>
                <RegionItem
                  regionItem={d1}
                  regionList={regionList}
                  setRegionList={setRegionList}
                  useForm={useFormReturn}
                  // priorityList={priority1List}
                  key={`${d1.id}`}
                  canEdit={canEdit}
                  setCanEdit={setCanEdit}
                />
                {d1.next &&
                  d1.next.map((d2) => (
                    <>
                      <RegionItem
                        regionItem={d2}
                        regionList={regionList}
                        setRegionList={setRegionList}
                        useForm={useFormReturn}
                        // priorityList={priority2List}
                        key={`${d2.id}`}
                        canEdit={canEdit}
                        setCanEdit={setCanEdit}
                      />
                      {d2.next &&
                        d2.next.map((d3) => (
                          <>
                            {d3 && (
                              <RegionItem
                                regionItem={d3}
                                regionList={regionList}
                                setRegionList={setRegionList}
                                useForm={useFormReturn}
                                // priorityList={priority3List}
                                key={`${d3.id}`}
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
        </form>
      </div>
    </MainContainer>
  );
};

export default RegionManagement;
