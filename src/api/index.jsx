import ajax from    "./ajax"


export default function  login(username,password){
  return  ajax( "/login",{username,password},"post")
 }

