import { HiOutlineTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDeleteWindow from "../../ui/ConfirmDeleteWindow";
import { useUpdateImages } from "./useUpdateImages";
import { updateImages } from "../../services/apiProducts";
import { useRemoveImageFromStorage } from "./useRemoveImageFromStorage";

interface VariantImageCardProps {
  src: string;
  selectedColorImages?: string[];
  selectedColorId?: number;
  productId?: number;
}

function VariantImageCard({
  src,
  selectedColorImages,
  selectedColorId,
  productId,
}: VariantImageCardProps) {
  const imgName = src.split("/").at(-1) || "";
  // const imgName = src.split("//").at(-1) || "";

  const updatedImagesUrls =
    selectedColorImages?.filter((imgsrc) => imgsrc !== src) || [];

  const { mutate: deleteImage, isPending: isUpdatingImages } = useUpdateImages(
    Number(productId),
    updateImages
  );
  const { mutate: removeImageFromStorage, isPending: isRemovingImage } =
    useRemoveImageFromStorage();

  function handleDeleteImage() {
    //1- Delete image from Database table (variantsImages)
    deleteImage({ id: Number(selectedColorId), imagesUrls: updatedImagesUrls });
    //2- Delete image from supabase storage
    removeImageFromStorage(imgName);
  }

  return (
    <li className="relative">
      <img src={src} alt="image card" className="rounded-md w-24 h-28" />
      <Modal.Open id={`img-${imgName}`}>
        <button
          type="button"
          // onClick={handleDeleteImage}
          className="absolute right-1 top-1 bg-red-600 hover:bg-red-500 transition-colors duration-200 rounded-full p-1"
        >
          <HiOutlineTrash className="w-4 h-4 text-primary_4" />
        </button>
      </Modal.Open>

      <Modal.Window id={`img-${imgName}`}>
        <ConfirmDeleteWindow
          name="Image"
          deleteHandler={handleDeleteImage}
          isLoading={isUpdatingImages || isRemovingImage}
        />
      </Modal.Window>
    </li>
  );
}

export default VariantImageCard;
