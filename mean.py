array=[1,2,3,4,5]
def mean(array):
    k=len(array)
    p31_sum_array=0
    for i in range(0,k):
        p31_sum_array+=array[i]      
    p31_val=p31_sum_array/k
    return p31_val

print(mean(array))
        

