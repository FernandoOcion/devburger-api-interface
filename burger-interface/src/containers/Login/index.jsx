// yarn add react-hook-form
// yarn add @hookform/resolvers yup
// São bibliotecas para serem instaladas

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { api } from "../../services/api";

import Logo from "../../assets/Logo.svg";
import { Button } from "../../components/Button";
import {
	Container,
	Form,
	InputContainer,
	LeftContainer,
	RightContaier,
	Title,
} from "./styles";

export function Login() {
	const schema = yup
		.object({
			email: yup
				.string()
				.email("Digite um e-mail válido.")
				.required("O e-mail é obrigatório."),
			password: yup
				.string()
				.min(6, "A senha deve ter no mínimo 6 caracteres.")
				.required("A senha é obrigatória."),
		})
		.required();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	console.log(errors);
	const onSubmit = async (data) => {
		const res = await toast.promise(
			api.post("/session", {
				email: data.email,
				password: data.password,
			}),
			{
				pending: "Verificando Seus Dados.",
				success: "Seja Bem-vindo(a)",
				error: "Email ou Senha Incorretos.",
			},
		);

		console.log(res);
	};

	return (
		<Container>
			<LeftContainer>
				<img src={Logo} alt="logo-devburger" />
			</LeftContainer>
			<RightContaier>
				<Title>
					Olá, seja bem vindo ao <span>Dev Burguer!</span>
					<br />
					Acesse com seu <span>Login e senha.</span>
				</Title>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<InputContainer>
						<label>Email</label>
						<input type="email" {...register("email")} />
						<p>{errors?.email?.message}</p>
					</InputContainer>

					<InputContainer>
						<label>Senha</label>
						<input
							type="password"
							{...register("password")}
						/>
						<p>{errors?.password?.message}</p>
					</InputContainer>
					<Button type="submit">Entrar</Button>
				</Form>
				<p>
					Não possui conta? <a>Clique aqui.</a>
				</p>
			</RightContaier>
		</Container>
	);
}
