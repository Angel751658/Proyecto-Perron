n = int(input("xd: "))
a = 1 
b = 0


print(a+b)

for i in range(n):
    c = a + b
    b = a
    a = c

    print(c)

print("FIN")



