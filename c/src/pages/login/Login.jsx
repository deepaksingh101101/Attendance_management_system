import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useState,useEffect } from "react";
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
export default function Login() {
const navigate=useNavigate();

const auth=localStorage.getItem('user')
useEffect(()=>{
  if(auth){
	navigate('/dashboard')
  }
})


  const [data,setData]=useState({
    email:"",
    password:""
  })

  const loginUser=async (e)=>{
    e.preventDefault();
	
	const {email,password}=data;

	try {
		const {data}= await axios.post('/login',{
			email,password
		});
		if(data.error){
			toast.error(data.error);
		}
		else{
			localStorage.setItem("user",JSON.stringify(data));
			setData({});
			navigate('/dashboard');
		}
	} catch (error) {
		console.log(error)
	}
  }

  return (
   <>
  <div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={loginUser}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							required
							className={styles.input}
              value={data.email}
              onChange={(e)=>setData({...data, email:e.target.value})}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							required
							className={styles.input}
              value={data.password}
              onChange={(e)=>{setData({...data, password:e.target.value})}}
						/>
						<button type="submit" className={styles.green_btn}>
							Sing In
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/register">
						<button type="button" className={styles.white_btn}>
							Sing Up
						</button>
					</Link>
				</div>
			</div>
		</div>
   </>
  )
}
