import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCbinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient =useQueryClient();


  const {isLoading: isDeleting, mutate: deleteCabin} = useMutation({
      mutationFn: deleteCbinApi,
      onSuccess: () => {
        toast.success("Cabin Sussefully deleted")
        queryClient.invalidateQueries ({
          queryKey: ['cabin']
        })
      },
      onError: err => toast.error(err.message)
    });

    return { isDeleting, deleteCabin}
}


