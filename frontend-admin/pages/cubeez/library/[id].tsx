/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
import { secondArgsFetcher } from "../../../utils/api";
import { deleteImageI, imageI } from "../../../utils/api/library";
import {
  deleteLibraryImageAPI,
  editLibraryAPI,
  getEachLibraryAPI,
  uploadLibraryImageAPI,
} from "../../../utils/api/menu";
import { getRegionAPI } from "../../../utils/api/region";
import { openGlobalTextPopup } from "../../../utils/globalPopup";
import useIconPopup from "../../../utils/useIconPopup";
import { useLoginCheck } from "../../../utils/useLogin";
import usePopup from "../../../utils/usePopup";
import { useRegionInput } from "../../../utils/useRegionInput";
import { XSvg } from "../../admin/library/[id]";
export interface optionListI {
  value: string;
  name: string;
}
export const ideaSvg = (
  <svg
    width="61"
    height="69"
    viewBox="0 0 61 69"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M30.5 61C47.3447 61 61 47.3447 61 30.5C61 13.6553 47.3447 0 30.5 0C13.6553 0 0 13.6553 0 30.5C0 47.3447 13.6553 61 30.5 61Z"
      fill="#FFF59D"
    />
    <path
      d="M50.3217 30.4985C50.3217 18.756 40.2567 9.45353 28.2092 10.826C19.0592 11.8935 11.7392 19.2135 10.8242 28.3635C10.0617 35.3785 12.9592 41.631 17.8392 45.596C19.9742 47.426 21.3467 50.0185 21.3467 52.916C21.3467 53.1687 21.5516 53.3735 21.8042 53.3735H39.4942C39.5785 53.3735 39.6467 53.3053 39.6467 53.221C39.6467 50.476 40.8667 47.731 43.0017 45.901C47.4242 42.241 50.3217 36.751 50.3217 30.4985Z"
      fill="#FBC02D"
    />
    <path
      d="M40.5641 27.7553L35.9891 24.7053C35.5316 24.4003 34.7691 24.4003 34.3116 24.7053L33.2501 25.3846C31.5786 26.4544 29.4326 26.4343 27.7814 25.3335L26.8391 24.7053C26.3816 24.4003 25.6191 24.4003 25.1616 24.7053L20.9985 27.4807C20.7245 27.6633 20.4544 27.86 20.2502 28.1182C20.0912 28.3192 19.9766 28.5423 19.9766 28.8228C19.9766 29.2803 19.9766 29.7378 20.2816 30.0428L24.9647 35.8351C25.6841 36.7249 26.0766 37.8345 26.0766 38.9787V51.8503C26.0766 52.6925 26.7593 53.3753 27.6016 53.3753C28.4438 53.3753 29.1266 52.6925 29.1266 51.8503V36.6003C29.1266 36.4584 29.0935 36.3164 29.0428 36.1745C28.9227 35.8382 28.7086 35.545 28.4847 35.2668L24.8601 30.7635C24.2848 30.0487 24.4469 28.9942 25.2104 28.4852C25.7349 28.1356 26.4182 28.1356 26.9427 28.4852L29.7366 30.3478C30.1941 30.6528 30.9566 30.6528 31.4141 30.3478L34.2079 28.4852C34.7324 28.1356 35.4157 28.1356 35.9402 28.4852C36.7037 28.9942 36.8658 30.0487 36.2905 30.7636L32.6659 35.2668C32.442 35.545 32.2279 35.8382 32.1078 36.1745C32.0571 36.3164 32.0241 36.4584 32.0241 36.6003V51.8503C32.0241 52.6925 32.7068 53.3753 33.5491 53.3753C34.3913 53.3753 35.0741 52.6925 35.0741 51.8503V38.9787C35.0741 37.8345 35.4665 36.7249 36.1859 35.8351L40.8691 30.0428C41.1741 29.7378 41.3266 29.2803 41.1741 28.8228C41.0216 28.3653 40.8691 27.9078 40.5641 27.7553Z"
      fill="#FFF59D"
    />
    <path
      d="M30.4969 68.6266C33.0236 68.6266 35.0719 66.5783 35.0719 64.0516C35.0719 61.5249 33.0236 59.4766 30.4969 59.4766C27.9702 59.4766 25.9219 61.5249 25.9219 64.0516C25.9219 66.5783 27.9702 68.6266 30.4969 68.6266Z"
      fill="#5C6BC0"
    />
    <path
      d="M33.5516 65.5766H27.4516C24.0966 65.5766 21.3516 62.8316 21.3516 59.4766V56.8516C21.3516 54.0901 23.5901 51.8516 26.3516 51.8516H34.6516C37.413 51.8516 39.6516 54.0901 39.6516 56.8516V59.4766C39.6516 62.8316 36.9066 65.5766 33.5516 65.5766Z"
      fill="#9FA8DA"
    />
    <path
      d="M39.1787 61.8697C39.6937 60.6936 38.517 59.633 37.2451 59.8084L24.8961 61.5117C23.4188 61.7155 22.5902 63.3085 23.7628 64.2299C24.1551 64.5382 24.669 64.6245 25.1633 64.5561L37.7929 62.8095C38.3926 62.7265 38.9359 62.4244 39.1787 61.8697Z"
      fill="#5C6BC0"
    />
    <path
      d="M22.6497 55.7836C21.905 55.8891 21.3516 56.5265 21.3516 57.2786C21.3516 58.1967 22.1642 58.9024 23.0733 58.7736L38.3534 56.6089C39.0981 56.5034 39.6516 55.866 39.6516 55.1139C39.6516 54.1958 38.8389 53.4901 37.9298 53.6189L22.6497 55.7836Z"
      fill="#5C6BC0"
    />
  </svg>
);

export const CreateLibrary = () => {
  const router = useRouter();
  const loginCheck = useLoginCheck();
  const { id } = router.query as { id: string };
  const productData = useSWR(loginCheck("/region"), getRegionAPI);
  const { data } = useSWR(
    loginCheck(["/library/uid", id]),
    secondArgsFetcher(getEachLibraryAPI)
  );
  let continentId: string[] = [],
    countryId: string[] = [],
    cityId: string[] = [],
    continentName: string[] = [],
    countryName: string[] = [],
    cityName: string[] = [];
  const [showImages, setShowImages] = useState<imageI[]>([]);
  const [uploadImages, setUploadImages] = useState<FileList | null>();
  const [deleteImages, setDeleteImages] = useState<deleteImageI[]>([]);

  useEffect(() => {
    if (data && !data.isEditable) {
      openGlobalTextPopup("수정 권한이 없습니다.");
      router.replace("/cubeez/library");
    }
    data?.image && setShowImages(data?.image);
  }, [data]);

  const handleAddImages = async (event: any) => {
    let imageLists = event.target.files;
    if (!imageLists) return;
    if (imageLists.length > 5) {
      imageLists = imageLists.slice(0, 5);
    }
    let maxSize = 10 * 1024 * 1024;
    for (let i = 0; i < imageLists.length; i++) {
      let imgSize = imageLists[i].size;
      if (imgSize > maxSize) {
        alert("이미지 용량은 10Mb를 초과할 수 없습니다.");
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
    console.log(dataTranster.files);
    setUploadImages(dataTranster.files);

    let imageUrlLists = showImages ? [...showImages] : [];
    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl as never);
    }

    if (imageUrlLists.length > 5) {
      imageUrlLists = imageUrlLists.slice(0, 5);
    }

    setShowImages && setShowImages(imageUrlLists);
  };

  const handleEditSavedImages = async (
    event: any,
    id: string,
    imageUrl: string
  ) => {
    let imageLists = event.target.files;
    if (!imageLists) return;
    setDeleteImages([...deleteImages, { id, imageUrl }]);
    if (imageLists.length > 5) {
      imageLists = imageLists.slice(0, 5);
    }
    let maxSize = 10 * 1024 * 1024;
    for (let i = 0; i < imageLists.length; i++) {
      let imgSize = imageLists[i].size;
      if (imgSize > maxSize) {
        alert("이미지 용량은 10Mb를 초과할 수 없습니다.");
        imageLists = Object.values(imageLists).filter(
          (image: any, idx: any) => {
            return idx !== i;
          }
        );
      }
    }
    const dataTranster = new DataTransfer();
    // let len = 0;
    // if (data && data.image) {
    //   len = data.image.length;
    // }
    uploadImages &&
      Array.from(uploadImages).forEach((file) => {
        dataTranster.items.add(file);
      });
    for (let i = 0; i < imageLists.length; i++) {
      dataTranster.items.add(imageLists[i]);
    }
    console.log(dataTranster.files);
    setUploadImages(dataTranster.files);

    let imageUrlLists = showImages ? [...showImages] : [];
    let filteredImageUrlLists = imageUrlLists.filter((v) => {
      return v.id !== id;
    });
    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      filteredImageUrlLists.push(currentImageUrl as never);
    }

    if (filteredImageUrlLists.length > 5) {
      filteredImageUrlLists = filteredImageUrlLists.slice(0, 5);
    }

    setShowImages && setShowImages(filteredImageUrlLists);
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
        alert("이미지 용량은 10Mb를 초과할 수 없습니다.");
        imageLists = Object.values(imageLists).filter(
          (image: any, idx: any) => {
            return idx !== i;
          }
        );
      }
    }
    let len = 0;
    if (data && data.image) {
      len = data.image.length;
    }
    const dataTranster = new DataTransfer();
    uploadImages &&
      Array.from(uploadImages)
        .filter((file, i) => i + len != id)
        .forEach((file) => {
          dataTranster.items.add(file);
        });
    for (let i = 0; i < imageLists.length; i++) {
      dataTranster.items.add(imageLists[i]);
    }
    console.log(dataTranster.files);

    setUploadImages(dataTranster.files);

    const filtered = showImages.filter((v, i) => {
      return i !== id;
    });
    let imageUrlLists = filtered ? [...filtered] : [];
    // let filteredImageUrlLists = imageUrlLists.filter((v, i) => {
    //   return i != id;
    // });
    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl as never);
    }

    if (imageUrlLists.length > 5) {
      imageUrlLists = imageUrlLists.slice(0, 5);
    }

    setShowImages([...imageUrlLists]);
  };
  const handleDeleteSavedImage = (id: string, imageUrl: string) => {
    setDeleteImages([...deleteImages, { id, imageUrl }]);
    setShowImages(
      showImages.filter((v) => {
        return v.id !== id;
      })
    );
  };
  const handleDeleteImage = (id: number) => {
    console.log(id, uploadImages);
    let len = 0;
    if (data && data.image) {
      len = data.image.length;
    }
    const dataTranster = new DataTransfer();
    uploadImages &&
      Array.from(uploadImages)
        .filter((file, i) => i + len != id)
        .forEach((file) => {
          dataTranster.items.add(file);
        });
    const filtered = showImages.filter((v, i) => {
      return i !== id;
    });
    setShowImages([...filtered]);
    console.log(dataTranster.files);

    setUploadImages(dataTranster.files);
  };
  productData.data?.result.data.forEach((element) => {
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
  console.log(continentList);

  const [createLibraryData, setCreateLibraryData] = useState<any>({ data });

  const useFormReturn = useForm();
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormReturn;
  const regionInput = useRegionInput({
    defaultName: "선택",
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
  useEffect(() => {
    reset({
      ...data,
      continent: data?.continent.id,
      country: data?.country.id,
      city: data?.city.id,
      isPrivate: data?.isPrivate,
      address: data?.detail.find((element) => element.key === "address")?.value,
      detailAddress: data?.detail.find(
        (element) => element.key === "detailAddress"
      )?.value,
      tier: data?.detail.find((element) => element.key === "tier")?.value,
      facility: data?.detail.find((element) => element.key === "facility")
        ?.value,
      convenience: data?.detail.find((element) => element.key === "convenience")
        ?.value,
      tel: data?.detail.find((element) => element.key === "tel")?.value,
      web: data?.detail.find((element) => element.key === "web")?.value,
      departureAirport: data?.detail.find(
        (element) => element.key === "departureAirport"
      )?.value,
      duration: data?.detail.find((element) => element.key === "duration")
        ?.value,
      item: data?.detail.find((element) => element.key === "item")?.value,
      canRefund: data?.detail.find((element) => element.key === "canRefund")
        ?.value,
      exchangeRefund: data?.detail.find(
        (element) => element.key === "exchangeRefund"
      )?.value,
      guide: data?.detail.find((element) => element.key === "guide")?.value,
      currency: data?.detail.find((element) => element.key === "currency")
        ?.value,
      costAdult: data?.detail.find((element) => element.key === "costAdult")
        ?.value,
      payment: data?.detail.find((element) => element.key === "payment")?.value,
      replacement: data?.detail.find((element) => element.key === "replacement")
        ?.value,
      upload: data?.image,
    });
  }, [data, reset]);
  const saveHandler = handleSubmit(async (d) => {
    console.log(d);
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
      category: d.category,
      isPrivate:
        d.isPrivate === "true" || d.isPrivate === true
          ? true
          : d.isPrivate === "false" || d.isPrivate === false
          ? false
          : false,
      status: d.status ? d.status : "",
      detail: {
        address: d.address,
        detailAddress: d.detailAddress,
        tier: d.tier,
        tel: d.tel,
        web: d.web,
        facility: d.facility,
        convenience: d.convenience,
        departureAirport: d.departureAirport,
        duration: d.duration,
        item: d.item,
        canRefund: d.canRefund,
        exchangeRefund: d.exchangeRefund,
        guide: d.guide,
        currency: d.currency,
        costAdult: d.costAdult,
        payment: d.payment,
        replacement: d.replacement,
      },
    };
    console.log(submitData);
    const data = await editLibraryAPI(
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
      submitData.detail,
      d.id
    );
    if ("error" in data) {
      alert(data.message);
    } else {
      console.log("put", data.result);
      if (deleteImages && deleteImages[0]) {
        Array.from(deleteImages).forEach(async (image) => {
          let imageName = new URL(image.imageUrl).pathname;
          const imageDeleteResult = await deleteLibraryImageAPI(
            id,
            imageName.slice(1)
          );
          console.log("image delete", imageDeleteResult);
        });
      }
      uploadImages &&
        Array.from(uploadImages).forEach(async (image) => {
          const imageData = await uploadLibraryImageAPI({
            uid: d.id,
            file: image,
          });
          console.log(imageData);
        });
      setCreateLibraryData(d);
      goEnd(d);
    }
  });
  const goEnd = (data: any) => {
    const sumData = { ...createLibraryData, ...data };
    console.log(sumData);
    router.back();
  };
  const CreateHotelInput: LabelInputPropsType[] = [
    {
      inputType: "input",
      labelName: "카드명(한글)",
      inputName: "name",
      gridLabel: true,
      gridRow: 1,
      gridCol: 1,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
    {
      inputType: "input",
      labelName: "카드명(현지)",
      inputName: "originalName",
      gridLabel: true,
      gridRow: 1,
      gridCol: 2,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
    {
      inputType: "select",
      labelName: "사용유무",
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
      labelName: "지역",
      inputName: "continent",
      optionList: regionInput.continentList,
      gridLabel: true,
      gridRow: 2,
      gridCol: 1,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
    {
      inputType: "select",
      labelName: "국가",
      inputName: "country",
      optionList: regionInput.countryList,
      gridLabel: true,
      gridRow: 2,
      gridCol: 2,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
    {
      inputType: "select",
      labelName: "도시",
      inputName: "city",
      optionList: regionInput.cityList,
      gridLabel: true,
      gridRow: 2,
      gridCol: 3,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
    {
      inputType: "input",
      labelName: "주소",
      inputName: "address",
      gridLabel: true,
      gridRow: 3,
      gridCol: 1,
      gridColEnd: 3,
    },
    {
      inputType: "input",
      labelName: "상세주소",
      inputName: "detailAddress",
      gridLabel: true,
      gridRow: 4,
      gridCol: 1,
      gridColEnd: 3,
    },
    {
      inputType: "select",
      labelName: "등급",
      inputName: "tier",
      optionList: [
        { value: "", name: "" },
        { value: "t1", name: "등급1" },
        { value: "t2", name: "등급2" },
        { value: "t3", name: "등급3" },
        { value: "t4", name: "등급4" },
        { value: "t5", name: "등급5" },
      ],
      gridLabel: true,
      gridRow: 5,
      gridCol: 1,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
    {
      inputType: "input",
      labelName: "연락처",
      inputName: "tel",
      gridLabel: true,
      gridRow: 5,
      gridCol: 2,
    },
    {
      inputType: "input",
      labelName: "웹사이트",
      inputName: "web",
      gridLabel: true,
      gridRow: 5,
      gridCol: 3,
    },
    {
      inputType: "textarea",
      labelName: "상세설명",
      inputName: "description",
      gridLabel: true,
      gridRow: 6,
      gridCol: 1,
      gridColEnd: 4,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
    {
      inputType: "textarea",
      labelName: "부대시설",
      inputName: "convenience",
      gridLabel: true,
      gridRow: 7,
      gridCol: 1,
      gridColEnd: 4,
    },
    {
      inputType: "textarea",
      labelName: "객실시설",
      inputName: "facility",
      gridLabel: true,
      gridRow: 8,
      gridCol: 1,
      gridColEnd: 4,
    },
  ];
  const CreateMeatingInput: LabelInputPropsType[] = [
    {
      inputType: "input",
      labelName: "카드명(한글)",
      inputName: "name",
      gridLabel: true,
      gridRow: 1,
      gridCol: 1,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
    {
      inputType: "input",
      labelName: "카드명(현지)",
      inputName: "originalName",
      gridLabel: true,
      gridRow: 1,
      gridCol: 2,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
    {
      inputType: "select",
      labelName: "사용유무",
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
      labelName: "지역",
      inputName: "continent",
      optionList: regionInput.continentList,
      gridLabel: true,
      gridRow: 2,
      gridCol: 1,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
    {
      inputType: "select",
      labelName: "국가",
      inputName: "country",
      optionList: regionInput.countryList,
      gridLabel: true,
      gridRow: 2,
      gridCol: 2,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
    {
      inputType: "select",
      labelName: "도시",
      inputName: "city",
      optionList: regionInput.cityList,
      gridLabel: true,
      gridRow: 2,
      gridCol: 3,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
    {
      inputType: "select",
      labelName: "출발공항",
      inputName: "departureAirport",
      optionList: [
        { value: "", name: "" },
        { value: "ICN", name: "인천/서울" },
        { value: "a2", name: "공항2" },
        { value: "a3", name: "공항3" },
        { value: "a4", name: "공항4" },
        { value: "a5", name: "공항5" },
      ],
      gridLabel: true,
      gridRow: 3,
      gridCol: 1,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
    {
      inputType: "textarea",
      labelName: "상세설명",
      inputName: "description",
      gridLabel: true,
      gridRow: 4,
      gridCol: 1,
      gridColEnd: 4,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
  ];
  const CreateOptionInput: LabelInputPropsType[] = [
    {
      inputType: "input",
      labelName: "카드명(한글)",
      inputName: "name",
      gridLabel: true,
      gridRow: 1,
      gridCol: 1,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
    {
      inputType: "input",
      labelName: "카드명(현지)",
      inputName: "originalName",
      gridLabel: true,
      gridRow: 1,
      gridCol: 2,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
    {
      inputType: "select",
      labelName: "사용유무",
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
      labelName: "지역",
      inputName: "continent",
      optionList: regionInput.continentList,
      gridLabel: true,
      gridRow: 2,
      gridCol: 1,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
    {
      inputType: "select",
      labelName: "국가",
      inputName: "country",
      optionList: regionInput.countryList,
      gridLabel: true,
      gridRow: 2,
      gridCol: 2,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
    {
      inputType: "select",
      labelName: "도시",
      inputName: "city",
      optionList: regionInput.cityList,
      gridLabel: true,
      gridRow: 2,
      gridCol: 3,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
    {
      inputType: "select",
      labelName: "가이드 동행여부",
      inputName: "guide",
      optionList: [
        { value: "", name: "" },
        { value: "true", name: "Y" },
        { value: "false", name: "N" },
      ],
      gridLabel: true,
      gridRow: 3,
      gridCol: 1,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
    {
      inputType: "select",
      labelName: "소요시간",
      inputName: "duration",
      optionList: [
        { value: "", name: "" },
        { value: "30", name: "30분" },
        { value: "60", name: "1시간" },
        { value: "90", name: "1시간 30분" },
        { value: "120", name: "2시간" },
        { value: "150", name: "2시간 30분" },
        { value: "180", name: "3시간" },
        { value: "210", name: "3시간 30분" },
        { value: "240", name: "4시간" },
        { value: "270", name: "4시간 30분" },
        { value: "300", name: "5시간" },
        { value: "330", name: "5시간 30분" },
        { value: "360", name: "6시간" },
      ],
      gridLabel: true,
      gridRow: 3,
      gridCol: 2,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
    {
      inputType: "select",
      labelName: "통화기준",
      inputName: "currency",
      optionList: [
        { value: "", name: "" },
        { value: "USD", name: "미국 달러" },
        { value: "KRW", name: "대한민국 원" },
        { value: "CNY", name: "중국 위안화" },
        { value: "JPY", name: "일본 엔" },
      ],
      gridLabel: true,
      gridRow: 4,
      gridCol: 1,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
    {
      inputType: "input",
      labelName: "진행비용 (성인)",
      inputName: "costAdult",
      gridLabel: true,
      gridRow: 4,
      gridCol: 2,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
    {
      inputType: "select",
      labelName: "지급방법",
      inputName: "payment",
      optionList: [
        { value: "", name: "" },
        { value: "p1", name: "방법1" },
        { value: "p2", name: "방법2" },
        { value: "p3", name: "방법3" },
        { value: "p4", name: "방법4" },
        { value: "p5", name: "방법5" },
      ],
      gridLabel: true,
      gridRow: 4,
      gridCol: 3,
    },
    {
      inputType: "textarea",
      labelName: "상세설명",
      inputName: "description",
      gridLabel: true,
      gridRow: 5,
      gridCol: 1,
      gridColEnd: 4,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
    {
      inputType: "textarea",
      labelName: "대체 일정",
      inputName: "replacement",
      gridLabel: true,
      gridRow: 6,
      gridCol: 1,
      gridColEnd: 4,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
  ];

  const CreateShoppingInput: LabelInputPropsType[] = [
    {
      inputType: "input",
      labelName: "카드명(한글)",
      inputName: "name",
      gridLabel: true,
      gridRow: 1,
      gridCol: 1,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
    {
      inputType: "input",
      labelName: "카드명(현지)",
      inputName: "originalName",
      gridLabel: true,
      gridRow: 1,
      gridCol: 2,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
    {
      inputType: "select",
      labelName: "사용유무",
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
      labelName: "지역",
      inputName: "continent",
      optionList: regionInput.continentList,
      gridLabel: true,
      gridRow: 2,
      gridCol: 1,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
    {
      inputType: "select",
      labelName: "국가",
      inputName: "country",
      optionList: regionInput.countryList,
      gridLabel: true,
      gridRow: 2,
      gridCol: 2,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
    {
      inputType: "select",
      labelName: "도시",
      inputName: "city",
      optionList: regionInput.cityList,
      gridLabel: true,
      gridRow: 2,
      gridCol: 3,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
    {
      inputType: "select",
      labelName: "소요시간",
      inputName: "duration",
      optionList: [
        { value: "", name: "" },
        { value: "30", name: "30분" },
        { value: "60", name: "1시간" },
        { value: "90", name: "1시간 30분" },
        { value: "120", name: "2시간" },
        { value: "150", name: "2시간 30분" },
        { value: "180", name: "3시간" },
        { value: "210", name: "3시간 30분" },
        { value: "240", name: "4시간" },
        { value: "270", name: "4시간 30분" },
        { value: "300", name: "5시간" },
        { value: "330", name: "5시간 30분" },
        { value: "360", name: "6시간" },
      ],
      gridLabel: true,
      gridRow: 3,
      gridCol: 1,
    },
    {
      inputType: "input",
      labelName: "품목",
      inputName: "item",
      gridLabel: true,
      gridRow: 3,
      gridCol: 2,
      gridColEnd: 4,
    },
    {
      inputType: "select",
      labelName: "환불여부",
      inputName: "canRefund",
      optionList: [
        { value: "", name: "" },
        { value: "true", name: "Y" },
        { value: "false", name: "N" },
      ],
      gridLabel: true,
      gridRow: 4,
      gridCol: 1,
    },
    {
      inputType: "textarea",
      labelName: "상세설명",
      inputName: "description",
      gridLabel: true,
      gridRow: 5,
      gridCol: 1,
      gridColEnd: 4,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
    {
      inputType: "textarea",
      labelName: "교환/환불 안내",
      inputName: "exchangeRefund",
      gridLabel: true,
      gridRow: 6,
      gridCol: 1,
      gridColEnd: 4,
      isRequired: false,
    },
  ];

  const CreateTourInput: LabelInputPropsType[] = [
    {
      inputType: "input",
      labelName: "카드명(한글)",
      inputName: "name",
      gridLabel: true,
      gridRow: 1,
      gridCol: 1,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
    {
      inputType: "input",
      labelName: "카드명(현지)",
      inputName: "originalName",
      gridLabel: true,
      gridRow: 1,
      gridCol: 2,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
    {
      inputType: "select",
      labelName: "사용유무",
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
      labelName: "지역",
      inputName: "continent",
      optionList: regionInput.continentList,
      gridLabel: true,
      gridRow: 2,
      gridCol: 1,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
    {
      inputType: "select",
      labelName: "국가",
      inputName: "country",
      optionList: regionInput.countryList,
      gridLabel: true,
      gridRow: 2,
      gridCol: 2,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
    {
      inputType: "select",
      labelName: "도시",
      inputName: "city",
      optionList: regionInput.cityList,
      gridLabel: true,
      gridRow: 2,
      gridCol: 3,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
    {
      inputType: "textarea",
      labelName: "상세설명",
      inputName: "description",
      gridLabel: true,
      gridRow: 3,
      gridCol: 1,
      gridColEnd: 4,
      isRequired: true,
      registerOptions: {
        required:
          "필수입력 항목 중 입력되지 않은 항목이 있습니다.\n 입력 후 다시 추가하기 진행 부탁 드립니다.",
      },
    },
  ];
  return data?.category === "호텔" ? (
    <MainContainer type="cubeez">
      {component}
      {iconComponent}
      <LeftRight>
        <MainTitle>라이브러리 카드 수정 - 호텔</MainTitle>
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
            수정하기
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
          {CreateHotelInput.map((d) => (
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
                    필수입력 항목 중 입력되지 않은 항목이 있습니다.{<br />}
                    입력 후 다시 수정하기 진행 부탁 드립니다.
                  </p>
                </div>
              )}
          </>
        </SearchGrid>
        <div className="flex flex-col gap-4 justify-center">
          <input
            id="upload"
            type="file"
            hidden
            accept="image/png, image/jpg, image/jpeg"
            multiple
            onChange={(e) => {
              handleAddImages(e);
            }}
          />
          <div className="flex gap-4">
            <div className="flex items-start whitespace-pre-wrap gap-0.5 pt-2  flex-shrink-0 text-xl font-semibold text-[#353535]">
              이미지
            </div>
            <label
              htmlFor="upload"
              className="flex justify-center items-center rounded-lg font-semibold text-xl cursor-pointer bg-[#00192F] text-white w-36 h-12"
            >
              이미지 첨부
            </label>
            <span className="text-[#ff3939] flex items-end">
              이미지는 5개까지 등록 가능하며, 용량이 10Mb를 초과할 수 없습니다.
              권장 해상도 800x450(px)
            </span>
          </div>
          <div className="flex gap-4">
            {showImages &&
              showImages.map((image: any, i: any) => (
                <div key={`${i}`}>
                  <div className="flex justify-center items-center relative top-[150px] mt-[-150px] w-[200px] h-[150px] group  ">
                    <button
                      type="button"
                      className="absolute right-0 top-0 hidden group-hover:block"
                      onClick={async () => {
                        image && image.id && image.imageUrl
                          ? handleDeleteSavedImage(image.id, image.imageUrl)
                          : handleDeleteImage(i);
                      }}
                    >
                      {XSvg}
                    </button>
                    <label
                      htmlFor={`ImageEdit${i}`}
                      className=" hidden group-hover:block cursor-pointer rounded-lg font-semibold text-xl px-4 h-8 bg-[#00192F] text-white"
                    >
                      클릭
                      <input
                        type="file"
                        hidden
                        id={`ImageEdit${i}`}
                        accept="image/png, image/jpg, image/jpeg"
                        onChange={(e) => {
                          image && image.id && image.imageUrl
                            ? handleEditSavedImages(e, image.id, image.imageUrl)
                            : handleEditImages(e, i);
                        }}
                      />
                    </label>
                  </div>
                  <img
                    src={image.imageUrl ? image.imageUrl : image}
                    alt={image.id}
                    width={"200px"}
                    height={"150px"}
                    style={{
                      objectFit: "contain",
                      width: "200px",
                      height: "150px",
                    }}
                  />
                </div>
              ))}
          </div>
        </div>
      </form>
      <GapMaker height={24} />
      <LeftRight>
        <div></div>
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
            수정하기
          </MainButton>
        </ButtonLine>
      </LeftRight>
    </MainContainer>
  ) : data?.category === "미팅정보" ? (
    <MainContainer type="cubeez">
      {component}
      {iconComponent}
      <LeftRight>
        <MainTitle>라이브러리 카드 수정 - 미팅정보</MainTitle>
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
            수정하기
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
          {CreateMeatingInput.map((d) => (
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
                    필수입력 항목 중 입력되지 않은 항목이 있습니다.{<br />}
                    입력 후 다시 수정하기 진행 부탁 드립니다.
                  </p>
                </div>
              )}
          </>
        </SearchGrid>
        <div className="flex flex-col gap-4 justify-center">
          <input
            id="upload"
            type="file"
            hidden
            accept="image/png, image/jpg, image/jpeg"
            multiple
            onChange={(e) => {
              handleAddImages(e);
            }}
          />
          <div className="flex gap-4">
            <div className="flex items-start whitespace-pre-wrap gap-0.5 pt-2  flex-shrink-0 text-xl font-semibold text-[#353535]">
              이미지
            </div>
            <label
              htmlFor="upload"
              className="flex justify-center items-center rounded-lg font-semibold text-xl cursor-pointer bg-[#00192F] text-white w-36 h-12"
            >
              이미지 첨부
            </label>
            <span className="text-[#ff3939] flex items-end">
              이미지는 5개까지 등록 가능하며, 용량이 10Mb를 초과할 수 없습니다.
              권장 해상도 800x450(px)
            </span>
          </div>
          <div className="flex gap-4">
            {showImages &&
              showImages.map((image: any, i: any) => (
                <div key={`${i}`}>
                  <div className="flex justify-center items-center relative top-[150px] mt-[-150px] w-[200px] h-[150px] group  ">
                    <button
                      type="button"
                      className="absolute right-0 top-0 hidden group-hover:block"
                      onClick={async () => {
                        image && image.id && image.imageUrl
                          ? handleDeleteSavedImage(image.id, image.imageUrl)
                          : handleDeleteImage(i);
                      }}
                    >
                      {XSvg}
                    </button>
                    <label
                      htmlFor={`ImageEdit${i}`}
                      className=" hidden group-hover:block cursor-pointer rounded-lg font-semibold text-xl px-4 h-8 bg-[#00192F] text-white"
                    >
                      클릭
                      <input
                        type="file"
                        hidden
                        id={`ImageEdit${i}`}
                        accept="image/png, image/jpg, image/jpeg"
                        onChange={(e) => {
                          image && image.id && image.imageUrl
                            ? handleEditSavedImages(e, image.id, image.imageUrl)
                            : handleEditImages(e, i);
                        }}
                      />
                    </label>
                  </div>
                  <img
                    src={image.imageUrl ? image.imageUrl : image}
                    alt={image.id}
                    width={"200px"}
                    height={"150px"}
                    style={{
                      objectFit: "contain",
                      width: "200px",
                      height: "150px",
                    }}
                  />
                </div>
              ))}
          </div>
        </div>
      </form>
      <GapMaker height={24} />
      <LeftRight>
        <div></div>
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
            수정하기
          </MainButton>
        </ButtonLine>
      </LeftRight>
    </MainContainer>
  ) : data?.category === "선택관광" ? (
    <MainContainer type="cubeez">
      {component}
      {iconComponent}
      <LeftRight>
        <MainTitle>라이브러리 카드 수정 - 선택관광</MainTitle>
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
            수정하기
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
          {CreateOptionInput.map((d) => (
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
              (errors.guide && errors.guide.type === "required") ||
              (errors.duration && errors.duration.type === "required") ||
              (errors.currency && errors.currency.type === "required") ||
              (errors.replacement && errors.replacement.type === "required")) &&
              alertMessage && (
                <div
                  role={"alert"}
                  className="absolute left-[(w-screen-714px)/2] top-[(h-screen-110px)/2] w-[714px] h-[110px] flex justify-center items-center bg-white border-2 border-[#FF3939] rounded-[5px] gap-4 text-[#FF3939] text-base"
                >
                  <div className="">{ideaSvg}</div>
                  <p>
                    필수입력 항목 중 입력되지 않은 항목이 있습니다.{<br />}
                    입력 후 다시 수정하기 진행 부탁 드립니다.
                  </p>
                </div>
              )}
          </>
        </SearchGrid>
        <div className="flex flex-col gap-4 justify-center">
          <input
            id="upload"
            type="file"
            hidden
            accept="image/png, image/jpg, image/jpeg"
            multiple
            onChange={(e) => {
              handleAddImages(e);
            }}
          />
          <div className="flex gap-4">
            <div className="flex items-start whitespace-pre-wrap gap-0.5 pt-2  flex-shrink-0 text-xl font-semibold text-[#353535]">
              이미지
            </div>
            <label
              htmlFor="upload"
              className="flex justify-center items-center rounded-lg font-semibold text-xl cursor-pointer bg-[#00192F] text-white w-36 h-12"
            >
              이미지 첨부
            </label>
            <span className="text-[#ff3939] flex items-end">
              이미지는 5개까지 등록 가능하며, 용량이 10Mb를 초과할 수 없습니다.
              권장 해상도 800x450(px)
            </span>
          </div>
          <div className="flex gap-4">
            {showImages &&
              showImages.map((image: any, i: any) => (
                <div key={`${i}`}>
                  <div className="flex justify-center items-center relative top-[150px] mt-[-150px] w-[200px] h-[150px] group  ">
                    <button
                      type="button"
                      className="absolute right-0 top-0 hidden group-hover:block"
                      onClick={async () => {
                        image && image.id && image.imageUrl
                          ? handleDeleteSavedImage(image.id, image.imageUrl)
                          : handleDeleteImage(i);
                      }}
                    >
                      {XSvg}
                    </button>
                    <label
                      htmlFor={`ImageEdit${i}`}
                      className=" hidden group-hover:block cursor-pointer rounded-lg font-semibold text-xl px-4 h-8 bg-[#00192F] text-white"
                    >
                      클릭
                      <input
                        type="file"
                        hidden
                        id={`ImageEdit${i}`}
                        accept="image/png, image/jpg, image/jpeg"
                        onChange={(e) => {
                          image && image.id && image.imageUrl
                            ? handleEditSavedImages(e, image.id, image.imageUrl)
                            : handleEditImages(e, i);
                        }}
                      />
                    </label>
                  </div>
                  <img
                    src={image.imageUrl ? image.imageUrl : image}
                    alt={image.id}
                    width={"200px"}
                    height={"150px"}
                    style={{
                      objectFit: "contain",
                      width: "200px",
                      height: "150px",
                    }}
                  />
                </div>
              ))}
          </div>
        </div>
      </form>
      <GapMaker height={24} />
      <LeftRight>
        <div></div>
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
            수정하기
          </MainButton>
        </ButtonLine>
      </LeftRight>
    </MainContainer>
  ) : data?.category === "쇼핑" ? (
    <MainContainer type="cubeez">
      {component}
      {iconComponent}
      <LeftRight>
        <MainTitle>라이브러리 카드 수정 - 쇼핑</MainTitle>
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
            수정하기
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
          {CreateShoppingInput.map((d) => (
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
                    필수입력 항목 중 입력되지 않은 항목이 있습니다.{<br />}
                    입력 후 다시 수정하기 진행 부탁 드립니다.
                  </p>
                </div>
              )}
          </>
        </SearchGrid>
        <div className="flex flex-col gap-4 justify-center">
          <input
            id="upload"
            type="file"
            hidden
            accept="image/png, image/jpg, image/jpeg"
            multiple
            onChange={(e) => {
              handleAddImages(e);
            }}
          />
          <div className="flex gap-4">
            <div className="flex items-start whitespace-pre-wrap gap-0.5 pt-2  flex-shrink-0 text-xl font-semibold text-[#353535]">
              이미지
            </div>
            <label
              htmlFor="upload"
              className="flex justify-center items-center rounded-lg font-semibold text-xl cursor-pointer bg-[#00192F] text-white w-36 h-12"
            >
              이미지 첨부
            </label>
            <span className="text-[#ff3939] flex items-end">
              이미지는 5개까지 등록 가능하며, 용량이 10Mb를 초과할 수 없습니다.
              권장 해상도 800x450(px)
            </span>
          </div>
          <div className="flex gap-4">
            {showImages &&
              showImages.map((image: any, i: any) => (
                <div key={`${i}`}>
                  <div className="flex justify-center items-center relative top-[150px] mt-[-150px] w-[200px] h-[150px] group  ">
                    <button
                      type="button"
                      className="absolute right-0 top-0 hidden group-hover:block"
                      onClick={async () => {
                        image && image.id && image.imageUrl
                          ? handleDeleteSavedImage(image.id, image.imageUrl)
                          : handleDeleteImage(i);
                      }}
                    >
                      {XSvg}
                    </button>
                    <label
                      htmlFor={`ImageEdit${i}`}
                      className=" hidden group-hover:block cursor-pointer rounded-lg font-semibold text-xl px-4 h-8 bg-[#00192F] text-white"
                    >
                      클릭
                      <input
                        type="file"
                        hidden
                        id={`ImageEdit${i}`}
                        accept="image/png, image/jpg, image/jpeg"
                        onChange={(e) => {
                          image && image.id && image.imageUrl
                            ? handleEditSavedImages(e, image.id, image.imageUrl)
                            : handleEditImages(e, i);
                        }}
                      />
                    </label>
                  </div>
                  <img
                    src={image.imageUrl ? image.imageUrl : image}
                    alt={image.id}
                    width={"200px"}
                    height={"150px"}
                    style={{
                      objectFit: "contain",
                      width: "200px",
                      height: "150px",
                    }}
                  />
                </div>
              ))}
          </div>
        </div>
      </form>
      <GapMaker height={24} />
      <LeftRight>
        <div></div>
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
            수정하기
          </MainButton>
        </ButtonLine>
      </LeftRight>
    </MainContainer>
  ) : data?.category === "관광지" ? (
    <MainContainer type="cubeez">
      {component}
      {iconComponent}
      <LeftRight>
        <MainTitle>라이브러리 카드 수정 - 관광지</MainTitle>
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
            수정하기
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
          {CreateTourInput.map((d) => (
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
              (errors.description && errors.description.type === "required")) &&
              alertMessage && (
                <div
                  role={"alert"}
                  className="absolute left-[(w-screen-714px)/2] top-[(h-screen-110px)/2] w-[714px] h-[110px] flex justify-center items-center bg-white border-2 border-[#FF3939] rounded-[5px] gap-4 text-[#FF3939] text-base"
                >
                  <div className="">{ideaSvg}</div>
                  <p>
                    필수입력 항목 중 입력되지 않은 항목이 있습니다.{<br />}
                    입력 후 다시 수정하기 진행 부탁 드립니다.
                  </p>
                </div>
              )}
          </>
        </SearchGrid>
        <div className="flex flex-col gap-4 justify-center">
          <input
            id="upload"
            type="file"
            hidden
            accept="image/png, image/jpg, image/jpeg"
            multiple
            onChange={(e) => {
              // fileSelectHandler(e.target.files);
              handleAddImages(e);
            }}
            // onChange={handleChangeFile}
          />
          <div className="flex gap-4">
            <div className="flex items-start whitespace-pre-wrap gap-0.5 pt-2  flex-shrink-0 text-xl font-semibold text-[#353535]">
              이미지
            </div>
            <label
              htmlFor="upload"
              className="flex justify-center items-center rounded-lg font-semibold text-xl cursor-pointer bg-[#00192F] text-white w-36 h-12"
            >
              이미지 첨부
            </label>
            <span className="text-[#ff3939] flex items-end">
              이미지는 5개까지 등록 가능하며, 용량이 10Mb를 초과할 수 없습니다.
              권장 해상도 800x450(px)
            </span>
          </div>
          <div className="flex gap-4">
            {showImages &&
              showImages.map((image: any, i: any) => (
                <div key={`${i}`}>
                  <div className="flex justify-center items-center relative top-[150px] mt-[-150px] w-[200px] h-[150px] group  ">
                    <button
                      type="button"
                      className="absolute right-0 top-0 hidden group-hover:block"
                      onClick={async () => {
                        image && image.id && image.imageUrl
                          ? handleDeleteSavedImage(image.id, image.imageUrl)
                          : handleDeleteImage(i);
                      }}
                    >
                      {XSvg}
                    </button>
                    <label
                      htmlFor={`ImageEdit${i}`}
                      className=" hidden group-hover:block cursor-pointer rounded-lg font-semibold text-xl px-4 h-8 bg-[#00192F] text-white"
                    >
                      클릭
                      <input
                        type="file"
                        hidden
                        id={`ImageEdit${i}`}
                        accept="image/png, image/jpg, image/jpeg"
                        onChange={(e) => {
                          image && image.id && image.imageUrl
                            ? handleEditSavedImages(e, image.id, image.imageUrl)
                            : handleEditImages(e, i);
                        }}
                      />
                    </label>
                  </div>
                  <img
                    src={image.imageUrl ? image.imageUrl : image}
                    alt={image.id}
                    width={"200px"}
                    height={"150px"}
                    style={{
                      objectFit: "contain",
                      width: "200px",
                      height: "150px",
                    }}
                  />
                </div>
              ))}
          </div>
        </div>
      </form>
      <GapMaker height={24} />
      <LeftRight>
        <div></div>
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
            수정하기
          </MainButton>
        </ButtonLine>
      </LeftRight>
    </MainContainer>
  ) : (
    <></>
  );
};

export default CreateLibrary;
