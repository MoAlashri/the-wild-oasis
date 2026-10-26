const {isLoading: isDeleting, mutate} = useMutation({
    mutationFn:deleteCabin,
    onSuccess: () => {
      toast.success("Cabin Sussefully deleted")
      queryClient.invalidateQueries ({
        queryKey: ['cabin']
      })
    },
    onError: err => toast.error(err.message)
  })