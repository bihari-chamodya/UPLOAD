from customtkinter import*
from PIL import Image
from tkinter import messagebox
import sqlite3
import bcrypt
import webbrowser
# function part

x = 50

conn=sqlite3.connect('users.db')
cursor=conn.cursor()
cursor.execute('CREATE TABLE IF NOT EXISTS user(username TEXT NOT NULL,Passward TEXT NOT NULL)')

def Login_user(): 
  if userNameEntry.get()=='' or passwordEntry.get()=='':
       messagebox.showerror('error','all fields are required')
  else:
       cursor.execute('SELECT Passward FROM user WHERE Username=?',[userNameEntry.get()]) 
       result_password = cursor.fetchone()
       if result_password:
            if bcrypt.checkpw(passwordEntry.get().encode('UTF-8'),result_password[0]):
                 messagebox.showinfo('success','Successfully Logged In')
                 webbrowser.open('home.html')

            else:
                 messagebox.showerror('error','invalid Password') 
                 passwordEntry.delete(0,END) 
       else:
                messagebox.showerror('error','invalid username')                
                userNameEntry.delete(0,END) 
                passwordEntry.delete(0,END) 
                window.focus()  

def register_user():
     if userNameEntry.get()=='' or passwordEntry.get()=='':
          messagebox.showerror('Error','All Fields Are Required')
     else:  
          cursor.execute('SELECT username FROM user WHERE username=?',[userNameEntry.get()]) 
          if cursor.fetchone() is not None:
               messagebox.showerror('Error','Username Already Exists')
          else:
               encode_password = passwordEntry.get().encode('UTF-8')
               hash_password = bcrypt.hashpw(encode_password,bcrypt.gensalt())

               cursor.execute('INSERT INTO user VALUES(?,?)', [userNameEntry.get(),hash_password]) 
               conn.commit() 
               messagebox.showinfo('successfull','Registration Successfull') 
               mov_right() 

               userNameEntry.delete(0,END)
               passwordEntry.delete(0,END)
               window.focus()
    

def mov_right():
    global x

    if x<380:
     x+=1 
    topFrame.place(x=x,y=12)
    topFrame.after(1,mov_right)
    SignupLabel.configure(text='LogIn')
    innerButton.configure(text='LogIn',command=Login_user) 

def mov_left():
    global x


    if x>50:
     x-=1
     topFrame.place(x=x,y=12)
     topFrame.after(1,mov_left)
     SignupLabel.configure(text='Sign Up')
     innerButton.configure(text='Sign Up')


# gui part
window = CTk()
window.title('Login & Signup From')
window.wm_geometry('+300+100')
window.resizable(0,0)
window.config(bg='white')


mainFrame = CTkFrame(window,fg_color='blue4',width=600,height=400)
mainFrame.grid(row=0,column=0,pady=30,padx=30)

LoginButton = CTkButton(mainFrame,text='LogIn',fg_color='BLUE4',font=('arial',15,'bold'),
                        hover_color='blue2',border_color='blue2', border_width=1,cursor='hand2',command=mov_right)
LoginButton.place(x=380,y=300)

SignUpButton = CTkButton(mainFrame,text='SignUp',fg_color='BLUE4',font=('arial',15,'bold'),
                        hover_color='blue2',border_color='blue2', border_width=1,cursor='hand2',command=mov_left) 
SignUpButton.place(x=75,y=300)


topFrame=CTkFrame(window,fg_color='white',width=250,height=400)
topFrame.place(x=50,y=12)

LoginImage=CTkImage(light_image=Image.open('login.png'),size=(128,128))
LoginImageLabel=CTkLabel(topFrame,image=LoginImage,text='')
LoginImageLabel.grid(row=0,column=0,pady=(20,0))

SignupLabel=CTkLabel(topFrame,text='Sign up',text_color='blue4',font=('arial',30,'bold'))
SignupLabel.grid(row=1,column=0,pady=(15,0))

userNameEntry = CTkEntry(topFrame,font=('arial',20,'bold'),placeholder_text='User Name',fg_color='white',text_color='black'
                         ,width=200,height=30)
userNameEntry.grid(row=2,column=0,padx=20,pady=(20,10))

passwordEntry = CTkEntry(topFrame,font=('arial',20,'bold'),placeholder_text='password',fg_color='white',text_color='black'
                         ,width=200,height=30,show='*')
passwordEntry.grid(row=3,column=0,padx=20,pady=(20,10))

innerButton=CTkButton(topFrame,text='Sign Up',fg_color='blue2',hover_color='blue4',cursor='hand2',font=('arial',20,'bold' ) , command=register_user)
innerButton.grid(row=4,column=0,pady=20)



window.mainloop()