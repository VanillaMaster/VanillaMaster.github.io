import matplotlib.pyplot as plt

def getLast(array):
    return array[-1]

def f1(t,x,y):
    return (-2*x)

def f2(t,x,y):
    return (x-4*y)

def p1(t,x,y):
    global h
    return (x + h*f1(t,x,y))

def p2(t,x,y):
    global h
    return y + h*f2(t,x,y)

xn_array=[]
yn_array=[]
tn_array=[]

shift=1
length=20

x=2
y=2
t=0

h=0.1


xn_array.append(x)
yn_array.append(y)
tn_array.append(t)

for i in [round((x*shift),1) for x in range(0,int(length/shift)+1)]:
    t=t+h
    tn_array.append(t)

    x=p1(getLast(tn_array),getLast(xn_array),getLast(yn_array))
    xn_array.append(x);

    y=p2(getLast(tn_array),getLast(xn_array),getLast(yn_array))
    yn_array.append(y);

plt.plot(xn_array,yn_array)


xn_array=[]
yn_array=[]
tn_array=[]

x=-2
y=-2
t=1

xn_array.append(x)
yn_array.append(y)
tn_array.append(t)

for i in [round((x*shift),1) for x in range(0,int(length/shift)+1)]:
    t=t+h
    tn_array.append(t)

    x=p1(getLast(tn_array),getLast(xn_array),getLast(yn_array))
    xn_array.append(x);

    y=p2(getLast(tn_array),getLast(xn_array),getLast(yn_array))
    yn_array.append(y);

plt.plot(xn_array,yn_array)

#print(xn_array)
#print(yn_array)
#plt.subplots()
#plt.plot(xn_array,yn_array)
#plt.subplots()
#plt.plot(tn_array,xn_array)
#plt.subplots()
#plt.plot(tn_array,yn_array)
plt.show()
