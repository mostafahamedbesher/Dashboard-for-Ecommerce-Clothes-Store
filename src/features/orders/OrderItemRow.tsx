import { HiOutlinePencilSquare } from "react-icons/hi2";
import { HiOutlineEye } from "react-icons/hi2";

import { OrderType } from "../../types/OrdersTypes";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import OrderStatus from "./OrderStatus";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import FormOrderStatusEdit from "./FormOrderStatusEdit";
import { format } from "date-fns";

interface OrderItemRowProps {
  order: OrderType;
  showCreatedAt?: boolean;
  showBtnStatus?: boolean;
}

function OrderItemRow({
  order,
  showCreatedAt = true,
  showBtnStatus = false,
}: OrderItemRowProps) {
  const createdAt = format(new Date(order.created_at), "dd/MM/yyyy");

  return (
    <Table.TableRow>
      <p className="font-semibold">#{order.id}</p>
      <p>{`${order.firstName} ${order.lastName}`}</p>
      {showCreatedAt && <p>{createdAt}</p>}
      <p className="font-semibold text-secondary">{`${order.totalPrice.toFixed(
        2
      )}$`}</p>
      <p>{`${order.shippingPrice.toFixed(2)}$`}</p>
      <OrderStatus status={order.status} />

      <div className="ml-auto relative flex items-center gap-3">
        <Modal>
          {showBtnStatus && (
            <Modal.Open id="edit-status">
              <Button style="whitespace-nowrap px-2 py-0.5">Edit Status</Button>
            </Modal.Open>
          )}

          <Modal.Window id="edit-status">
            <FormOrderStatusEdit
              orderId={order.id}
              status={order.status}
              isPaid={order.isPaid}
            />
          </Modal.Window>
        </Modal>

        <Menus.ToggleButton id={order.id} />

        <div className="absolute right-0 top-9">
          <Menus.MenuList id={order.id}>
            <Menus.MenuButton
              type="link"
              to={`/orders/order/details/${order.id}`}
            >
              <div className="flex gap-1 items-center">
                <HiOutlineEye className="w-4 h-4" />
                <span className=" whitespace-nowrap">See Details</span>
              </div>
            </Menus.MenuButton>

            <Menus.MenuButton type="link" to={`/orders/order/edit/${order.id}`}>
              <div className="flex gap-1 items-center">
                <HiOutlinePencilSquare className="w-4 h-4" />
                <span className=" whitespace-nowrap">Edit</span>
              </div>
            </Menus.MenuButton>
          </Menus.MenuList>
        </div>
      </div>
    </Table.TableRow>
  );
}

export default OrderItemRow;
