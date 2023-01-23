import * as bcrypt from 'bcrypt';

/**
 * Hash password
 *
 * @param password string
 * @returns
 */
export const hash = async (password: string): Promise<string> => {
	return bcrypt.hash(password, 10).catch((err) => {
		throw new Error();
	});
};

/**
 * Compare given password if password stored in database.
 *
 * @param password string
 * @param passwordHashedToCompare string
 * @returns
 */
export const compare = async (
	password: string,
	passwordHashedToCompare: string
): Promise<boolean> => {
	return bcrypt.compare(password, passwordHashedToCompare);
};
