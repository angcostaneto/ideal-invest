export const isValidCPF = (cpf: string) => {
	cpf = cpf.replace(/[\s.-]*/gim, '');

	if (
		!cpf ||
		cpf.length != 11 ||
		cpf == '00000000000' ||
		cpf == '11111111111' ||
		cpf == '22222222222' ||
		cpf == '33333333333' ||
		cpf == '44444444444' ||
		cpf == '55555555555' ||
		cpf == '66666666666' ||
		cpf == '77777777777' ||
		cpf == '88888888888' ||
		cpf == '99999999999'
	) {
		throw new Error(`Invalid CPF`);
	}

	let soma = 0;
	let resto;

	for (let i = 1; i <= 9; i++) {
		soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
	}

	resto = (soma * 10) % 11;

	if (resto == 10 || resto == 11) {
		resto = 0;
	}

	if (resto != parseInt(cpf.substring(9, 10))) {
		throw new Error(`Invalid CPF`);
	}

	soma = 0;

	for (let i = 1; i <= 10; i++) {
		soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
	}

	resto = (soma * 10) % 11;

	if (resto == 10 || resto == 11) {
		resto = 0;
	}

	if (resto != parseInt(cpf.substring(10, 11))) {
		throw new Error(`Invalid CPF`);
	}

	return true;
};
