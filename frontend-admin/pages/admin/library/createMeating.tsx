/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import ButtonLine from "../../../components/ButtonLine";
import GapMaker from "../../../components/GapMaker";
import {
  LabelInputPropsType,
  NewLabelInput,
} from "../../../components/LabelInput";
import LeftRight from "../../../components/LeftRight";
import MainButton from "../../../components/MainButton";
import { MainContainer } from "../../../components/MainContainer";
import MainTitle from "../../../components/MainTitle";
import SearchGrid from "../../../components/SearchGrid";
import { createLibraryI, imageI } from "../../../utils/api/library";
import { postLibraryAPI, uploadLibraryImageAPI } from "../../../utils/api/menu";
import { getRegionAPI } from "../../../utils/api/region";
import useIconPopup from "../../../utils/useIconPopup";
import { useLoginCheck } from "../../../utils/useLogin";
import usePopup from "../../../utils/usePopup";
import { useRegionInput } from "../../../utils/useRegionInput";
import { ideaSvg } from "./createHotel";
import { optionListI, XSvg } from "./[id]";

export const CreateLibrary = () => {
  const router = useRouter();
  const loginCheck = useLoginCheck();
  const { id } = router.query as { id: string };
  const { data } = useSWR(loginCheck("/region"), getRegionAPI);
  let continentId: string[] = [],
    countryId: string[] = [],
    cityId: string[] = [],
    continentName: string[] = [],
    countryName: string[] = [],
    cityName: string[] = [];
  const [showImages, setShowImages] = useState<string[]>([]);
  const [uploadImages, setUploadImages] = useState<FileList | null>();

  data?.result.data.forEach((element) => {
    if (element.depth === 1) {
      continentId = [...continentId, element.id];
      continentName = [...continentName, element.name];
    } else if (element.depth === 2) {
      countryId = [...countryId, element.id];
      countryName = [...countryName, element.name];
    } else if (element.depth === 3) {
      cityId = [...cityId, element.id];
      cityName = [...cityName, element.name];
    }
  });
  let continentList: optionListI[] = [
    {
      value: "",
      name: "",
    },
  ];
  for (let i = 0; i < continentId.length; i++) {
    continentList = [
      ...continentList,
      { value: continentId[i], name: continentName[i] },
    ];
  }
  let countryList: optionListI[] = [
    {
      value: "",
      name: "",
    },
  ];
  for (let i = 0; i < countryId.length; i++) {
    countryList = [
      ...countryList,
      { value: countryId[i], name: countryName[i] },
    ];
  }
  let cityList: optionListI[] = [
    {
      value: "",
      name: "",
    },
  ];
  for (let i = 0; i < cityId.length; i++) {
    cityList = [...cityList, { value: cityId[i], name: cityName[i] }];
  }
  const useFormReturn = useForm();
  const {
    handleSubmit,
    formState: { errors },
  } = useFormReturn;
  const regionInput = useRegionInput({
    defaultName: "??????",
    useForm: useFormReturn,
  });
  const { component } = usePopup();
  const { component: iconComponent } = useIconPopup();
  const [alertMessage, setAlertMessage] = useState(true);
  useEffect(() => {
    let timer = setTimeout(() => {
      setAlertMessage(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [alertMessage]);
  const saveHandler = handleSubmit(async (d) => {
    console.log(d);
    let idx = id;
    const submitData = {
      name: d.name,
      originalName: d.originalName,
      isUse:
        d.isUse === "true" || d.isUse === true
          ? true
          : d.isUse === "false" || d.isUse === false
          ? false
          : true,
      continent: d.continent,
      country: d.country,
      city: d.city,
      description: d.description,
      category: "????????????",
      isPrivate:
        d.isPrivate === "true" || d.isPrivate === true
          ? true
          : d.isPrivate === "false" || d.isPrivate === false
          ? false
          : false,
      status: d.status ? d.status : "",
      detail: {
        departureAirport: d.departureAirport,
      },
    };
    console.log(submitData);
    const data = await postLibraryAPI(
      submitData.name,
      submitData.originalName,
      submitData.isUse,
      submitData.continent,
      submitData.country,
      submitData.city,
      submitData.description,
      submitData.category,
      submitData.isPrivate,
      submitData.status,
      submitData.detail
    );
    if ("error" in data) {
      alert(data.message);
    } else {
      console.log("post", data.result);
      idx = data.result.id;
      uploadImages &&
        Array.from(uploadImages).forEach(async (image) => {
          const imageData = await uploadLibraryImageAPI({
            uid: data.result.id,
            file: image,
          });
          console.log(imageData);
        });
      goEnd();
    }
  });
  const goEnd = () => {
    router.back();
  };

  const handleAddImages = (event: any) => {
    let imageLists = event.target.files;
    if (!imageLists) return;
    if (imageLists.length > 5) {
      imageLists = imageLists.slice(0, 5);
    }
    let maxSize = 10 * 1024 * 1024;
    for (let i = 0; i < imageLists.length; i++) {
      let imgSize = imageLists[i].size;
      if (imgSize > maxSize) {
        alert("????????? ????????? 10Mb??? ????????? ??? ????????????.");
        imageLists = Object.values(imageLists).filter(
          (image: any, idx: any) => {
            return idx !== i;
          }
        );
      }
    }
    const dataTranster = new DataTransfer();
    uploadImages &&
      Array.from(uploadImages).forEach((file) => {
        dataTranster.items.add(file);
      });
    for (let i = 0; i < imageLists.length; i++) {
      dataTranster.items.add(imageLists[i]);
    }
    // uploadImages
    //   ? setUploadImages(uploadImages, imageLists)
    //   : setUploadImages(imageLists);
    setUploadImages(dataTranster.files);

    let imageUrlLists = showImages ? [...showImages] : [];
    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl as never);
    }

    if (imageUrlLists.length > 5) {
      imageUrlLists = imageUrlLists.slice(0, 5);
    }

    setShowImages(imageUrlLists);
  };

  const handleEditImages = async (event: any, id: number) => {
    let imageLists = event.target.files;
    if (!imageLists) return;
    if (imageLists.length > 5) {
      imageLists = imageLists.slice(0, 5);
    }
    let maxSize = 10 * 1024 * 1024;
    for (let i = 0; i < imageLists.length; i++) {
      let imgSize = imageLists[i].size;
      if (imgSize > maxSize) {
        alert("????????? ????????? 10Mb??? ????????? ??? ????????????.");
        imageLists = Object.values(imageLists).filter(
          (image: any, idx: any) => {
            return idx !== i;
          }
        );
      }
    }
    const dataTranster = new DataTransfer();
    uploadImages &&
      Array.from(uploadImages)
        .filter((file, i) => i != id)
        .forEach((file) => {
          dataTranster.items.add(file);
        });
    for (let i = 0; i < imageLists.length; i++) {
      dataTranster.items.add(imageLists[i]);
    }

    setUploadImages(dataTranster.files);
    let imageUrlLists = showImages ? [...showImages] : [];
    let filteredImageUrlLists = imageUrlLists.filter((v, i) => {
      return i != id;
    });
    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      filteredImageUrlLists.push(currentImageUrl as never);
    }

    if (filteredImageUrlLists.length > 5) {
      filteredImageUrlLists = filteredImageUrlLists.slice(0, 5);
    }

    setShowImages(filteredImageUrlLists);
  };

  const handleDeleteImage = (id: number) => {
    const dataTranster = new DataTransfer();
    uploadImages &&
      Array.from(uploadImages)
        .filter((file, i) => i != id)
        .forEach((file) => {
          dataTranster.items.add(file);
        });
    const filtered = showImages.filter((v, i) => {
      return i !== id;
    });
    setShowImages([...filtered]);
    setUploadImages(dataTranster.files);
  };

  const CreateLibraryInput: LabelInputPropsType[] = [
    {
      inputType: "input",
      labelName: "?????????(??????)",
      inputName: "name",
      gridLabel: true,
      gridRow: 1,
      gridCol: 1,
      isRequired: true,
      registerOptions: {
        required:
          "???????????? ?????? ??? ???????????? ?????? ????????? ????????????.\n ?????? ??? ?????? ???????????? ?????? ?????? ????????????.",
      },
    },
    {
      inputType: "input",
      labelName: "?????????(??????)",
      inputName: "originalName",
      gridLabel: true,
      gridRow: 1,
      gridCol: 2,
      isRequired: true,
      registerOptions: {
        required:
          "???????????? ?????? ??? ???????????? ?????? ????????? ????????????.\n ?????? ??? ?????? ???????????? ?????? ?????? ????????????.",
      },
    },
    {
      inputType: "select",
      labelName: "????????????",
      inputName: "isUse",
      optionList: [
        { value: "", name: "" },
        { value: "true", name: "Y" },
        { value: "false", name: "N" },
      ],
      gridLabel: true,
      gridRow: 1,
      gridCol: 3,
    },
    {
      inputType: "select",
      labelName: "??????",
      inputName: "continent",
      optionList: regionInput.continentList,
      gridLabel: true,
      gridRow: 2,
      gridCol: 1,
      isRequired: true,
      registerOptions: {
        required:
          "???????????? ?????? ??? ???????????? ?????? ????????? ????????????.\n ?????? ??? ?????? ???????????? ?????? ?????? ????????????.",
      },
    },
    {
      inputType: "select",
      labelName: "??????",
      inputName: "country",
      optionList: regionInput.countryList,
      gridLabel: true,
      gridRow: 2,
      gridCol: 2,
      isRequired: true,
      registerOptions: {
        required:
          "???????????? ?????? ??? ???????????? ?????? ????????? ????????????.\n ?????? ??? ?????? ???????????? ?????? ?????? ????????????.",
      },
    },
    {
      inputType: "select",
      labelName: "??????",
      inputName: "city",
      optionList: regionInput.cityList,
      gridLabel: true,
      gridRow: 2,
      gridCol: 3,
      isRequired: true,
      registerOptions: {
        required:
          "???????????? ?????? ??? ???????????? ?????? ????????? ????????????.\n ?????? ??? ?????? ???????????? ?????? ?????? ????????????.",
      },
    },
    {
      inputType: "select",
      labelName: "????????????",
      inputName: "departureAirport",
      optionList: [
        { value: "", name: "" },
        { value: "ICN", name: "??????/??????" },
        { value: "a2", name: "??????2" },
        { value: "a3", name: "??????3" },
        { value: "a4", name: "??????4" },
        { value: "a5", name: "??????5" },
      ],
      gridLabel: true,
      gridRow: 3,
      gridCol: 1,
      isRequired: true,
      registerOptions: {
        required:
          "???????????? ?????? ??? ???????????? ?????? ????????? ????????????.\n ?????? ??? ?????? ???????????? ?????? ?????? ????????????.",
      },
    },
    {
      inputType: "select",
      labelName: "????????????",
      inputName: "isPrivate",
      optionList: [
        { value: "", name: "" },
        { value: "false", name: "Y" },
        { value: "true", name: "N" },
      ],
      gridLabel: true,
      gridRow: 3,
      gridCol: 2,
    },
    {
      inputType: "textarea",
      labelName: "????????????",
      inputName: "description",
      gridLabel: true,
      gridRow: 4,
      gridCol: 1,
      gridColEnd: 4,
      isRequired: true,
      registerOptions: {
        required:
          "???????????? ?????? ??? ???????????? ?????? ????????? ????????????.\n ?????? ??? ?????? ???????????? ?????? ?????? ????????????.",
      },
    },
  ];

  return (
    <MainContainer type="admin">
      {component}
      {iconComponent}
      <LeftRight>
        <MainTitle>??????????????? ?????? ?????? - ????????????</MainTitle>
        <ButtonLine>
          <MainButton
            form="createLibrary"
            styleType="black"
            onClick={() => {
              saveHandler;
              setAlertMessage(true);
            }}
            type="submit"
          >
            ????????????
          </MainButton>
        </ButtonLine>
      </LeftRight>
      <GapMaker height={24} />
      <form
        id="createLibrary"
        className="w-full bg-white p-8 border-[1.7px] border-[#d7d7d7] rounded-[8px]"
        onSubmit={saveHandler}
      >
        <SearchGrid rows={2} cols={3}>
          {CreateLibraryInput.map((d) => (
            <>
              <NewLabelInput
                {...d}
                useForm={useFormReturn}
                key={d.inputName}
                small={true}
                isRequired={d.isRequired}
                registerOptions={d.registerOptions}
              />
            </>
          ))}
          <>
            {((errors.name && errors.name.type === "required") ||
              (errors.originalName &&
                errors.originalName.type === "required") ||
              (errors.continent && errors.continent.type === "required") ||
              (errors.country && errors.country.type === "required") ||
              (errors.city && errors.city.type === "required") ||
              (errors.tier && errors.tier.type === "required") ||
              (errors.description && errors.description.type === "required")) &&
              alertMessage && (
                <div
                  role={"alert"}
                  className="absolute left-[(w-screen-714px)/2] top-[(h-screen-110px)/2] w-[714px] h-[110px] flex justify-center items-center bg-white border-2 border-[#FF3939] rounded-[5px] gap-4 text-[#FF3939] text-base"
                >
                  <div className="">{ideaSvg}</div>
                  <p>
                    ???????????? ?????? ??? ???????????? ?????? ????????? ????????????.{<br />}
                    ?????? ??? ?????? ???????????? ?????? ?????? ????????????.
                  </p>
                </div>
              )}
          </>
        </SearchGrid>
        <div className="flex flex-col gap-4 justify-center">
          <input
            id="upload"
            type={"file"}
            hidden
            accept="image/png, image/jpg, image/jpeg"
            multiple
            onChange={(e) => {
              handleAddImages(e);
            }}
          />
          <div className="flex gap-4">
            <div className="flex items-start whitespace-pre-wrap gap-0.5 pt-2  flex-shrink-0 text-xl font-semibold text-[#353535]">
              ?????????
            </div>
            <label
              htmlFor="upload"
              className="flex justify-center items-center rounded-lg font-semibold text-xl cursor-pointer bg-[#00192F] text-white w-36 h-12"
            >
              ????????? ??????
            </label>
            <span className="text-[#ff3939] flex items-end">
              ???????????? 5????????? ?????? ????????????, ????????? 10Mb??? ????????? ??? ????????????.
              ?????? ????????? 800x450(px)
            </span>
          </div>
          <div className="flex gap-4">
            {showImages &&
              showImages.map((image, index) => (
                <div key={`${index}`}>
                  <div className="flex justify-center items-center relative top-[150px] mt-[-150px] w-[200px] h-[150px] group  ">
                    <button
                      type="button"
                      className="absolute right-0 top-0 hidden group-hover:block"
                      onClick={async () => {
                        console.log(index);
                        handleDeleteImage(index);
                      }}
                    >
                      {XSvg}
                    </button>
                    <label
                      htmlFor={`ImageEdit${index}`}
                      className=" hidden group-hover:block cursor-pointer rounded-lg font-semibold text-xl px-4 h-8 bg-[#00192F] text-white"
                    >
                      ??????
                      <input
                        type="file"
                        hidden
                        id={`ImageEdit${index}`}
                        accept="image/png, image/jpg, image/jpeg"
                        onChange={async (e) => {
                          handleEditImages(e, index);
                        }}
                      />
                    </label>
                  </div>
                  <img
                    src={image}
                    alt={image}
                    // layout="fixed"
                    width={200}
                    height={150}
                    style={{
                      objectFit: "contain",
                      width: "200px",
                      height: "150px",
                    }}
                  />
                  {/* <LittleButton
                    svg="delete"
                    onClick={() => {
                      handleDeleteImage(image);
                    }}
                  /> */}
                </div>
              ))}
          </div>
        </div>
      </form>
      <GapMaker height={24} />
      <LeftRight>
        <div></div>
        <ButtonLine>
          {/* <MainButton
            form="createLibrary"
            styleType="gray"
            small
            onClick={() => {
              tmpSaveHandler;
              setAlertMessage(true);
            }}
            type="submit"
          >
            ????????????
          </MainButton> */}
          <MainButton
            form="createLibrary"
            styleType="black"
            onClick={() => {
              saveHandler;
              setAlertMessage(true);
            }}
            type="submit"
          >
            ????????????
          </MainButton>
        </ButtonLine>
      </LeftRight>
    </MainContainer>
  );
};

export default CreateLibrary;
