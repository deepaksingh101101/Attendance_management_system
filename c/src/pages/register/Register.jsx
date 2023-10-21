import styles from "./styles.module.css";
import { Link } from 'react-router-dom'
import { useState,useEffect } from "react";
import axios from 'axios'
import toast from "react-hot-toast";
import { useNavigate} from "react-router-dom";
import Swal from 'sweetalert2'



export default function Register() {


	const [data, setData] = useState(
		{
			Name: "",
			primaryIp: "",
			secoandryIp: "",
			email: "",
			password: "",
		}
	);

	const handleRegisterIpClick = async () => {
		const { value: fruit } = await Swal.fire({
			title: 'Select Primary Machine',
			input: 'select',
			inputOptions: {
				'Machines': {
					'192.168.1.1': 'Machine_1(192.168.1.1)',
					'143.234.23.2': 'Machine_2(143.234.23.2)',
					'23.43.13.54': 'Machine_3(23.43.13.54)',
					'233.54.34.2': 'Machine_4(233.54.34.2)',
				}
			},
			inputPlaceholder: 'Select Primary Machine',
			showCancelButton: true,
		})
		if (fruit) {
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: `You selected: ${fruit}`,
				showConfirmButton: false,
				timer: 1500
			})
			setData({ ...data, primaryIp: fruit })
		}
	}

	const navigate = useNavigate();

	const registerUser = async (e) => {
		e.preventDefault();
		const { Name, primaryIp, secoandryIp, email, password } = data;
		try {
			const { data } = await axios.post('/register', {
				Name, primaryIp, secoandryIp, email, password
			})
			if (data.error) {
				toast.error(data.error);
			}
			else {
				setData({})
				toast.success("Registration succesfull Welcome")
				navigate('/login')
			}
		} catch (error) {
			console.log(error)
		}
	}

	
const auth=localStorage.getItem('user')
  useEffect(()=>{
    if(auth){
      navigate('/dashboard')
    }
  })

	return (
		<>
			<div className={styles.signup_container}>
				<div className={styles.signup_form_container}>
					<div className={styles.left}>
						<h1>Welcome Back</h1>
						<Link to="/login">
							<button type="button" className={styles.white_btn}>
								Sing in
							</button>
						</Link>
					</div>
					<div className={styles.right}>
						<form className={styles.form_container} onSubmit={registerUser}>
							<h1>Create Account</h1>
							<input
								type="text"
								placeholder="Name"
								name="Name"
								required
								className={styles.input}
								value={data.firstName}
								onChange={(e) => setData({ ...data, Name: e.target.value })}
							/>


							<button className="btn" id="pBtn" onClick={handleRegisterIpClick}>Select Primary Machine</button>


							<input
								type="email"
								placeholder="Email"
								name="email"
								required
								className={styles.input}
								value={data.email}
								onChange={(e) => setData({ ...data, email: e.target.value })}
							/>
							<input
								type="password"
								placeholder="Password"
								name="password"
								required
								className={styles.input}
								value={data.password}
								onChange={(e) => setData({ ...data, password: e.target.value })}
							/>
							<button type="submit" className={styles.green_btn}>
								Sing Up
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}
