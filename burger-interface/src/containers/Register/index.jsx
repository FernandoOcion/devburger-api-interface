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

export function Register() {
	const schema = yup
		.object({
			name: yup.string().required("O nome é obrigatório."),
			email: yup
				.string()
				.email("Digite um e-mail válido.")
				.required("O e-mail é obrigatório."),
			password: yup
				.string()
				.min(6, "A senha deve ter no mínimo 6 caracteres.")
				.required("A senha é obrigatória."),
			confirmPassword: yup
				.string()
				.oneOf(
					[yup.ref("password")],
					"As senhas devem ser iguais.",
				)
				.required("Confirme sua senha."),
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
			api.post("/users", {
				name: data.name,
				email: data.email,
				password: data.password,
			}),
			{
				pending: "Verificando Seus Dados.",
				success: "Cadastro Efetuado Com Sucesso.",
				error: "Ops! Algo deu errado, tente novamente.",
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
				<Title>Criar Conta</Title>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<InputContainer>
						<label>Nome</label>
						<input type="text" {...register("name")} />
						<p>{errors?.name?.message}</p>
					</InputContainer>

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

					<InputContainer>
						<label>Confirmar Senha</label>
						<input
							type="password"
							{...register("confirmPassword")}
						/>
						<p>{errors?.confirmPassword?.message}</p>
					</InputContainer>
					<Button type="submit">Criar Conta</Button>
				</Form>
				<p>
					Já possui conta? <a>Clique aqui.</a>
				</p>
			</RightContaier>
		</Container>
	);
}
