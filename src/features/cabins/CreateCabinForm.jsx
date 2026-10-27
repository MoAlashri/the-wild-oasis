import { useForm } from "react-hook-form";

import Textarea from "../../ui/Textarea";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import FormRow from "../../ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";


function CreateCabinForm({cabinToEdit ={}}) {
  const {createCabin, isCreating}  = useCreateCabin()
  const {isEditing, editCabin} = useEditCabin()
  const isWorking = isCreating || isEditing

  const{id: editId,...editValue} = cabinToEdit;
  const isEditSession = Boolean(editId);

  const {register, handleSubmit, reset, getValues, formState} =useForm({
    defaultValues: isEditSession? editValue : {} ,
  });

  const {errors} = formState;


  function onSubmit(data) {

    
    const image =
    typeof data.image === "string"
      ? data.image
      : data.image?.length > 0
      ? data.image[0]
      : cabinToEdit.image;

    if(isEditSession){
      editCabin(
        {newCabinData: { ...data, image}, id: editId},
      {
        // eslint-disable-next-line no-unused-vars
        onSuccess: (data) =>{
          reset()
        }
      }
      );
    }else 
      createCabin({...data, image: image},{
      // eslint-disable-next-line no-unused-vars
      onSuccess: (data) =>{
        reset();
      }})
  };

  // // function onError (errors) {
  // //   // console.log(errors)
  // }
  return (
    <Form onSubmit={handleSubmit(onSubmit /*, onError */ )}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input 
          type="text" 
          id="name" 
          disabled={isCreating}
          {...register("name",
            {
              required: "This field is required"
            })
        }
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input 
          type="number" 
          id="maxCapacity" 
          disabled={isCreating}
          {...register("maxCapacity",
            {
              required: "This field is required",
              min:{
                value:1,
                message: "Capacity should be at least 1"
              }
            })}
          />
      </FormRow>

      <FormRow label={"Regular price"} error={errors?.regularPrice?.message}>
        <Input 
          type="number" 
          id="regularPrice" 
          disabled={isWorking}
          {...register("regularPrice",
            {
              valueAsNumber:true,
              required: "This field is required",
              min:{
                value:1,
                message: "Capacity should be at least 1"
              }
            })}
          />
      </FormRow>

      <FormRow label={"Discount"} error={errors?.discount?.message}>
        <Input 
          type="number" 
          id="discount" 
          defaultValue="" 
          disabled={isWorking}
          {...register("discount",
            {
              valueAsNumber:true,
              required: "This field is required",
              validate: (value) => 
                value <= getValues().regularPrice || "Discount should be less than regular price"

            })}  
        />
      </FormRow>

      <FormRow label={"Description for website"} error={errors?.description?.message}>
        <Textarea 
          type="number" 
          disabled={isWorking}
          defaultValue=""
          {...register("description",
            {
              required: "This field is required"
            })}
        />
      </FormRow>

      <FormRow label={"Cabin photo"}>
        <FileInput
          id="image" 
          accept="image/*"
          type="file"
          {...register("image",
            {
              required: isEditSession? false : "This field is required"
            })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variations="secondary" type="reset" size='medium'>
          Cancel
        </Button>
        <Button 
        variations='primary'
        size='medium'
        disabled={isWorking}
        >{isEditSession? "Edit Cabin" :"Create new cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
