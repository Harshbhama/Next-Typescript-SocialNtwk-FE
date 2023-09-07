import React, { useState } from "react";
import {
	Card,
	Input,
	Checkbox,
	Button,
	Typography,
} from "@material-tailwind/react";

import variables from "../styles/LoginForm/login-form.module.scss"
import { LoginApi } from "@/apis/Login/LoginApi";
export function LoginForm({setStorage}: any) {
	const [formSignup, setForm] = useState(true);
	const [formProps, setFormProps] = useState({
		name: "",
		email: "",
		password: ""
	})
	const onToggleOptions = () => {
		if(formSignup){
			setForm(false)
		}else{
			setForm(true)
		}
	}
	const onInputChange = (e: any, name: any) => {
		setFormProps({...formProps, [name]: e.target.value})
	}
	const onSignOptions = async () => {
		try{
			await LoginApi(formProps, !formSignup ? "login": "register")
			localStorage.setItem("loginDetails", "true");
			setStorage(true);
		}catch(err){
			console.log(err);
		}
	}
	const formOptions = {
		title: formSignup ? "Sign Up": "Sign In",
		desc: formSignup ? "Enter your details to register.": "Enter your details to sign in.",
		btn: formSignup ? "Register": "Sign In",
		signBtn: formSignup ? "Sign In": "Sign Up"
	}
	
	return (
		<div className={variables.loginForm}>
		<Card color="transparent" shadow={false}>
			<Typography variant="h4" color="blue-gray">
				<p>{formOptions?.title}</p>
			</Typography>
			<Typography color="gray" className="mt-1 font-normal">
				{formOptions?.desc}
			</Typography>
			<form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
				<div className="mb-4 flex flex-col gap-6">
					{formSignup && <Input size="lg" label="Name" onChange={(e) => onInputChange(e, "name")}/>}
					<Input size="lg" label="Email" onChange={(e) => onInputChange(e, "email")}/>
					<Input type="password" size="lg" label="Password" onChange={(e) => onInputChange(e, "password")}/>
				</div>
				<Checkbox
					label={
						<Typography
							variant="small"
							color="gray"
							className="flex items-center font-normal"
						>
							I agree the
							<a
								href="#"
								className="font-medium transition-colors hover:text-gray-900"
							>
								&nbsp;Terms and Conditions
							</a>
						</Typography>
					}
					containerProps={{ className: "-ml-2.5" }}
				/>
				{/* <Button className="mt-6 bg-primary-blue text-primary-red" fullWidth onClick={onSignOptions}> */}
				<Button className="mt-6" fullWidth onClick={onSignOptions}>
					{formOptions?.btn}
				</Button>
				<Typography color="gray" className="mt-4 text-center font-normal">
					Already have an account?{" "}
					<a onClick = {onToggleOptions}href="#" className="font-medium text-gray-900">
						{formOptions?.signBtn}
					</a>
				</Typography>
			</form>
		</Card>
		</div>
	);
}