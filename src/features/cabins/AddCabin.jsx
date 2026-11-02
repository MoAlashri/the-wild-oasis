import { useState } from "react"
import Button from "../../ui/Button"
import CreateCabinForm from "./CreateCabinForm"
import Modal from "../../ui/Modal"

function AddCabin() {
    const [isOpenModal, setIsOpenModal] = useState(false)
  
  return (
    <div>
      <Button
        variations ='primary'
        size = 'medium'
        onClick={() => setIsOpenModal((isOpen) => !isOpen) }
        >
        Add new cabin
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>)}
    </div>
  )
}

export default AddCabin
