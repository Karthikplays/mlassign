array=[1,2,3,4,5]

def median(array):
    array.sort()
    p31_mid = len(array)/2
    if(len(array)%2==0):
        return (array[int(p31_mid)-1]+array[int(p31_mid)])/2
    else: 
        return array[int(p31_mid)]
    
print(median(array[:]))