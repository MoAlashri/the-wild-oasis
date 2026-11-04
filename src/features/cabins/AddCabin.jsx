import Button from "../../ui/Button"
import CreateCabinForm from "./CreateCabinForm"
// import CabinTable from "./CabinTable"
import Modal from "../../ui/Modal"

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.open opens='cabin-form'>
          <Button variations ='primary' size = 'medium'> 
            Add new cabin
          </Button>
        </Modal.open>
        <Modal.window name='cabin-form'> 
          <CreateCabinForm  />
        </Modal.window>

        {/* <Modal.open opens='table'>
          <Button variations ='primary' size = 'medium'> 
            show table
          </Button>
        </Modal.open>
        <Modal.window name='table'>
          <CabinTable />
        </Modal.window> */}
      </Modal>
    </div>
  )
}



export default AddCabin
