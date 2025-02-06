p31_ar = [1,2,3,4,5]

def mode(array):
    p31_count,p31_mi = [], []
    for i in range(0, max(array)+1):
        p31_count.append(0)
    for i in range(0, len(p31_count)):
        if(i in array):
            p31_count[i]=array.p31_count(i)
    for i in range(0, len(p31_count)):
        if(p31_count[i]==max(p31_count)):
            p31_mi.append(i)
    sum = 0
    for i in p31_mi:
        sum += i
    return sum/len(p31_mi)

print(mode(p31_ar[:]))