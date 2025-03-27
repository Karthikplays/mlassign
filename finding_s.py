M2113_data = [
    ["sunny" , "warm" , "normal" , "strong" , "yes"] , 
    ["sunny" , "cool" , "high" , "low" , "no"], 
    ["rainy" , "warm" , "normal" , "strong" , "no"],
    ["sunny" , "cool" , "low" , "strong" , "yes"],
    ["sunny" , "warm" , "low" , "low" , "yes"]
]
#hypothesis
M2113_col = ["weather" , "temp" , "humidity" , "wind speed" , "enjoy"]
M2113_hypo = ["-" , "-" , "-" , "-"]
for i in range(len(M2113_data)):
    if(M2113_data[i][4] == "yes"):
        for j in range(4):
            if(M2113_hypo[j]=="-"):
                M2113_hypo[j] = M2113_data[i][j]
            elif(M2113_hypo[j] != M2113_data[i][j]):
                M2113_hypo[j] = "?"
#printing 
print("The sport is enjoyed when : ")
flag = False 
print(M2113_hypo)
for i in range(4):
    if(M2113_hypo != "?" and M2113_hypo!= "-"):
        print(f"{M2113_col[i]} : {M2113_hypo[i]}")
        flag = True
if(flag==False):
    print("The entire hypothesis is non-specific")