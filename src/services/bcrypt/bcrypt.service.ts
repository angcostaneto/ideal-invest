import * as bcrypt from 'bcrypt';

export const hash = async (password: string): Promise<string> => {
	return bcrypt.hash(password, 10).catch((err) => {
		throw new Error();
	});
};

export const compare = async (
	password: string,
	passwordHashedToCompare: string
): Promise<boolean> => {
	return bcrypt.compare(password, passwordHashedToCompare);
};
