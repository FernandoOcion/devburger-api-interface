import { ContainerButton } from "./styles";

export function Button({ children, ...props }) {
	return (
		<ContainerButton {...props}>{children}</ContainerButton>
	);
}

// Button.propType = { children: PropTypes.string };
