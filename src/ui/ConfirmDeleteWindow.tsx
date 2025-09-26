import Button from "./Button";
import SpinnerMini from "./SpinnerMini";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

interface ConfirmDeleteWindowProps {
  name: string;
  deleteHandler: () => void;
  isLoading: boolean;
  onCloseWindow?: () => void;
  deleteItemName?: string;
  optionalAlertMsg?: string;
}

function ConfirmDeleteWindow({
  name,
  deleteHandler,
  isLoading,
  onCloseWindow,
  deleteItemName,
  optionalAlertMsg,
}: ConfirmDeleteWindowProps) {
  return (
    <div className="m-2 flex flex-col gap-4 max-sm:m-0">
      <h2 className="font-semibold text-primary_2">Delete {name}</h2>
      <div className="space-y-1">
        <p className="text-primary_2">
          Are you sure you want to Delete this {name}
          {deleteItemName && `-(${deleteItemName?.toUpperCase()})`}?
        </p>

        {optionalAlertMsg && (
          <div className="flex items-center gap-1 max-md:gap-2">
            <div>
              <HiOutlineExclamationTriangle className="w-6 h-6 text-red-500" />
            </div>
            <p className="text-red-500 max-md:text-sm max-xs:text-xs">{`Warning: ${optionalAlertMsg}`}</p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-end gap-4">
        <Button
          onClick={() => onCloseWindow?.()}
          color="bg-primary hover:bg-ternary"
          textColor="text-primary_2"
          style="py-2 px-6 border border-primary_2"
          disabled={isLoading}
        >
          No
        </Button>

        <Button
          onClick={deleteHandler}
          color="bg-red-500 hover:bg-red-600"
          textColor="text-primary"
          style="py-2 px-6  border border-red-600"
          disabled={isLoading}
        >
          {isLoading ? (
            <SpinnerMini spinnerColor="border-primary" marginY="my-0" />
          ) : (
            "Yes"
          )}
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDeleteWindow;
