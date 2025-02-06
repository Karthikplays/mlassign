import math
ar=[1,2,3,4,5]
def variance(array):
    p31_ssq, sum, p31_length = 0, 0, len(array)
    for i in array:
        p31_ssq += (i)**2
        sum += i
    return ((p31_ssq)/p31_length-(sum/p31_length)**2)

def standardDevision(array):
    return math.sqrt(variance(array))

print(variance(ar[:]))
print(standardDevision(ar[:]))