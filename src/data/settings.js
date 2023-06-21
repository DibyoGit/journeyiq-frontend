
export const settingslink = [
    {
        name:"Account Settings",
        link:"/settings/account",

    },
     {
        name:'Domain Settings',
        link:'/settings/domain'
    } ,
    {
        name:'Form Settings',
        link:'/settings/forms'
    } ,{
        name:'IP Settings',
        link:'/settings/ip'
    } ,
]



export const usersetting ={
  title:"Profile",
  subtitle:"Your email address is your identity that is used to log in.",
  form: [
    {
        id:"email",
        label:"Email",
        type:"Email",
        placeholderValue:"example@gmail.com",

    },
    {
        id:"fullName",
        label:"Full Name",
        type:"text",
        placeholderValue:"Your Name",

    },
    {
        id:"phoneNumber",
        label:"Phone Number (Optional)",
        type:"text",
        placeholderValue:"+1657935239",

    }
]}
export const passwordsettings ={ 
    title:"Password",
    subtitle:"Change your  password .",

    form:[
    {
        id:"CurrPassword",
        label:"Current Password",
        type:"password",
        placeholderValue:"Enter your current password",

    },
    {
        id:"newPassword",
        label:"New Password",
        type:"password",
        placeholderValue:"Enter your new password",

    },
  
    {
        id:"confirmPassword",
        label:"Confirm New Password",
        type:"text",
        placeholderValue:"Enter your password again",

    },
]}



